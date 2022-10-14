/**
 * Changes the mouse cursor to 'wait' while an ajax request is running.
 * See the "Ajax Indicator" page in the Tiss Styleguide.
 */
if(typeof window.busyCursor == 'undefined') window.busyCursor = function(event) {
	if(typeof event === 'undefined' || event === null) return;

	// add or remove the css class "waiting"
    if (event.status == 'begin') {
    	document.body.className += ' waiting';
    } else {
        document.body.className = document.body.className.replace(/\bwaiting\b/, '');
    }

    // scroll a little to force redrawing of the mouse cursor
    if(window.scrollBy) {
    	window.scrollBy(0, 1);
    	window.scrollBy(0,-1);
    }

}



// this would register the busyCursor script globally for all ajax requests:
/*
if(typeof jsf !== 'undefined' && jsf !== null && typeof jsf.ajax !== 'undefined' && jsf.ajax !== 'null') {
    jsf.ajax.addOnEvent(window.busyCursor);
}
*/
