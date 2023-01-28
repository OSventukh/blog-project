import modal from '../ui/modal';
import { postData } from '../utils/fetch';
import notification from '../ui/notification';

export default function auth() {
  const [modalShow] = modal();
  const [notificationShow, notificationClose] = notification();

  const loginButton = document.getElementById('login-button');

  function loginHandler(redirect = false) {
    let loginForm = `
    <form class="login-form" id="login-form" action="/login" method="post">
      <div class="form-control">
          <label for="email">Login:</label>
          <div class="input-wrap">
            <input class="login-form__input" type="email" name="email" id="email" autocomplete="email" required>
            <i class="fa-solid fa-envelope"></i>
          </div>
        </div>
        <div class="form-control">
          <label for="password">Password:</label>
          <div class="input-wrap">
            <input class="login-form__input" type="password" name="password" id="password" autocomplete="current-password" required>
            <i class="fa-solid fa-key"></i>
          </div>
        </div>
        <div class="form-buttons login-form__buttons">
          <a class="login-form__reset" href="/reset">Forgot Password</a>
          <button class="button login-form__submit" type="submit">Login</button>
        </div>
      </form>
  `;
    modalShow(loginForm);

    if (loginForm) {
      const form = document.getElementById('login-form');
      form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
          const response = await postData('/login', {
            email: email,
            password: password,
          });

          if (redirect && typeof redirect === 'string') {
            return (location = redirect);
          }
          return location.reload();
        } catch (error) {
          notificationShow(
            error.message,
            '#login-form',
            'error',
            false,
            'afterbegin'
          );
        }
      });
    }
  }

  if (loginButton) {
    loginButton.addEventListener('click', (event) => {
      loginHandler();
    });
  }

  if (location.search === '?login') {
    loginHandler('/');
  }

  if (location.search === '?confirm-email') {
    modalShow('A confirmation link has been sent to your email');
  }
}
