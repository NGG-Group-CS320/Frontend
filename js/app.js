// Set up throttled resize event for the application at large.
$(window).resize(function() {
    if (this.resizeTO)
        this.clearTimeout(this.resizeTO);
    this.resizeTO = this.setTimeout(function() {
        $(this).trigger('resizeThrottled');
    }, 30);
});
