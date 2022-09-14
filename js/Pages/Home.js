// Check if it's time to start the animation.
function checkAnimation() {
    var $elem = $('.FadeInAnimationEarly, .FadeInAnimationNormal, .FadeInAnimationLate');

    // If the animation has already been started
    if ($elem.hasClass('start')) return;

    if (isElementInViewport($elem)) {
        // Start the animation
        $elem.addClass('start');
    }
}

function FadeInLanguages() {
  var langBreakdown = document.getElementById("LanguageBreakdown");
  if (isElementInViewport(langBreakdown)) {
    for (let i = 0; i < 5; i++) {
      setTimeout(function(){
        langBreakdown.children[i].children[0].style.width = parseInt(langBreakdown.children[i].children[0].getAttribute("lang-target")) + "%";
      }, i*400 + 1);
      
    }
  }

  var editorScreenshotLogo = document.getElementById("logoOntop");
  if (isElementInViewport(editorScreenshotLogo)) {
    setTimeout(function(){editorScreenshotLogo.classList.remove("fadeInUp");}, 1500);
  }

  var downloadButton = document.getElementById("DownloadButton");
  if (isElementInViewport(downloadButton)) {
    setTimeout(function(){downloadButton.classList.remove("fadeInUp");}, 1500);
  }

  var viewDocumentationButton = document.getElementById("ViewDocumentationButton");
  if (isElementInViewport(viewDocumentationButton)) {
    setTimeout(function(){viewDocumentationButton.classList.remove("fadeInUp");}, 1500);
  }
}

// Capture scroll events
$(window).scroll(function(){
    checkAnimation();
    FadeInLanguages();
});

function InitLaxJS() {
    lax.init();
  
    
    // Add a driver that we use to control our animations
    lax.addDriver('scrollY', function () {
      return window.scrollY
    });
  
    // Add animation bindings to elements
    lax.addElements('#BackgroundParallaxVideo', {
      scrollY: {
        translateY: [
          ["elInY", "elCenterY", "elOutY"],
          ['-screenHeight', 0, 'screenHeight'],
        ]
      }
    });
  
    lax.addElements('#gotoTop', {
      scrollY: {
        opacity: [
          [500, 550],
          [0, 1]
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

function LoadMainVideo()
{
  if ($(window).width() >= 600)
    document.querySelector("#BackgroundParallaxVideo").innerHTML = '<source src="assets/Videos/MainHomeBackgroundLoop.mp4" type"video/mp4">';
}

function OnCreateOverride()
{
    checkAnimation();
    InitLaxJS();

    var $elem = $(".HomeLoadOverlay");

    // If the animation has already been started
    if (!$elem.hasClass("hide")) {$elem.addClass("hide")};
  
    // Trigger a particle resize so everything is sized correctly
    ParticleResizeEvent();

    LoadMainVideo();
}

// Callbacks
function MainDymaticCircleNormal()  { document.getElementById("MainCircleLogoOuter").classList.remove("LogoOuterExpand"); document.getElementById("MainCircleLogoInner").classList.remove("LogoInnerShrink"); }
function MainDymaticCircleHovered() { document.getElementById("MainCircleLogoOuter").classList.add("LogoOuterExpand"); document.getElementById("MainCircleLogoInner").classList.add("LogoInnerShrink"); }

function ScrollToMainContent() {
  document.querySelector('#ParticleCanvas').scrollIntoView({ 
    behavior: 'smooth' 
  });
}