export default function notification() {
  function notificationShow(
    message,
    selector,
    status='error',
    withCloseBtn = false,
    methodInserts = 'beforebegin'
  ) {
    const notificationTemplate = `
    <div class="message__alert ${status}">
      ${ withCloseBtn ? '<button class="message__alert-close"><i class="fa-solid fa-xmark"></i></button>' : ''}
      <div class="message__alert-content">
        ${message}
      </div>
    </div>
  `;

    const existError = document.querySelector('.message__alert');

    if (existError) {
      existError.remove();
    }

    document.querySelector(selector).insertAdjacentHTML(methodInserts, notificationTemplate);
    
    
    const closeBtn = document.querySelector('.message__alert-close');

    if (closeBtn) {
      closeBtn.addEventListener('click', closeNotification);
    }
  }

  function notificationClose() {
    document.querySelector('.message__alert').remove();
  }

  return [notificationShow, notificationClose];
}
