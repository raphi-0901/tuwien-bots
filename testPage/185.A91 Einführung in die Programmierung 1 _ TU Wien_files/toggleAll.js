jQuery(document).ready(function() {

    jQuery(".ca").hide();
    jQuery(".toggleAll").hide();

});

function hideAll() {
    jQuery(".toggleAll").hide();
    jQuery(".ca").hide(); 
    jQuery(".sa").show();

    jQuery('.groupHeadertrigger').removeClass("accordion_open");

}

function showAll() {
    jQuery(".toggleAll").show();
    jQuery(".sa").hide();
    jQuery(".ca").show();

    jQuery('.groupHeadertrigger').addClass("accordion_open");

}

function changeSymbol(itemID) {
    jQuery(itemID).toggleClass("accordion_open");
    jQuery(".ca").show();
    jQuery(".sa").show();
}

/*
 jQuery(changeToggle(function() {
 if('.toggleAll').hide) ('.toggleAll').show(); else ('.toggleAll').hide())"
 }


 */