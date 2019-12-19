(function(){
  "use strict";

    var slides = document.querySelectorAll('.slider__item');
    var currentSlide = 0;
    var slideInterval = setInterval(nextSlide,10000);

    function nextSlide() {
        goToSlide(currentSlide+1);
    }
    function previousSlide() {
        goToSlide(currentSlide-1);
    }
    function goToSlide(n) {
        slides[currentSlide].className = 'slider__item';
        currentSlide = (n+slides.length)%slides.length;
        slides[currentSlide].className = 'slider__item--active';
        if (current) {
          current.innerHTML = currentSlide+1;
        }
    }

    // Pagination
    var current = document.querySelector('.slider__current');
    var total = document.querySelector('.slider__total');
    if (total) {
      total.innerHTML = slides.length;
    }

    // Arrows
    var next = document.querySelector('.slider__arrow--right');
    var previous = document.querySelector('.slider__arrow--left');
    next.onclick = function() {
        nextSlide();
    };
    previous.onclick = function() {
        previousSlide();
    };

    if (window.innerWidth < 768) {
        // touch gestures only on mobile
        var touchstartX = 0;
        var touchstartY = 0;
        var touchendX = 0;
        var touchendY = 0;

        var gesuredZone = document.querySelector('.slider__list');

        gesuredZone.addEventListener('touchstart', function(event) {
            touchstartX = event.changedTouches[0].screenX;
            touchstartY = event.changedTouches[0].screenY;
        }, false);

        gesuredZone.addEventListener('touchend', function(event) {
            touchendX = event.changedTouches[0].screenX;
            touchendY = event.changedTouches[0].screenY;
            handleGesure();
        }, false);

        function handleGesure() {
            var swiped = 'swiped: ';
            if (touchendX < touchstartX) {
                nextSlide();
            }
            if (touchendX > touchstartX) {
                previousSlide();
            }
        }
    }

    // display first slide
    goToSlide(0);

})();
