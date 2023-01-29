import { postData } from '../utils/fetch.js';
import notification from '../ui/notification.js';

const [notificationShow, notificationClose] = notification();
function resetPassword() {
  const resetForm = document.getElementById('reset-form');

  resetForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const passwordInput = document.getElementById('reset-password');
    const emailInput = document.getElementById('reset-email');

    let password;
    let email;

    if (passwordInput) {
      password = passwordInput.value.trim();
    }

    if (emailInput) {
      email = emailInput.value.trim();
    }

    try {
      const response = await postData('/reset', {
        password: password ? password : null,
        email: email ? email : null,
      });
      location = '/?confirm-email'
    } catch (error) {
      notificationShow(error.message, '#reset-form', 'error', false, 'afterbegin')
    }
  });
}

resetPassword();