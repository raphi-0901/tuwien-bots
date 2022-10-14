/* MyFaces javascript config to disable portlet support*/

window.myfaces = window.myfaces || {};
myfaces.config = myfaces.config || {};

//disable portlet support to render all view states also in multiple forms
myfaces.config.no_portlet_env = true;

//queue all ajax POSTS for 300ms to catch double clicks
myfaces.config.delay=300;