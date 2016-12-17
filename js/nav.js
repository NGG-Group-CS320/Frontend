!function () {
    function goHome() {
        // Remove old things.
        $("#about-link").removeClass("current");
        $("#sunburst-link").removeClass("current");
        $("#line-link").removeClass("current");
        $(".about").addClass("hidden").removeClass("visible");
        $(".vis-container").addClass("hidden").removeClass("visible");
        $("#sunburst-vis").addClass("hidden").removeClass("visible");
        $("#line-vis").addClass("hidden").removeClass("visible");

        // Show correct things.
        $("#home-link").addClass("current");
        $(".home").addClass("visible").removeClass("hidden");
    }

    function goAbout() {
        // Remove old things.
        $("#home-link").removeClass("current");
        $("#sunburst-link").removeClass("current");
        $("#line-link").removeClass("current");
        $(".home").addClass("hidden").removeClass("visible");
        $(".vis-container").addClass("hidden").removeClass("visible");
        $("#sunburst-vis").addClass("hidden").removeClass("visible");
        $("#line-vis").addClass("hidden").removeClass("visible");

        // Show correct things.
        $("#about-link").addClass("current");
        $(".about").addClass("visible").removeClass("hidden");
    }

    function goSunburst() {
        // Remove old things.
        $("#home-link").removeClass("current");
        $("#about-link").removeClass("current");
        $("#line-link").removeClass("current");
        $(".home").addClass("hidden").removeClass("visible");
        $(".about").addClass("hidden").removeClass("visible");
        $("#line-vis").addClass("hidden").removeClass("visible");

        // Show correct things.
        $("#sunburst-link").addClass("current");
        $(".vis-container").addClass("visible").removeClass("hidden");
        $("#sunburst-vis").addClass("visible").removeClass("hidden");
    }

    function goLine() {
        // Remove old things.
        $("#home-link").removeClass("current");
        $("#about-link").removeClass("current");
        $("#sunburst-link").removeClass("current");
        $(".home").addClass("hidden").removeClass("visible");
        $(".about").addClass("hidden").removeClass("visible");
        $("#sunburst-vis").addClass("hidden").removeClass("visible");

        // Show correct things.
        $("#line-link").addClass("current");
        $(".vis-container").addClass("visible").removeClass("hidden");
        $("#line-vis").addClass("visible").removeClass("hidden");
    }

    switch (window.location.hash.slice(2)) {
    case "/home":
        goHome();
        break;
    case "/about":
        goAbout();
        break;
    case "/sunburst":
        goSunburst();
        break;
    case "/line":
        goLine();
        break;
    default:
        goHome();
    }

    $("#home-link").on("click", goHome);
    $("a[href=\"#!/home\"]").on("click", goHome);
    $("#about-link").on("click", goAbout);
    $("a[href=\"#!/about\"]").on("click", goAbout);
    $("#sunburst-link").on("click", goSunburst);
    $("a[href=\"#!/sunburst\"]").on("click", goSunburst);
    $("#line-link").on("click", goLine);
    $("a[href=\"#!/line\"]").on("click", goLine);
}();
