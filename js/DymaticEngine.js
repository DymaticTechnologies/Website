// JavaScript Document

// Always start at top of page
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

// Returns true if the specified element has been scrolled into the viewport.
function isElementInViewport(elem) {
    var $elem = $(elem);

    // Get the scroll position of the page.
    var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('FadeInAnimation') != -1) ? 'body' : 'html');
    var viewportTop = $(scrollElem).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    // Get the position of the element on the page.
    var elemTop = Math.round( $elem.offset().top );
    var elemBottom = elemTop + $elem.height();

    return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
}

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
      langBreakdown.children[i].children[0].style.width = parseInt(langBreakdown.children[i].children[0].getAttribute("lang-target")) + "%";
    }
  }
}

// Capture scroll events
$(window).scroll(function(){
    checkAnimation();
    FadeInLanguages();
});

// Dynamic Logo Color
'use strict';

function setupIcons() {
  const lightSchemeIcon = document.querySelector('link#light-scheme-icon');
  const darkSchemeIcon = document.querySelector('link#dark-scheme-icon');

  function setLight() {
    document.head.append(lightSchemeIcon);
    darkSchemeIcon.remove();
  }

  function setDark() {
    lightSchemeIcon.remove();
    document.head.append(darkSchemeIcon);
  }


  const matcher = window.matchMedia('(prefers-color-scheme:dark)');
  function onUpdate() {
    if (matcher.matches) {
      setDark();
    } else {
      setLight();
    }
  }
  matcher.addListener(onUpdate);
  onUpdate();
}

setupIcons();

//Cookie Read and Write
function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

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
        ['-75', 0, '75'],
      ]
    }
  });
}

// OnCreate function
function OnCreate()
	{
		checkAnimation();
		setupIcons();

    InitLaxJS();
		
		var $elem = $(".HomeLoadOverlay");

    	// If the animation has already been started
    	if (!$elem.hasClass("hide")) {$elem.addClass("hide")};

    // Trigger a particle resize so everything is sized correctly
    ParticleResizeEvent();
		
		PageFade();
	}
	
	function PageFade(){
  		startupdiv.classList.remove("hidden");
  		setTimeout(function(){startupdiv.classList.add("faded");}, 25);
  		setTimeout(function(){startupdiv.classList.remove("faded");}, 350);
  		setTimeout(function(){startupdiv.classList.add("hidden");}, 550);
	}


// Callbacks

function MainDymaticCircleNormal()  { document.getElementById("MainCircleLogoOuter").classList.remove("LogoOuterExpand"); document.getElementById("MainCircleLogoInner").classList.remove("LogoInnerShrink"); }
function MainDymaticCircleHovered() { document.getElementById("MainCircleLogoOuter").classList.add("LogoOuterExpand"); document.getElementById("MainCircleLogoInner").classList.add("LogoInnerShrink"); }

function ScrollToMainContent() {
  document.querySelector('#ParticleCanvas').scrollIntoView({ 
    behavior: 'smooth' 
  });
}