// Set up throttled resize event for the application at large.
$(window).resize(function() {
    if (this.resizeTO)
        this.clearTimeout(this.resizeTO);
    this.resizeTO = this.setTimeout(function() {
        $(this).trigger('resizeThrottled');
    }, 30);
});

var systems = [16, 17, 94, 153, 251, 325, 442, 444, 809, 2848, 3565]

function clearColorCoding() {
    systems.forEach(function (x) {
        $("label[system=" + x + "]").css("color", "inherit");
    });
}
