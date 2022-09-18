// Page Overrides
function OnCreateOverride()
{
    // Trigger a particle resize so everything is sized correctly
    ParticleResizeEvent();
}

function OnScriptLoadOverride(callback)
{
    loadScript("js/particles.js", function() {
        callback();
    });
}