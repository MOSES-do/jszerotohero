'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const section1 = document.querySelector('#section--1'); //smooth scroll
const nav = document.querySelector('.nav'); //fade anime
//Tabbed content//
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const operationsContainer = document.querySelectorAll('.operations__content');
//////////////////////////////////////////////////////

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

//Implementing smoothscroll feature in our app

const btnScrollTo = document.querySelector('.btn--scroll-to');
btnScrollTo.addEventListener('click', e => {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  //use
  section1.scrollIntoView({ behavior: 'smooth' });
});

//Event Delegation through bubbling: Implement smooth scroll page navigation(nav-bar)
//Unoptimized way - attaching the same event handler to multiple elements
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

//...and now. Event delegation way*(Way more optimized)
//1. Add event listener to common parent element
//2. Determine whatevent originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  console.log(e.target);
  // console.log(e.currentTarget);

  //Determine matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//Tabbed Component
tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  //Guard clause
  if (!clicked) return;
  tabs.forEach(tab => tab.classList.remove('operations__tab--active')); //remove classList from all elements and add to only current element

  //Active tab
  clicked.classList.add('operations__tab--active');

  //Activate content area
  console.log(clicked.dataset.tab);
  //remove active class from all
  operationsContainer.forEach(content =>
    content.classList.remove('operations__content--active')
  );

  //Display only active container
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//Menu Fade Animation(passing arguments to event handlers)
//Delegation to search through specific children elements using their classes⬇️⬇️⬇️
/*
nav.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target; //returns a single element/class
    //traverse parent elements
    const siblings = link.closest('.nav').querySelectorAll('.nav__link'); //returns a nodelist
    const logo = link.closest('.nav').querySelector('img');
    // console.log(link);
    // console.log(siblings);

    //create condition using siblings and link to fade out
    siblings.forEach(eln => {
      if (eln !== link) eln.style.opacity = 0.5;
    });
    logo.style.opacity = 0.5;
  }
});

//undo opacity on mouseout
nav.addEventListener('mouseout', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target; //returns a single element/class
    //traverse parent elements
    const siblings = link.closest('.nav').querySelectorAll('.nav__link'); //returns a nodelist
    const logo = link.closest('.nav').querySelector('img');
    // console.log(link);
    // console.log(siblings);

    //create condition using siblings and link to fade out
    siblings.forEach(eln => {
      if (eln !== link) eln.style.opacity = 1;
    });
    logo.style.opacity = 1;
  }
});
*/

/*
//Refactor code using a function since the only diff BTW mouseover and out is the opacity level
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target; //returns a single element/class
    //traverse parent elements
    const siblings = link.closest('.nav').querySelectorAll('.nav__link'); //returns a nodelist
    const logo = link.closest('.nav').querySelector('img');
    // console.log(link);
    // console.log(siblings);

    //create condition using siblings and link to fade out
    siblings.forEach(eln => {
      if (eln !== link) eln.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};

//nice but can be better using bind as i learnt previously

nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});
nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});
*/

