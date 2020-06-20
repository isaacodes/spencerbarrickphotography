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
        var st = $("body").scrollTop() / 4;
        $("header").css('background-position-y', -st + 'px');
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

    $(document).on('mouseover, mousemove', '.image-container img', function() {
        var h = $(this).height();
        var w = $(this).width();
        var x = $(this).offset().left;
        var y = $(this).offset().top;
        var tags = $(this).attr('class').replace(/ /g, ', ');
        var location = $(this).data('location');
        var name = $(this).data('name');
        $(".overlay").css('display', 'block').css('top', y + 'px').css('left', x + 'px').css('height', h).css('width', w);
        $(".overlay .tags-list").html(tags);
        $(".overlay .location").html(location);
        $('.overlay .name').html(name);
    }).on('mouseleave', '.image-container img', function() {
        $(".overlay").css('display', 'none');
    });
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
var src, h, w, x, y, selimg;
$(document).on('click', '.image-container img', function() {
    selimg = $(this);
    $(this).css('opacity', '0');
    src = $(this).attr("src");
    h = $(this).height();
    w = $(this).width();
    x = $(this).offset().left;
    y = $(this).offset().top;
    $(".img_exp").attr('src', src).css('display', 'block').css('width', w + 'px').css('top', y + 'px').css('left', x + 'px');
    function wait() {
        $(".img_exp").css('top', '50vh').css('left', '50vw').css('transform', 'translate(-50%, -50%)');
        if ($("body").width() <= 768) {
            $(".img_exp").css('width', '100vw').css('height', 'auto');
        }
    }
    setTimeout(wait, 100);
    $(".img_overlay").addClass('show');
}).on('click', '.img_overlay', function() {
    $(".img_overlay button.cart").removeClass('success').removeClass('uhoh');
    $(".img_exp").css('width', w + 'px').css('top', y + 'px').css('left', x + 'px').css('transform', 'none');
    function wait() {
        $(".img_exp").css('display', 'none');
        $(selimg).css('opacity', '1');
        $(".img_overlay").removeClass('show');
    }
    setTimeout(wait, 300);
}).on('click', '.img_overlay button', function(e) {
    e.stopPropagation();
});

// CART PAGE THING
$(document).ready(function() { 
    if (localStorage.images == undefined) {
        localStorage.images = [];
    } else {
    }
}).on('click', '.img_overlay button.cart', function() {
    var img = $(selimg).attr('src');
    var existing = localStorage.images;
    existing = existing ? existing.split(',') : [];
    if (existing.indexOf(img) == -1) {
        existing.push(img);
        $(this).addClass('success');
    } else {
        $(this).addClass('uhoh');
        $(".img_overlay").append('<div class="msg">Item already in cart</div>');
    }
    localStorage.images = existing;
});