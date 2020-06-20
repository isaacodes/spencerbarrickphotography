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

function filterImages(filterValue) {
    $(".filter.clear").addClass('show');
    filterValue = filterValue.toLowerCase();
    // $(".image-container img").addClass('dark');
    $(".image-container img").hide();
    $(".image-container .desc").hide();
    $(".image-container img").each(function() {
        if ($(this).hasClass(filterValue)) {
            // $(this).removeClass("dark");
            $(this).show();
            var ele = $(this);
            $(".desc").each(function() {
                if ($(this).html() == $(ele).data('name')) {
                    $(this).show();
                }
            });
        }
    });
}

function noFilter() {
    // $(".image-container img").removeClass('dark');
    $(".filter.clear").removeClass('show');
    $(".image-container img").show();
    $(".image-container .desc").show();
}