// Check if it's time to start the animation.
function checkAnimation() {
  let $elem = $('.FadeInAnimationEarly, .FadeInAnimationNormal, .FadeInAnimationLate');

    // If the animation has already been started
    if ($elem.hasClass('start')) return;

    if (isElementInViewport($elem)) {
        // Start the animation
        $elem.addClass('start');
    }
}

function FadeInLanguages() {
  let langBreakdown = document.getElementById("LanguageBreakdown");
  if (isElementInViewport(langBreakdown)) {
    for (let i = 0; i < 5; i++) {
      setTimeout(function(){
        langBreakdown.children[i].children[0].style.width = parseInt(langBreakdown.children[i].children[0].getAttribute("lang-target")) + "%";
      }, i*400 + 1);
      
    }
  }

  let editorScreenshotLogo = document.getElementById("logoOntop");
  if (isElementInViewport(editorScreenshotLogo)) {
    setTimeout(function(){editorScreenshotLogo.classList.remove("fadeInUp");}, 1500);
  }

  let downloadButton = document.getElementById("DownloadButton");
  if (isElementInViewport(downloadButton)) {
    setTimeout(function(){downloadButton.classList.remove("fadeInUp");}, 1500);
  }

  let viewDocumentationButton = document.getElementById("ViewDocumentationButton");
  if (isElementInViewport(viewDocumentationButton)) {
    setTimeout(function(){viewDocumentationButton.classList.remove("fadeInUp");}, 1500);
  }
}

function InitLaxJSOverride() {
  
    // Add animation bindings to elements
    lax.addElements('#BackgroundParallaxVideo', {
      scrollY: {
        translateY: [
          ["elInY", "elCenterY", "elOutY"],
          ['-screenHeight', 0, 'screenHeight'],
        ]
      }
    });
  
    lax.addElements('#logoOntop', {
      scrollY: {
        translateY: [
          ["elInY", "elCenterY", "elOutY"],
          ['-screenWidth*0.035', 0, 'screenWidth*0.035'],
        ]
      }
    });
}

// Overrides (local page implementation)
function OnCreateOverride()
{
    checkAnimation();
    InitLaxJSOverride();

    var $elem = $(".HomeLoadOverlay");
    // If the animation has already been started
    if (!$elem.hasClass("hide")) {$elem.addClass("hide")};

    $(window).scroll(function(){
      checkAnimation();
      FadeInLanguages();
    });
  
    // Trigger a particle resize so everything is sized correctly
    ParticleResizeEvent();
}

function OnScriptLoadOverride(callback)
{
  loadScript("js/SetFooterCounters.js", function() {
    loadScript("js/particles.js", function() {
      callback();
    });
  });
}

// Callbacks
function MainDymaticCircleNormal()  { document.getElementById("MainCircleLogoOuter").classList.remove("LogoOuterExpand"); document.getElementById("MainCircleLogoInner").classList.remove("LogoInnerShrink"); }
function MainDymaticCircleHovered() { document.getElementById("MainCircleLogoOuter").classList.add("LogoOuterExpand"); document.getElementById("MainCircleLogoInner").classList.add("LogoInnerShrink"); }

function ScrollToMainContent() {
  document.querySelector('#ParticleCanvas').scrollIntoView({ 
    behavior: 'smooth' 
  });
}