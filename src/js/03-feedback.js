import throttle from 'lodash.throttle';

// task 1: Salvăm starea formularului în local storage la fiecare modificare a câmpurilor "email" și "message"
const emailInput = document.querySelector('input[name="email"]');
const messageTextarea = document.querySelector('textarea[name="message"]');

function saveFormState() {
  // Salvăm valorile câmpurilor într-un obiect
  const formState = {
    email: emailInput.value,
    message: messageTextarea.value,
  };

  // Salvăm obiectul în local storage sub cheia "feedback-form-state"
  localStorage.setItem('feedback-form-state', JSON.stringify(formState));
}

emailInput.addEventListener('input', saveFormState);
messageTextarea.addEventListener('input', saveFormState);

// task 2: Completăm câmpurile formularului cu datele din local storage la încărcarea paginii
function populateFormFields() {
  // Verificăm dacă există date salvate sub cheia "feedback-form-state"
  const savedState = localStorage.getItem('feedback-form-state');

  if (savedState) {
    // Dacă există date salvate, le parsăm din JSON și completăm câmpurile formularului
    const formState = JSON.parse(savedState);
    emailInput.value = formState.email;
    messageTextarea.value = formState.message;
  }
}

// Ascultăm evenimentul "load" pentru a apela funcția la încărcarea paginii
window.addEventListener('load', populateFormFields);

// task 3: Ștergem datele din local storage la trimiterea formularului și afișăm datele în consolă
const form = document.querySelector('.feedback-form');

function clearLocalStorage() {
  // Ștergem datele sub cheia "feedback-form-state" din local storage
  localStorage.removeItem('feedback-form-state');
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Obținem valorile curente ale câmpurilor email și message
  const currentEmailValue = emailInput.value;
  const currentMessageValue = messageTextarea.value;

  // Afișăm în consolă un obiect cu câmpurile și valorile lor curente
  const formValues = {
    email: currentEmailValue,
    message: currentMessageValue,
  };
  console.log(formValues);

  // Apelăm funcția pentru ștergerea datelor din local storage
  clearLocalStorage();
});

// task 4: Utilizăm throttle pentru a limita apelurile funcției la fiecare 500ms
const throttledSaveFormState = throttle(saveFormState, 500);

emailInput.addEventListener('input', throttledSaveFormState);
messageTextarea.addEventListener('input', throttledSaveFormState);