//Refactor 2
const handleHover = function (e) {
  console.log(this); // bind sets the this keyword manually i.e. opacity becomes our 'this keyword
  if (e.target.classList.contains('nav__link')) {
    const link = e.target; //returns a single element/class
    //traverse parent elements
    const siblings = link.closest('.nav').querySelectorAll('.nav__link'); //returns a nodelist
    const logo = link.closest('.nav').querySelector('img');
    // console.log(link);
    // console.log(siblings);

    //create condition using siblings and link to fade out
    siblings.forEach(eln => {
      if (eln !== link) eln.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

//Using the bind method to pass an "argument" into the handler function
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
//Menu fade end

//Implementing a sticky navigation: The scroll Event
//Setting the distance from the viewport to the area of interest dynamically
/*
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);
window.addEventListener('scroll', function () {
  if (this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});
*/

// A better way to implement sticky nav using: The Intersection Observer API
const header = document.querySelector('.header');
//dynamically display sticky nav at a certain height of target
const navHeight = nav.getBoundingClientRect().height;
console.log(nav.getBoundingClientRect());

//callback funtion
const stickyNav = function (entries) {
  //destructure instead of forEach
  const [entry] = entries;
  // console.log(entry);

  // !entry.isIntersecting same as
  if (entry.isIntersecting === false) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
//0 is true when target area intersects with view prt at threshold and false when vice-versa
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0, //returns false at threshold value[s] -"0 - means header scrolls completely out of view" remains true otherwise
  rootMargin: `-${navHeight}px`, //when the start of the viewport and the target element === height of the navbar
});

headerObserver.observe(header);

//Reveal (all sections) elements on scroll using intersectionObserverAPI
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = [entries[0], entries[1]];
  // console.log(entry);

  if (!entry.isIntersecting) return; //if entry is  not true do nothing, else

  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target); //only observe on page reload once
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//Lazy-loading images using theintersection API to optimize page performance
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  //Replace [BLUR PICTURE] src with [WITH ORIGINAL] data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    //on completion of original imhg load remove blur
    entry.target.classList.remove('lazy-img');
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

///////////////////////////////////////
//Image Slider Loader //////////

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const maxSlide = slides.length;
  const btnRight = document.querySelector('.slider__btn--right');
  const btnLeft = document.querySelector('.slider__btn--left');
  const dotContainer = document.querySelector('.dots');
  let curSlide = 0;

  //lastpart of code before refactor
  //Adding the dots slider in the bottom
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  //set active dot to background color : white
  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    //attaching the data attribute from html page dynamically to access the current slide no.
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };
  //end last part

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`) //0, 100%, 200% et cetera
    );
  };
  //Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  //
  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  //adding keyboard events
  document.addEventListener('keydown', function (e) {
    // console.log(e.key);
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  //delegation of event
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      // const slide = e.target.dataset.slide;
      //Using destructuring
      const { slide } = e.target.dataset;
      // console.log(slide);
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
///LECTURES
/**
 * SELECTING, CREATING AND DELETING ELEMENTS
 */

console.log(document.documentElement); // Select the entire DOM
console.log(document.head); // Select the head area of the DOM
console.log(document.body); // Select the body area of the DOM

console.log(document.getElementById('section--1')); //returns an HTML collection
const allButtons = document.getElementsByTagName('button');
console.log(allButtons); //Updates upon change unlike nodes list they are static

console.log(document.getElementsByClassName('btn'));

//CREATING AND  INSERTING ELEMENTS

/**
 * 1. Create an element maybe a div et cetera...
 * 2. Style  it or maybe apply a classList from css
 * 3. Add textContent using textContent or .innerHTML
 * 4. Attach to a portion or section of our DOM/html page using prepend or append
 */
/*
const header = document.querySelector('.header');

const message = document.createElement('div');

message.classList.add('cookie-message');
// message.insertAdjacentHTML(
//   'afterbegin',
//   'We use cookies for improved functinality and analytics. <button class="btn btn--close--cookie">Got it!</button>'
// );
message.innerHTML =
  'We use cookies for improved functinality and analytics. <button class="btn btn--close--cookie">Got it!</button>';

header.prepend(message);
header.append(message); //overrides the prepend
// header.prepend(message.cloneNode(true)); //creates a copy of element in desired area

// header.before(message);
header.after(message);

//Delete elements
document
  .querySelector('.btn--close--cookie')
  .addEventListener('click', () => message.remove());
*/
/**
 * Styles, attributes and classes
 * Styles set in the DOM are inline css
 */
/*
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.color); //doesn't work becos it is computed in a class in the stylesheet and not defined in the DOM

console.log(message.style.backgroundColor); //works! Defined in the dom

console.log(getComputedStyle(message));
console.log(getComputedStyle(message).color); //allows us access to stylesheet class styles
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
*/
//Working with CSS custom properties
// document.documentElement.style.setProperty('--color-primary', 'orangered');

//Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';
console.log(logo.alt);

//Non-standard
console.log(logo.designer);
('❌');
console.log(logo.getAttribute('designer'));
('✔️');

//Set Attribute
logo.setAttribute('company', 'Bankist');

//Get attribute
console.log(logo.src); //Absolute reference
console.log(logo.getAttribute('src')); //Relative reference

//Data attributes
console.log(logo.dataset.versionNumber);

//Classes
logo.classList.add('c', 'c');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c');

//Smooth scroll implementation
//1 Old school way
const section2 = document.querySelector('#section--1');

const btnScrollTos = document.querySelector('.btn--scroll-to');
btnScrollTo.addEventListener('click', e => {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log('Current scroll', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  //use
  section1.scrollIntoView({ behaviour: 'smooth' });
});

//Types of Events and Event Handlers

//An event is a signal that is generated by a certain dom node

// const h1 = document.querySelector('h1');

// const alertH1 = function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');

//   setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 1000);
// };

// h1.addEventListener('mouseenter', alertH1);

//Event Propagation: Bubbling and Capturing
//Event B and C is the diff travel points on the dom tree between the root elment and the event element. The movement from the root element to the event element is called Capturing phase and reaching the event element if.e. where the event is set is called target phase and the movement from the target phase through it sparentr elements back to the root element fro execution of callback fn() is called bubbling phase. It is worthy to note that not all events go through all 3 phases.

//Event Propagation in Practice

//Creating random color codes rgb(255, 255, 255)

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
console.log(randomColor());

//Attach an event listener to parent and child element ('.nav__link)
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget);

//   //stop Propagation
//   // e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('NAV', e.target, e.currentTarget);
//   },
//   false
// ); //Applying the third parameter true or false enables/disables event listening at the capture phase rather went for the bubble phase

//Dom Traversing: Selecting an element based on another element(relativity) i.e. direct child or direct parent et cetera

const h1 = document.querySelector('h1');

//Going downwards: child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children); //HTML Collection
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

//Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var(--gradient-secondary)'; //⚠️Important for event delegation

//Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.parentElement.children); //HTML collections are iterables

//Collection conversion to array using the spread operator
[...h1.parentElement.children].forEach(function (el) {
  // if (el !== h1) el.style.transform = 'scale(0.5)';
});

//Building a tabbed component

//Intersection Observer API //This is better than the window scroll object as it is more adaptable to all screen sizes regardless.

const obsCallback = function (entries, observer) {
  entries.forEach(entry => {
    //entries take threshold as its argument/iterator value
    //It returns true wen the target is within the threshold of the viewport i.e. top of the dom/web page
    // console.log(entry);
  });
};

const obsOptions = {
  root: null, // root element is the element we want the target element to intersect, setting it to null means setting the root element to the entire viewport
  threshold: [0, 0.1], //this represents the intersection of the target element at the root(which in this case is the viewport)
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);

//Slider

///////////////////////////////////////
//Image Slider Loader //////////
// const slides = document.querySelectorAll('.slide');
// const maxSlide = slides.length;
// const btnRight = document.querySelector('.slider__btn--right');
// const btnLeft = document.querySelector('.slider__btn--left');
// const dotContainer = document.querySelector('.dots');
// let curSlide = 0;

// // const slider = document.querySelector('.slider');
// // slider.style.transform = 'scale(0.4) translateX(-800px)';
// // slider.style.overflow = 'visible';

// const goToSlide = function (slide) {
//   slides.forEach(
//     (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`) //0, 100%, 200% et cetera
//   );
// };
// goToSlide(0);
// //Next slide
// const nextSlide = function () {
//   if (curSlide === maxSlide - 1) {
//     curSlide = 0;
//   } else {
//     curSlide++;
//   }
//   goToSlide(curSlide);
//   activateDot(curSlide);
// };

