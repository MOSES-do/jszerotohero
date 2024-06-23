'use strict'

///////////////////////////////////////
// Modal window //Bankist

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav'); //fade anime


const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};
//ForEach now instead of forloop for nodeslist(d.querySelectorAll)
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

//Button scroll to section
const section1 = document.querySelector('#section--1'); //smooth scroll
const btnScrollTo = document.querySelector('.btn--scroll-to');
btnScrollTo.addEventListener('click', e => {
    section1.scrollIntoView({ behavior: 'smooth' });
})



////PAGE NAVIGATION
/*document.querySelectorAll('.nav__link').forEach(function (el) {
    el.addEventListener('click', function (e) {
        e.preventDefault();
        // console.log('LINK')

        const id = this.getAttribute('href');
        // console.log(id)
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    })
})*/

//Using event delegation:
//1. Add event listener to common parent element
//2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
    e.preventDefault();
    //Matching strategy
    if (e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
});


//Tabbed content//
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const operationsContainer = document.querySelectorAll('.operations__content');
//////////////////////////////////////////////////////


tabsContainer.addEventListener('click', function (e) {
    /*After selecting parent element, we could have used  
    .classList.contains if the 
    children/target elements in the operations_tab had only text in them, but in our case they also have elements which
    when we click on would not contain the required class
    Therefore we traverse the tree using .closest to get the parent element in case of the element inside the element, and return the element when we click on the text */
    const clicked = e.target.closest('.operations__tab');

    //helps prevent the error when we click in between buttons where we have no elements
    if (!clicked) return



    //Simply put
    //Remove class from all elements on click and add to selected
    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    clicked.classList.add('operations__tab--active');

    //My solution 
    // [...clicked.parentElement.children].forEach(el => {
    //     if (el !== clicked) {
    //         el.classList.remove('operations__tab--active');
    //     }
    // })


    //Content Area Activate
    // console.log(clicked.dataset.tab)
    operationsContainer.forEach(t => t.classList.remove('operations__content--active'))
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
})



//Passing args to EventListeners | Menu fade animation
const menuFadeHover = function (e) {
    // console.log(this, e.currentTarget)
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');
        siblings.forEach(sibling => {
            if (sibling !== link) {
                sibling.style.opacity = this;
            }
        });
        logo.style.opacity = this
    }
}
/*
nav.addEventListener('mouseover', function (e) {
    menuFadeHover(e, 0.5)
})
nav.addEventListener('mouseout', function (e) {
    menuFadeHover(e, 1)
})*/
//Using .bind to pass the value to the function
//Remember that when a function is initialised to a variable
//the this keyword no longer points to the function but to the //variable. Here we manually set the this keyword using bind to pass the value to the function
nav.addEventListener('mouseover', menuFadeHover.bind(0.5))
nav.addEventListener('mouseout', menuFadeHover.bind(1))



//Implementing a sticky navigation: The scroll Event
//Setting the distance from the viewport to the area of interest dynamically
/*
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);
window.addEventListener('scroll', function () {
    //window.scroll returns the distance btw the top of the page and the viewport
    //BoundingRectClient returns the distance between the viewport and the selected element 
  if (this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});
*/
const head = document.querySelector('.header');
//dynamically grab height of navbar
const navHeight = nav.getBoundingClientRect().height;
const obsCallback = function (entries, observer) {
    // console.log(navHeight);
    entries.forEach(entry => {
        if (entry.isIntersecting === false) nav.classList.add('sticky');
        else nav.classList.remove('sticky');
        // console.log(entry);
    })
}

const obsOptions = {
    root: null,
    threshold: [0],
    rootMargin: `-${navHeight}px`,
};


const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(head);


/////////////////////////////////////////
//Revealing elements on scroll
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, sectionObserver) {
    const [e] = entries;
    console.log(e)
    if (!e.isIntersecting) return;
    e.target.classList.remove('section--hidden');
    sectionObserver.unobserve(e.target)
}

const sectOptions = {
    root: null,
    threshold: 0.15,
};

const sectionObserver = new IntersectionObserver(revealSection, sectOptions);

allSections.forEach(section => {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
});

//Lazy-loading images using theintersection API to optimize page performance
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
    const [entry] = entries;
    // console.log(entry);

    if (!entry.isIntersecting) return;

    //Replace [BLUR PICTURE] src with [WITH ORIGINAL] data-src
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener('load', function () {
        //on completion of original img load remove blur
        entry.target.classList.remove('lazy-img');
    });
    imgObserver.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));
























// console.log(document.documentElement)

//Select similar elements
const allButtons = document.getElementsByTagName('button');

const header = document.querySelector('.header');

////////////////////////////////////////////////////////
//Creating and inserting elements
const message = document.createElement('div');
//Add styling
message.classList.add('cookie-message');
//Add content
message.innerHTML = 'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
//insert into HTML page
// header.prepend(message);
//clone message
// header.append(message.cloneNode(true));
//
// header.append(message)
// header.before(message)
// header.after(message)

//header.insertAdjacentElement('afterend', message);

//Delete elements
// document.querySelector('.btn--close-cookie').addEventListener('click', () => {
//     message.remove();
// })

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';


//Attributes
const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);
// console.log(logo.id);



// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// btnScrollTo.addEventListener('click', () => {

//     const s1coords = section1.getBoundingClientRect();
//     // console.log(s1coords)
//     // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);
//     // console.log(e.target.getBoundingClientRect);
//     // console.log(window.pageXOffset, window.pageYOffset)
//     // console.log(document.documentElement.clientHeight, document.documentElement.clientWidth)

//     window.scrollTo({
//         left: s1coords.left + window.pageXOffset,
//         top: s1coords.top + window.pageYOffset,
//         behavior: 'smooth',
//     })

// })

//A better way + smooth scrollling



const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
    `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
// console.log(randomColor());

document.querySelector('.nav__link').addEventListener('click', function (e) {
    this.style.backgroundColor = randomColor();
    // console.log('LINK', e.target, e.currentTarget)
})

document.querySelector('.nav__links').addEventListener('click', function (e) {
    this.style.backgroundColor = randomColor();
    // console.log('CONTAINER', e.target, e.currentTarget)

})

document.querySelector('.nav').addEventListener('click', function (e) {
    this.style.backgroundColor = randomColor();
    // console.log('NAV', e.target, e.currentTarget)

})

//e.target is where the event originated from
//e.cuurentTarget is where the event is currently at