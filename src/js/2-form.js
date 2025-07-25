const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

// 🔹 Початкові значення
let formData = {
  email: '',
  message: '',
};

// 🔹 Завантажити дані з localStorage при старті
loadFormData();

// 🔹 Обробник input з делегуванням
form.addEventListener('input', event => {
  const { name, value } = event.target;

  formData[name] = value.trim(); // зберігати обрізане значення
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// 🔹 Обробник submit
form.addEventListener('submit', event => {
  event.preventDefault();

  const { email, message } = formData;

  // Валідація
  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  console.log('📝 Form submitted:', formData);

  // Очистити все
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  form.reset();
});

// 🔹 Завантаження даних із localStorage
function loadFormData() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (!savedData) return;

  try {
    const parsedData = JSON.parse(savedData);
    formData = { ...formData, ...parsedData }; // оновити тільки існуючі поля

    // Заповнити форму
    if (parsedData.email) {
      form.elements.email.value = parsedData.email;
    }
    if (parsedData.message) {
      form.elements.message.value = parsedData.message;
    }
  } catch (e) {
    console.warn('❌ Error parsing saved form data', e);
  }
}