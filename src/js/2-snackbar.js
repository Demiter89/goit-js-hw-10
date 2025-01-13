import iziToast from "izitoast";

// Підключення DOM елементів
const form = document.querySelector('.form');
const delayInput = document.querySelector('#delay');

// Обробник сабміту форми
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Отримання даних із форми
  const delay = Number(delayInput.value);
  const state = form.elements.state.value;

  // Перевірка, чи введено коректний delay
  if (isNaN(delay) || delay <= 0) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a valid delay in milliseconds.',
    });
    return;
  }

  // Створення промісу
  createPromise(delay, state)
    .then((message) => {
      iziToast.success({
        title: 'Success',
        message: message,
      });
    })
    .catch((message) => {
      iziToast.error({
        title: 'Error',
        message: message,
      });
    });
});

// Функція створення промісу
function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
}
