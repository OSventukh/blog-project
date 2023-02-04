import { getData } from '../utils/fetch';

export default function unreadMessages() {
  const getUnreadMessages = async () => {
    const response = await getData('/user-messages-unread-sender');

    return response.messagesAmount;
  };

  const showUnreadMessages = (messagesAmount) => {
    const unreadMessagesUI = document.querySelector(
      '.navigation__submenu-messages-amount'
    );

    const messageAlertUI = document.querySelector('.navigation__message-alert');
    unreadMessagesUI.textContent = messagesAmount > 0 ? messagesAmount : '';
    if (messagesAmount > 0) {
      unreadMessagesUI.classList.add('show');
      messageAlertUI.classList.add('show');
    } else {
      unreadMessagesUI.classList.remove('show');
      messageAlertUI.classList.remove('show');
    }
  };
  socket.on('getMessage', async (data) => {
    const messagesAmount = await getUnreadMessages();
    showUnreadMessages(messagesAmount);
  });

  getUnreadMessages().then((messagesAmount) => {
    showUnreadMessages(messagesAmount);
  });
}
