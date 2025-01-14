'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout {
    date = new Date();
    id = (Date.now() + '').slice(-10);
    clicks = 0;
    constructor(coords, distance, duration) {
        this.coords = coords; // [lat, lng]
        this.distance = distance; // in km
        this.duration = duration; // in minutes
    }

    _setDescription() {
        ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`
    }

    click() {
        this.clicks++;
    }
}

class Running extends Workout {
    type = 'running'
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence
        this.calcPace();
        this._setDescription();
    }

    calcPace() {
        // min/km
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}
class Cycling extends Workout {
    type = 'cycling'

    constructor(coords, distance, duration, elevation) {
        super(coords, distance, duration);
        this.elevation = elevation
        this.calcSpeed();
        this._setDescription();
    }

    calcSpeed() {
        // min/km
        this.speed = this.distance / (this.duration / 60)
        return this.speed;
    }
}

// const run1 = new Running([39, -12], 5.2, 24, 178)
// const Cycling1 = new Cycling([39, -12], 27, 95, 523)
// console.log(run1)
// console.log(Cycling1)

//////////////////////////////////////
// Application Architecture
class App {
    //private instance properties
    #map;
    #mapEvent;
    #mapZoomLevel = 13;
    #workouts = [];

    constructor() {
        //Get user's position
        this._getPosition();

        // Get data from local storage
        this._getLocalStorage()

        form.addEventListener('submit', this._newWorkout.bind(this));

        inputType.addEventListener('change', this._toggleElevationField);
        containerWorkouts.addEventListener('click', this._moveToPopup.bind(this))
    }

    _getPosition() {
        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),
                function () {
                    alert('Could not get your position');
                }
            )
    }

    _loadMap(position) {
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        // console.log(`https://www.google.com/maps/@${latitude},${longitude}`)

        const coords = [latitude, longitude];
        this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        //leaflet event
        /**
         On click the mapEvent returns the clicked position on the map,
         which is passsed to l.marker and binded using the bindPopup
         such that on click by user the marker points to the clicked location.
         */
        //Handle click on map
        this.#map.on('click', this._showForm.bind(this));

        // Loading saved map marker on map load from local storage
        this.#workouts.forEach(work => {
            this._renderWorkoutMarker(work)
        })
    }

    _showForm(mapE) {
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
    }

    _hideForm() {
        inputDistance.value = inputDuration.value = inputElevation.value = inputCadence.value = '';
        inputDistance.blur();
        form.style.display = 'none'
        form.classList.add('hidden');
        setTimeout(() => (form.style.display = 'grid'), 1000)
    }

    _toggleElevationField() {
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }

    _newWorkout(e) {
        const validInputs = (...inputs) => inputs.every(inp => Number.isFinite(inp))
        const allPositive = (...inputs) => inputs.every(inp => inp > 0);
        e.preventDefault();

        // Get data from form
        const type = inputType.value
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        const { lat, lng } = this.#mapEvent.latlng;
        let workout;

        //Check if data is valid

        // If workout running, create running object
        if (type === 'running') {
            const cadence = +inputCadence.value;
            // Check if data is valid
            if (
                // !Number.isFinite(distance) ||
                // !Number.isFinite(duration) ||
                // !Number.isFinite(cadence))
                !validInputs(distance, duration, cadence) || !allPositive(distance, duration, cadence))
                return alert('Inputs have to be positive numbers!');

            workout = new Running([lat, lng], distance, duration, cadence);

            // Add new object to workout array
            this.#workouts.push(workout);
            console.log(workout);
        }
        // If workout cycling, create cycling object
        if (type === 'cycling') {
            const elevation = +inputElevation.value;
            if (
                !validInputs(distance, duration, elevation))
                return alert('Inputs have to be positive numbers');
            workout = new Cycling([lat, lng], distance, duration, elevation);
            // Add new object to workout array
            this.#workouts.push(workout);
            // console.log(workout);

        }
        // Render workout on map as marker
        this._renderWorkoutMarker(workout);

        //Render workout on list
        this._renderWorkout(workout);

        // Hide form + clear input field
        this._hideForm()

        // Set local storage to all workouts
        this._setLocalStorage()
    }

    _renderWorkoutMarker(workout) {
        //Binds marker to map on form submission
        L.marker(workout.coords).addTo(this.#map)
            .bindPopup(L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: `${workout.type}-popup`,
            }))
            .setPopupContent(`${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`)
            .openPopup();
    }

    _renderWorkout(workout) {
        let html = `
            <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
         `;

        if (workout.type === 'running')
            html += `
             <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
            </div>
            <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>
         `;

        if (workout.type === 'cylcing')
            html += `
              <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>
            `;

        form.insertAdjacentHTML('afterend', html)
    }

    _moveToPopup(e) {
        // Zoom clicked workout area on map
        const workoutEl = e.target.closest('.workout');
        // console.log(workoutEl)

        if (!workoutEl) return;

        const workout = this.#workouts.find(work => work.id === workoutEl.dataset.id);
        console.log(workout)

        this.#map.setView(workout.coords, this.#mapZoomLevel, {
            animate: true,
            pan: {
                duration: 1,
            }
        });

        // workout.click();
    }

    _setLocalStorage() {
        localStorage.setItem('workouts', JSON.stringify(this.#workouts))
    }

    _getLocalStorage() {

        const data = JSON.parse(localStorage.getItem('workouts'));
        // console.log(data)

        if (!data) return;

        this.#workouts = data

        this.#workouts.forEach(work => {
            this._renderWorkout(work)
        })
    }

    reset() {
        localStorage.removeItem('workouts');
        // reload webpage
        location.reload();
    }
}
const app = new App();







//before using classes
//let map, mapEvent;

// if (navigator.geolocation)
//     navigator.geolocation.getCurrentPosition(
//         function (position) {
//             const { latitude } = position.coords;
//             const { longitude } = position.coords;
//             // console.log(`https://www.google.com/maps/@${latitude},${longitude}`)con

//             const coords = [latitude, longitude];
//             map = L.map('map').setView(coords, 13);

//             L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//                 attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             }).addTo(map);

//             //leaflet event
//             /**
//              On click the mapEvent returns the clicked position on the map,
//              which is passsed to l.marker and binded using the bindPopup
//              such that on click by user the marker points to the clicked location.
//              */
//             //Handle click on map
//             map.on('click', function (mapE) {
//                 mapEvent = mapE;
//                 form.classList.remove('hidden');
//                 inputDistance.focus();
//             })
//         },
//         function () {
//             alert('Could not get your position');
//         }
//     )


//form.addEventListener('submit', function (e) {
//     e.preventDefault();
//     //clear input fieldws
//     inputDistance.value = inputDuration.value = inputElevation.value = inputCadence.value = '';

//     const { lat, lng } = mapEvent.latlng;
//     L.marker([lat, lng]).addTo(map)
//         .bindPopup(L.popup({
//             maxWidth: 250,
//             minWidth: 100,
//             autoClose: false,
//             closeOnClick: false,
//             className: 'running-popup',
//         }))
//         .setPopupContent('Workout')
//         .openPopup();
// })

// inputType.addEventListener('change', function () {
//     inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
//     inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
// })