
function LoadContributors()
{
    // Get all contributors
    $.getJSON('https://api.github.com/repos/BenC25/Dymatic/contributors', function(data) {

        for (contributor of data)
        {
            var login = contributor["login"];
            var contributions = contributor["contributions"];

            // Get user information
            $.getJSON('https://api.github.com/users/' + login, function(data) {
                var name = data["name"];
                var location = data["location"];
                var avatar_url = data["avatar_url"];

                $("#ContributorsContainer").append(
                    `<div style="margin:10px;" class="col-lg-3 bottommargin-sm">
                        <div style="padding:10px; border: solid grey 2px; border-radius: 50px;">
                            <div style="display: flex; align-items: center; justify-content: center;">
                                <img style="border-radius: 50%; height:20vh;" src="` + avatar_url + `">
                            </div>
                            <br>
                            <a href="https://www.github.com/` + login + `"><h4 style="margin:0px;" class="hoverUnderline">` + login + `</h4></a>
                            <h5 style="margin:0px;"><b>` + name + `</b></h5>
                            <h5 style="margin:0px;"><i>` + location + `</i></h5>
                            <br>
                            <div style="background: rgb(50, 50, 50); display: inline-flex; padding:5px; height:40px; border-radius: 20px;">
                                <p style="transform:translateY(-5px);"><span style="transform:translateY(5px);"class="material-icons">commit</span>` + contributions + `</p>
                            </div>
                        </div>
                    </div>`
                );
            });
        }

    });
}

var commits;
function LoadCommits()
{
    $.getJSON('https://api.github.com/repos/benc25/dymatic/commits?per_page=1000', function(data) {
        commits = data;
        AppendCommit(1);
    });
}

var commit_index = 0;
function AppendCommit(depth)
{
    depth--;
    if (commit_index < commits.length)
    {
        var commit = commits[commit_index];
        $.getJSON(commit["url"], function(data)
        {
            if (commit_index != 0)
            {
                $(".commit-vl").last().removeClass("hidden");
            }

            var dateObject = new Date(Date.parse(commit["commit"]["committer"]["date"]));
            var dateReadable = dateObject.toDateString();

            $("#commit-container").append(`
                <div class="commit-parent" style="height:200px; margin-left:10vw;">
                    <div style="width:50px;" class="commit-child">
                        <div style="height:90px; margin-left:50%; ` + (commit_index == 0 ? "opacity: 0;" : "") + `" class="commit-vl"></div>
                        <p style="padding:0; margin:0; margin-left:-50%; color:grey" class="material-icons">commit</p>
                        <div style="height:90px; margin-left:50%;" class="commit-vl hidden"></div>
                    </div>
                    <div id="commit-` + commit_index + `" class="commit-child" style="background:rgba(75, 75, 75, 0.1); border:solid grey 1px; border-radius:50px; height:100%; width:calc(75vw);">
                        <h4 style="width:100%;">` + commit["commit"]["message"] + ` <a href="https://www.github.com/BenC25/Dymatic/commit/` + commit["sha"] + `"><span style="color:lightblue; cursor: pointer;" class="hoverUnderline">(` + commit["sha"].substring(0, 7) + `)</span></a></h4>
                        <img class="unselectable_item" style="border-radius: 50%; height:75px;" src="` + commit["author"]["avatar_url"] + `">
                        <a href="https://www.github.com/` + commit["committer"]["login"] + `"><p class="hoverUnderline" style="display:inline;">` + commit["committer"]["login"] + `</p></a>
                        <p style="color:grey; display:inline;">committed on ` + dateReadable + `</p>
                        <div style="display:inline; float:right; transform:translate(calc(-37.5vw + 50%));" class="unselectable_item">
                            <p style="display:inline-block; color:#23C552"><span class="material-icons">add_circle_outline</span> ` + data["stats"]["additions"] + `</p>
                            <div width="50px;" style="display:inline-block;"></div>
                            <p style="display:inline-block; color:#F84F31"><span class="material-icons">remove_circle_outline</span> ` + data["stats"]["deletions"] + `</p>
                        </div>
                        <div style="display:inline; float:right;" class="unselectable_item">
                            <a href="https://www.github.com/BenC25/Dymatic/commit/` + commit["sha"] + `">
                            <p class="material-icons">content_paste</p></a>
                            <a href="https://www.github.com/BenC25/Dymatic/tree/` + commit["sha"] + `">
                            <p class="unselectable_item material-icons">code</p></a>
                        </div>
                    </div>
                </div>
            `);

            function getOffset(el) {
                const rect = el.getBoundingClientRect();
                return rect.top + window.scrollY;
              }

            var element = document.getElementById("commit-" + commit_index);
            var min = getOffset(element) - window.innerHeight * 0.9;            ;
            var max = getOffset(element)- window.innerHeight * 0.6;

            lax.addElements("#commit-" + commit_index, {
                scrollY: {
                  opacity: [
                    [min, max],
                    [0, 1]
                  ]
                }
              });

            commit_index++;

            if (commit_index >= commits.length)
            {
                $("#LoadCommitsButton").remove();
            }

            // Call inside callback to avoid data being overriden by previous block
            if (depth > 0)
            {
                AppendCommit(depth);
            }
            else
            {
                const icon = document.getElementById("CommitLoadIcon");
                const animation = document.getElementById("CommitLoadingAnimation");

                icon.style.fontSize = "50px";
                animation.classList.add("hidden");
            }
        });
    }
}

// Callbacks
function LoadCommitsCallback()
{
    const icon = document.getElementById("CommitLoadIcon");
    const animation = document.getElementById("CommitLoadingAnimation");

    icon.style.fontSize = "25px";
    animation.classList.remove("hidden");

    AppendCommit(3);
}

// Page Overrides
function OnCreateOverride()
{
    LoadContributors();
    LoadCommits();

    // Trigger a particle resize so everything is sized correctly
    ParticleResizeEvent();
}

function OnScriptLoadOverride(callback)
{
    loadScript("js/particles.js", function() {
        callback();
    });
}