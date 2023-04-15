
// Retrieve and set GitHub Stars
$.getJSON('https://api.github.com/repos/bencraighill/Dymatic', function(data) {
    var stars = data["stargazers_count"];
    $("#github_star_count").attr("data-to", stars);
});

// Retrieve and set Github Watchers
$.getJSON('https://api.github.com/repos/bencraighill/Dymatic', function(data) {
    // See https://github.com/orgs/community/discussions/24795 as to why subscriber count is used.
    var watchers = data["subscribers_count"];
    $("#github_watcher_count").attr("data-to", watchers);
});

// Retreive Commit Count
const base_url = 'https://api.github.com';

    function httpGet(theUrl, return_headers) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false); // false for synchronous request
        xmlHttp.send(null);
        if (return_headers) {
            return xmlHttp
        }
        return xmlHttp.responseText;
    }

    function get_all_commits_count(owner, repo, sha) {
        let first_commit = get_first_commit(owner, repo);
        let compare_url = base_url + '/repos/' + owner + '/' + repo + '/compare/' + first_commit + '...' + sha;
        let commit_req = httpGet(compare_url);
        let commit_count = JSON.parse(commit_req)['total_commits'] + 1;
        console.log('Commit Count: ', commit_count);
        return commit_count
    }
    
    function get_first_commit(owner, repo) {
        let url = base_url + '/repos/' + owner + '/' + repo + '/commits';
        let req = httpGet(url, true);
        let first_commit_hash = '';
        if (req.getResponseHeader('Link')) {
            let page_url = req.getResponseHeader('Link').split(',')[1].split(';')[0].split('<')[1].split('>')[0];
            let req_last_commit = httpGet(page_url);
            let first_commit = JSON.parse(req_last_commit);
            first_commit_hash = first_commit[first_commit.length - 1]['sha']
        } else {
            let first_commit = JSON.parse(req.responseText);
            first_commit_hash = first_commit[first_commit.length - 1]['sha'];
        }
        return first_commit_hash;
    }
    
    let owner = 'bencraighill';
    let repo = 'Dymatic';
    let sha = 'Development';
    $("#github_commit_count").attr("data-to", get_all_commits_count(owner, repo, sha));


// Update Language Breakdown
$.getJSON('https://api.github.com/repos/bencraighill/Dymatic/languages', function(data) {
    // See https://github.com/orgs/community/discussions/24795 as to why subscriber count is used.
    var langBreakdown = document.getElementById("LanguageBreakdown");

    var total = 0;
    for (language in data) {
        total += data[language];
    }

    $("#github_line_count").attr("data-to", total);

    for (language in data) {
        var lang = document.createElement("div");
        lang.classList.add("progress");
        lang.style.backgroundColor = "rgb(52, 54, 56)";
        lang.style.height = "25px";
        lang.innerHTML =  '<div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuenow="0" aria-valuemax="100" style="width:0%; background-color:rgb(91, 93, 95) !important; background:blue;">' 
        + '<small style="font-size:14px;" class="justify-content-center d-flex position-absolute w-75">'
        + language;
        + '</small>'
        + '</div>';
        lang.children[0].setAttribute("lang-target", parseInt(data[language]) / parseInt(total) * 100);
        langBreakdown.appendChild(lang);
    }
});