// Main JavaScript Document

function loadScript( url, callback ) {
  var script = document.createElement("script")
  script.type = "text/javascript";
  script.src = url;
  script.onload = function () {
    if (callback != null)
      callback();
  }
  document.head.appendChild(script); 
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

function setupPage()
{
  // Always start at top of page
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };
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
  $("#page_cover").remove();

  startupdiv.classList.remove("hidden");
  setTimeout(function(){startupdiv.classList.add("faded");}, 25);
  setTimeout(function(){startupdiv.classList.remove("faded");}, 350);
  setTimeout(function(){startupdiv.classList.add("hidden");}, 550);
}

// Init lax JS
function InitLaxJS()
{
  lax.init();

  // Add a driver that we use to control our animations
  lax.addDriver('scrollY', function () {
    return window.scrollY
  });

  lax.addElements('#gotoTop', {
    scrollY: {
      opacity: [
        [450, 550],
        [0, 1]
      ]
    }
  });
}

// OnCreate function
function OnCreate()
{
  // Common setup calls
  setupPage();
  DisableSelection();
  InitLaxJS();

  // Custom code for current page (defined in page js file)
  OnCreateOverride();

	// Display the page to the user
	setTimeout(PageFade, 250);
}

// Init Page
function Init()
{
  // Load JQuery
  loadScript("js/jquery-3.4.1.min.js", function(){

    // Load HTML templates
    $("#__header").load("html/Header.html", function(){
      $("#__footer").load("html/Footer.html", function(){
        // Load remaining script files
        loadScript("js/plugins.min.js", function() {
          loadScript("js/popper.min.js", function() {
            loadScript("js/bootstrap-4.4.1.js", function() {
              loadScript("https://cdn.jsdelivr.net/npm/lax.js", function() {
                loadScript("https://cdn.jsdelivr.net/npm/simple-parallax-js@5.5.1/dist/simpleParallax.min.js", function() {
                  loadScript("js/functions.js", function() {
                    // Startup
                    OnScriptLoadOverride(function(){
                      OnCreate();
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}
Init();