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
        $("header").css('background-position-y', st + 'px');
    });
    $(document).on('click', '.filter', function() {
        $(".filter").removeClass('selected');
        $(this).addClass('selected');
        if ($(this).html() == "Clear Filters") {
            noFilter();
            $(this).removeClass('selected');
        } else {
            var tag = $(this).html();
            filterImages(tag);
        }
    });
    $(document).on('click', '.pix', function() {
        window.location = "gallery.html#carousel";
    });
    if(window.location.hash) {
        filterImages('carousel');
    }

    $(document).on('mouseover', '.image-container img', function() {
        var h = $(this).height();
        var w = $(this).width();
        var x = $(this).offset().left;
        var y = $(this).offset().top;
        $(".overlay").css('display', 'block').css('top', y + 'px').css('left', x + 'px').css('height', h).css('width', w);
    }).on('mouseleave', '.image-container img', function() {
        $(".overlay").css('display', 'none');
    });
});

function filterImages(filterValue) {
    filterValue = filterValue.toLowerCase();
    $(".image-container img").hide();
    $(".image-container img").each(function() {
        if ($(this).hasClass(filterValue)) {
            $(this).show();
        }
    });
}

function noFilter() {
    $(".image-container img").show();
}