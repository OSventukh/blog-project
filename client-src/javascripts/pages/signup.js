import { postData } from '../utils/fetch';
import notification from '../ui/notification';
function signup() {
  const [notificationShow, notificationClose] = notification();

  const signupForm = document.getElementById('signup-form');

  signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('signup-email').value;
    const nickname = document.getElementById('signup-nickname').value;
    const password = document.getElementById('signup-password').value;

    try {
      await postData('/signup', {
        email: email,
        nickname: nickname,
        password: password,
      });
      location.href = '/?confirm-email';
    } catch (error) {
      notificationShow(
        error.message,
        '#signup-form',
        'error',
        false,
        'afterbegin'
      );
    }
  });
}

signup();
