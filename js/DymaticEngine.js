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

// Dynamic Logo Color
'use strict';

function setupIcons() {
  const lightSchemeIcon = document.querySelector('#light-scheme-icon');
  const darkSchemeIcon = document.querySelector('#dark-scheme-icon');

  function setLight() {
    document.head.append(lightSchemeIcon);
    darkSchemeIcon.remove();
  }

  function setDark() {
    document.head.append(darkSchemeIcon);
    lightSchemeIcon.remove();
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

function DisableSelection()
{
  var elements = document.getElementsByClassName("unselectable_item");
  for (const element of elements) {
    if (element.tagName == 'IMG') {
      element.setAttribute("draggable", "false");
    }
  }
}

// Pade Fade
function PageFade(){
  startupdiv.classList.remove("hidden");
  setTimeout(function(){startupdiv.classList.add("faded");}, 25);
  setTimeout(function(){startupdiv.classList.remove("faded");}, 350);
  setTimeout(function(){startupdiv.classList.add("hidden");}, 550);
}

// Init lax JS
function InitLaxJS()
{
  lax.init();

  lax.addElements('#gotoTop', {
    scrollY: {
      opacity: [
        [500, 550],
        [0, 1]
      ]
    }
  });
}

// OnCreate function
function OnCreate()
{
  // Common setup calls
	setupIcons();
  DisableSelection();
  InitLaxJS();

  // Custom code for current page (defined in page js file)
  OnCreateOverride();

	// Display the page to the user
	setTimeout(PageFade, 100);
}