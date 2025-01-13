
// Очистка поля вводу під час завантаження сторінки 
window.addEventListener('DOMContentLoaded', () => {
  const dateTimePicker = document.getElementById('datetime-picker');
  if (dateTimePicker) {
    dateTimePicker.value = ''; // Очищуємо значення поля
  }
});

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const inputDateTimeEl = document.querySelector('#datetime-picker');
  const startBtn = document.querySelector('#start-btn');
  const timerDays = document.querySelector('#days');
  const timerHours = document.querySelector('#hours');
  const timerMinutes = document.querySelector('#minutes');
  const timerSeconds = document.querySelector('#seconds');

  let userSelectedDate = null;
  let intervalId = null;

  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0] <= Date.now()) {
        disableBtn();
        addErrorMessage();
      } else {
        enableBtn();
        removeErrorMessage();
        userSelectedDate = selectedDates[0];
      }
    },
  };

  flatpickr(inputDateTimeEl, options);

  startBtn.addEventListener('click', () => {
    intervalId = setInterval(() => calculateTimeLeft(userSelectedDate), 1000);
    disableBtn();
    inputDateTimeEl.setAttribute('disabled', '');
  });

  function calculateTimeLeft(endTime) {
    const ms = endTime.getTime() - Date.now();
    if (ms <= 0) {
      clearInterval(intervalId);
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(ms);
    timerDays.textContent = addLeadingZero(days);
    timerHours.textContent = addLeadingZero(hours);
    timerMinutes.textContent = addLeadingZero(minutes);
    timerSeconds.textContent = addLeadingZero(seconds);
  }

  function disableBtn() {
    startBtn.setAttribute('disabled', 'true');
  }

  function enableBtn() {
    startBtn.removeAttribute('disabled');
  }

  function addErrorMessage() {
    iziToast.error({
      backgroundColor: 'tomato',
      message: 'Please choose a date in the future',
      position: 'topRight',
    });
  }

  function removeErrorMessage() {
    iziToast.destroy();
  }

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }
});