// const prevSlide = function () {
//   if (curSlide === 0) {
//     curSlide = maxSlide - 1;
//   } else {
//     curSlide--;
//   }

//   goToSlide(curSlide);
//   activateDot(curSlide);
// };
// btnRight.addEventListener('click', nextSlide);
// btnLeft.addEventListener('click', prevSlide);

// //adding keyboard events
// document.addEventListener('keydown', function (e) {
//   // console.log(e.key);
//   if (e.key === 'ArrowLeft') prevSlide();
//   e.key === 'ArrowRight' && nextSlide();
// });

// //Adding the dots slider in the bottom
// const createDots = function () {
//   slides.forEach(function (_, i) {
//     dotContainer.insertAdjacentHTML(
//       'beforeend',
//       `<button class="dots__dot" data-slide="${i}"></button>`
//     );
//   });
// };
// createDots();

// //set active dot to background color : white
// const activateDot = function (slide) {
//   document
//     .querySelectorAll('.dots__dot')
//     .forEach(dot => dot.classList.remove('dots__dot--active'));

//   //attaching the data attribute from html page dynamically to access the current slide no.
//   document
//     .querySelector(`.dots__dot[data-slide="${slide}"]`)
//     .classList.add('dots__dot--active');
// };
// activateDot(0);

// //delegation of event
// dotContainer.addEventListener('click', function (e) {
//   if (e.target.classList.contains('dots__dot')) {
//     // const slide = e.target.dataset.slide;
//     //Using destructuring
//     const { slide } = e.target.dataset;
//     // console.log(slide);
//     goToSlide(slide);
//     activateDot(slide);
//   }
// });

