var slide = 1;
function slideshow() {
    slide++;
    if (slide == 7) {
        slide = 1;
    }
    var imgname = "ex_" + slide.toString();
    $(".pix").css('background-image', 'url("images/' + imgname + '.jpg")');
}
setInterval(slideshow, 4000);

var navopen = false;
$(document).on('click', '.open-links', function() {
    if (navopen === false) {
        $(".nav-links").css('left', '0px');
        navopen = true;
    } else {
        $(".nav-links").css('left', '-60vw');
        navopen = false;
    }
});

$(document).ready(function() {
    $("body").scroll(function() {
        var st = $("body").scrollTop() / 3;
        $("header").css('background-position-y', 'calc(-50vh + ' + st + 'px)');
    });
});