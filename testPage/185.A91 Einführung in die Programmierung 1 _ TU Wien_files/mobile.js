/**
 * Mobile.js
 * Enhances TISS for use with mobile browsers
 *
 * For more information, see:
 *
 * Peter-Paul Koch, A tale of two viewports, 2012.
 * http://www.quirksmode.org/mobile/viewports2.html
 *
 * W3C, Media queries. W3C Recommendation, 2012.
 * http://www.w3.org/TR/css3-mediaqueries/
 *
 * Thierry Koblenz, Device-Agnostic Approach To Responsive Web Design. Smashing Magazine, 2012.
 * http://coding.smashingmagazine.com/2012/03/22/device-agnostic-approach-to-responsive-web-design/
 */
(function($) {
	
	// parameters
	var COOKIE_NAME = "tissmobileCookie";
	var HEADER_HEIGHT = 68;
	var DESKTOP_WIDTH = 950; /* screens larger than this width show the desktop layout */


	// decide if we want to show the responsive layout.
	var preferredLayout = getCookie(COOKIE_NAME);
	if(preferredLayout == 'desktop') {
		showDesktop();
	} else {
		showResponsive();
	}

	// render the toggle links
	$(document).ready(function(){
		var mobileLink = $('<a href="javascript:;" class="mobileToggle">Mobile Version</a>');
		var desktopLink = $('<a href="javascript:;" class="mobileToggle">Desktop Version</a>');
		var toggleLinks = $('<span class="mobileToggles"/>');
		
		toggleLinks.append(' | ')
				.append(mobileLink)
				.append(desktopLink)
				.appendTo('#baseLinks');

		mobileLink.click(function() {
			setCookie(COOKIE_NAME, "mobile", 31);
			reload();
		});
		desktopLink.click(function(){
			setCookie(COOKIE_NAME, "desktop", 31);
			reload();
		});
		
		// decide which toggle links should be shown
		function resizeHandler () {
			var w = Math.min(document.documentElement.clientWidth, screen.width);
			if(w > DESKTOP_WIDTH) {
				toggleLinks.hide();
			}
			else if(preferredLayout =='desktop') {
				toggleLinks.show();
				mobileLink.show();
				desktopLink.hide();
			}
			else {
				toggleLinks.show();
				mobileLink.hide();
				desktopLink.show();
			}
		}
		$(window).resize(_debounce(resizeHandler));
		resizeHandler();
	});


	// initialize the dropdown navigation
	$(document).ready(function(){
		$("#supNavHeader").click(function(e){		
			var supNavBody = $(this).closest("#supNav").find("#supNavBody");
			if(supNavBody.is(":hidden")){
				$("#supNavHeader").addClass("active");
				supNavBody.css("display","block");
			}else {
				supNavBody.attr("style","");
				$(this).removeClass("active");
			}
		});		
	});
	
	
	/**
	 * Switches to the responsive (aka mobile or tablet) layout.
	 * Note: On large screens, css media queries cause the normal desktop layout to be rendered.
	 */
	function showResponsive() {
		mobile = true;
		$('#mobileCss').removeAttr('disabled');
		$('#desktopMeta').remove();
		$('<meta id="mobileMeta" name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=2.5, user-scalable=yes" />').appendTo('head');
		
		function scroll() {
			var w = Math.min(document.documentElement.clientWidth, screen.width);
			if(w >= DESKTOP_WIDTH) return; // don't scroll down in desktop scren sizes.
			
			if($(document).height() - HEADER_HEIGHT >= $(window).height()) {
				$("html, body").scrollTop(HEADER_HEIGHT);
			}
		}
		$(document).ready(scroll);
		$(window).on('load', scroll);
		
	}


	/**
	 * Switches to the desktop layout.
	 * Note: This enforces the desktop layout even on small screens.
	 */
	function showDesktop() {
		mobile = false;
		$('#mobileCss').attr('disabled', 'disabled');
		$('#mobileMeta').remove();
		if(!$('#desktopMeta')) $('<meta id="desktopMeta" name="viewport" content="width=device-width, minimum-scale=0.25, maximum-scale=2.5, user-scalable=yes" />').appendTo('head');
	}
	
	/**
	 * Helper function. Reloads the page 
	 */
	function reload() {
		window.location.replace(window.location);
		//window.location.search += (window.location.search ? '&' : '') + 'tmpMobileLayout=' + new Date().getTime();
	}
			
	/**
	 * Helper function. Sets value to a cookie
	 */
	function setCookie(name, value, days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()
					+ (days * 24 * 60 * 60 * 1000));
			var expires = "; expires=" + date.toGMTString();
		} else
			var expires = "";
		document.cookie = name + "=" + value + expires
				+ "; path=/";
	}

	/**
	 * Helper function. Gets a cookie
	 */
	function getCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for ( var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ')
				c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0)
				return c.substring(nameEQ.length, c.length);
		}
		return null;
	}

	/**
	 * Helper function. Deletes a cookie
	 */
	function deleteCookie(name) {
		setCookie(name, "", -1);
	}


	/**
	 * Helper function.
	 * 
	 * Returns a function, that, as long as it continues to be invoked, will not be triggered. 
	 * The function will be called after it stops being called for N milliseconds. If immediate 
	 * is passed, trigger the function on the leading edge, instead of the trailing.
	 * 
	 * Modified from http://underscorejs.org/docs/underscore.html
	 */
	 function _debounce(func, wait, immediate) {
		if(typeof wait === 'undefined') wait = 500;
		if(typeof immediate === 'undefined') immediate = false;
		var timeout, result;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) result = func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) result = func.apply(context, args);
			return result;
		};
	};


})(jQuery);