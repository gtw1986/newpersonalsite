const burger = document.querySelector('.fa-bars');
const toggler = document.querySelector('.navbar-toggler');

// Hamburger toggle
toggler.addEventListener('mouseenter', () => {
    
    burger.classList.toggle('fa-bars');
    burger.classList.toggle('fa-hamburger');
})
toggler.addEventListener('mouseleave', () => {
    burger.classList.toggle('fa-bars');
    burger.classList.toggle('fa-hamburger');
   
})

let acc = document.getElementsByClassName("accordion");
let i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active-acc");
      let panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      } 
    })};

$(document).ready(function () {
    $(document).click(function (event) {
        let clickover = $(event.target);
        let _opened = $(".navbar-collapse").hasClass("show");
        if (_opened === true && !clickover.hasClass("navbar-toggler")) {
            $(".navbar-toggler").click();
        }
    });
});
    
