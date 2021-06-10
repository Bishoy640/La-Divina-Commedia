var image = new Image();
image.onload = function () {
        $(".services-item").css("background-image", "url('" + image.src + "')");
}

image.src = "\images\inferno.jpg"; //image to be transitioned to