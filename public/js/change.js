const burger = document.querySelector('.fa-bars');
const toggler = document.querySelector('.navbar-toggler');
/*
const certGroup = document.querySelector('#certGroup');
const degreeGroup = document.querySelector('#degreeGroup');
const generalGroup = document.querySelector('#generalGroup');
const driveGroup = document.querySelector('#driveGroup');
const vetGroup = document.querySelector('#vetGroup');
const supportGroup = document.querySelector('#supportGroup');
const hardwareGroup = document.querySelector('#hardwareGroup');
const commerceGroup = document.querySelector('#commerceGroup');
const gdprGroup = document.querySelector('#gdprGroup');

const vettingMinus = document.querySelector('#vetMinus');
const certMinus = document.querySelector('#certMinus');
const degreeMinus = document.querySelector('#degreeMinus');
const driveMinus = document.querySelector('#driveMinus');
const vetMinus = document.querySelector('#vetMinus');
const generalMinus = document.querySelector('#generalMinus');
const supportMinus = document.querySelector('#supportMinus');
const hardwareMinus = document.querySelector('#hardwareMinus');
const commerceMinus = document.querySelector('#commerceMinus');
const gdprMinus = document.querySelector('#gdprMinus');

const menusArr = [certGroup, degreeGroup, generalGroup, driveGroup, vetGroup, supportGroup, hardwareGroup, commerceGroup, gdprGroup];
const minusArr = [vettingMinus, certMinus, degreeMinus, driveMinus, generalMinus, supportMinus, hardwareMinus, commerceMinus, gdprMinus];
*/
// Hamburger toggle
toggler.addEventListener('mouseenter', () => {
    
    burger.classList.toggle('fa-bars');
    burger.classList.toggle('fa-hamburger');
})
toggler.addEventListener('mouseleave', () => {
    burger.classList.toggle('fa-bars');
    burger.classList.toggle('fa-hamburger');
   
})

// Open/close training and qualifications
/*let vetListItems = vetGroup.querySelectorAll('#list');
let generalListItems = generalGroup.querySelectorAll('#list');
let driveListItems = driveGroup.querySelectorAll('#list');
let certListItems = certGroup.querySelectorAll('#list');
let degreeListItems = degreeGroup.querySelectorAll('#list');
let supportListItems = supportGroup.querySelectorAll('#list');
let hardwareListItems = hardwareGroup.querySelectorAll('#list');
let commerceListItems = commerceGroup.querySelectorAll('#list');
let gdprListItems = gdprGroup.querySelectorAll('#list');
/*
minusArr.forEach( (minus) => {
    minus.addEventListener('click', function() {
        if(minus.id == 'certMinus') {
            for (let i = 0; i < certListItems.length; i++) {
                certListItems[i].classList.toggle('showList');
            }
        } else if (minus.id == 'generalMinus') {
                for (let i = 0; i < generalListItems.length; i++) {
                        generalListItems[i].classList.toggle('showList');
                        generalListItems[i].nodeValue();
                    }
            }
            else if (minus.id == 'driveMinus') {
                for (let i = 0; i < driveListItems.length; i++) {
                        driveListItems[i].classList.toggle('showList');
                }
            }
            else if (minus.id == 'degreeMinus') {
                for (let i = 0; i < degreeListItems.length; i++) {
                        degreeListItems[i].classList.toggle('showList');
                }
            }
            else if (minus.id == 'vetMinus') {
                for (let i = 0; i < vetListItems.length; i++) {
                        vetListItems[i].classList.toggle('showList');
                }
                
            } else if (minus.id == 'supportMinus') {
                for (let i = 0; i < supportListItems.length; i++) {
                    supportListItems[i].classList.toggle('showList');
                }
            } else if (minus.id == 'hardwareMinus') {
                for (let i = 0; i < hardwareListItems.length; i++) {
                    hardwareListItems[i].classList.toggle('showList');
                }
            } else if (minus.id == 'commerceMinus') {
                for (let i = 0; i < commerceListItems.length; i++) {
                    commerceListItems[i].classList.toggle('showList');
            }
                } else if (minus.id == 'gdprMinus') {
                    for (let i = 0; i < gdprListItems.length; i++) {
                        gdprListItems[i].classList.toggle('showList');
                }
            }
            let icon = minus.querySelector('i')
            icon.classList.toggle('fa-plus');
                    icon.classList.toggle('fa-minus');
        }
    )
});
*/
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active-acc");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      } 
    })};

$(document).ready(function () {
    $(document).click(function (event) {
        var clickover = $(event.target);
        var _opened = $(".navbar-collapse").hasClass("show");
        if (_opened === true && !clickover.hasClass("navbar-toggler")) {
            $(".navbar-toggler").click();
        }
    });
});
    
