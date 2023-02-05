// Page Overrides
function OnCreateOverride()
{
    // Trigger a particle resize so everything is sized correctly
    ParticleResizeEvent();

    $(window).scroll(function ()
    {
        let buttons = document.getElementsByClassName("downloadButtonClass");
        for (let i = 0; i < buttons.length; i++)
        {
            if (isElementInViewport(buttons[i])) {
                setTimeout(function () {
                    buttons[i].classList.remove("fadeInUp");
                }, 1500);
            }
        }
      });
}

function OnScriptLoadOverride(callback)
{
    loadScript("js/particles.js", function() {
        callback();
    });
}