/**
 *     <div class="slider">
        <!--
        <div class="slide slide--1">
          <div class="testimonial">
            <h5 class="testimonial__header">Best financial decision ever!</h5>
            <blockquote class="testimonial__text">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Accusantium quas quisquam non? Quas voluptate nulla minima
              deleniti optio ullam nesciunt, numquam corporis et asperiores
              laboriosam sunt, praesentium suscipit blanditiis. Necessitatibus
              id alias reiciendis, perferendis facere pariatur dolore veniam
              autem esse non voluptatem saepe provident nihil molestiae.
            </blockquote>
            <address class="testimonial__author">
              <img src="img/user-1.jpg" alt="" class="testimonial__photo" />
              <h6 class="testimonial__name">Aarav Lynn</h6>
              <p class="testimonial__location">San Francisco, USA</p>
            </address>
          </div>
        </div>

        <div class="slide slide--2">
          <div class="testimonial">
            <h5 class="testimonial__header">
              The last step to becoming a complete minimalist
            </h5>
            <blockquote class="testimonial__text">
              Quisquam itaque deserunt ullam, quia ea repellendus provident,
              ducimus neque ipsam modi voluptatibus doloremque, corrupti
              laborum. Incidunt numquam perferendis veritatis neque repellendus.
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo
              deserunt exercitationem deleniti.
            </blockquote>
            <address class="testimonial__author">
              <img src="img/user-2.jpg" alt="" class="testimonial__photo" />
              <h6 class="testimonial__name">Miyah Miles</h6>
              <p class="testimonial__location">London, UK</p>
            </address>
          </div>
        </div>

        <div class="slide slide--3">
          <div class="testimonial">
            <h5 class="testimonial__header">
              Finally free from old-school banks
            </h5>
            <blockquote class="testimonial__text">
              Debitis, nihil sit minus suscipit magni aperiam vel tenetur
              incidunt commodi architecto numquam omnis nulla autem,
              necessitatibus blanditiis modi similique quidem. Odio aliquam
              culpa dicta beatae quod maiores ipsa minus consequatur error sunt,
              deleniti saepe aliquid quos inventore sequi. Necessitatibus id
              alias reiciendis, perferendis facere.
            </blockquote>
            <address class="testimonial__author">
              <img src="img/user-3.jpg" alt="" class="testimonial__photo" />
              <h6 class="testimonial__name">Francisco Gomes</h6>
              <p class="testimonial__location">Lisbon, Portugal</p>
            </address>
          </div>
        </div>
        -->
        <div class="slide"><img src="img/img-1.jpg" alt="Photo 1" /></div>
        <div class="slide"><img src="img/img-2.jpg" alt="Photo 2" /></div>
        <div class="slide"><img src="img/img-3.jpg" alt="Photo 3" /></div>
        <div class="slide"><img src="img/img-4.jpg" alt="Photo 4" /></div>
        <button class="slider__btn slider__btn--left">&larr;</button>
        <button class="slider__btn slider__btn--right">&rarr;</button>
        <div class="dots"></div>
      </div>
 */

//More motes
//Dom content loaded - Event is fired by the document as soon as the html is completely parsed i.e. the html has been downloaded

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM Tree Built!', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

window.addEventListener('beforeunload', function (e) {
  e.prventDefault();
  console.log(e);
  e.returnValue = '';
});
