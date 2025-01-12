// Очистка поля вводу під час завантаження сторінки
window.addEventListener('DOMContentLoaded', () => {
  const dateTimePicker = document.getElementById('datetime-picker');
  if (dateTimePicker) {
    dateTimePicker.value = ''; // Очищуємо значення поля
  }
});

/// Підключення flatpickr
const datetimePicker = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("#start-btn");
const timeValues = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds"),
};

let selectedDate = null;
let timerInterval = null;

// Ініціалізація flatpickr
flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  dateFormat: "Y-m-d H:i",
  defaultDate: new Date(),
  onClose(selectedDates) {
    const now = new Date();
    selectedDate = selectedDates[0];

    if (selectedDate <= now) {
      startBtn.disabled = true;
      iziToast.error({
        title: "Error",
        message: "Please choose a date in the future",
      });
    } else {
      startBtn.disabled = false;
    }
  },
});

// Додавання події для кнопки Start
startBtn.addEventListener("click", () => {
  if (timerInterval) {
    clearInterval(timerInterval);
  }

  startBtn.disabled = true;

  timerInterval = setInterval(() => {
    const now = new Date();
    const timeDiff = selectedDate - now;

    if (timeDiff <= 0) {
      clearInterval(timerInterval);
      updateTimerDisplay(0);
      return;
    }

    updateTimerDisplay(timeDiff);
  }, 1000);
});

// Функція оновлення таймера
function updateTimerDisplay(timeDiff) {
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  timeValues.days.textContent = String(days).padStart(2, "0");
  timeValues.hours.textContent = String(hours).padStart(2, "0");
  timeValues.minutes.textContent = String(minutes).padStart(2, "0");
  timeValues.seconds.textContent = String(seconds).padStart(2, "0");
}
