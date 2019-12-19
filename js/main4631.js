(function(){
  "use strict";

  // toggle responsive menu and changes logo color
  var burgerIcon = document.querySelector(".menu__toggle");
  var body = document.querySelector("body");

  burgerIcon.addEventListener("click", function(event){
    event.preventDefault();
    body.classList.toggle('body--menu-visible');
  });

  if (window.innerWidth < 1116) {
    document.onkeydown = function(e) {
      e = e || window.event;
      if (e.keyCode == 27) {
          body.classList.remove('body--menu-visible');
      }
    };
  }
})();
