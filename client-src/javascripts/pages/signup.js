import { postData } from '../utils/fetch.js';


function signup() {
  const signupForm = document.getElementById('signup-form');

  signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('signup-email').value;
    const nickname = document.getElementById('signup-nickname').value;
    const password = document.getElementById('signup-password').value;

    const response = await postData('/signup', {
      email: email,
      nickname: nickname,
      password: password,
    });

    console.log(response)
    if (response.ok) {
      return (location.href = '/?confirm-email');
    }

    if (response.message) {
      const errorMessage = document.createElement('div');
      errorMessage.classList.add('message__alert', 'error', 'show');
      const existError = document.querySelector('.message__alert');

      if (existError) {
        existError.remove();
      }

      errorMessage.textContent = response.message;
      signupForm.prepend(errorMessage);
    }
  });
}

signup();
