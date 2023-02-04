import { getData, postData } from '../utils/fetch';
import unreadMessages from '../components/unreadMessages';

function messenger() {
  const users = document.querySelectorAll('.messenger__user-item');
  const messageForm = document.getElementById('private-message-form');
  const messagesListField = document.querySelector('.messenger__messages');
  const mobileToggle = document.querySelector('.messenger__user-mobile');
  const userListMenu = document.querySelector('.messenger__users');
  let receiverId;

  let readMessageController = new AbortController();
  let getMessageController = new AbortController();
  let checkUnreadMessageController = new AbortController();

  const documentHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--doc-height', `${window.innerHeight}px`);
  };
  window.addEventListener('resize', documentHeight);
  documentHeight();

  window.addEventListener('beforeunload', (event) => {
    readMessageController.abort();
    getMessageController.abort();
    checkUnreadMessageController.abort();
  });

  if (mobileToggle) {
    mobileToggle.addEventListener('click', (event) => {
      userListMenu.classList.toggle('active');
      if (document.body.style.overflow === '') {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    window.addEventListener('click', (event) => {
      if (!event.target.closest('.messenger__users')) {
        userListMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    users.forEach((user) =>
      user.addEventListener('click', (event) => {
        userListMenu.classList.remove('active');
        document.body.style.overflow = '';
      })
    );
  }

  if (!receiverId) {
    messagesListField.innerHTML = `
      <p2 style="margin:auto">Choose user for conversation</p2>
    `;
    messageForm.style.display = 'none';
  }

  const checkUnreadMessages = async () => {
    const usersArr = Array.from(users);
    await Promise.all(
      usersArr.map(async (user) => {
        const userId = user.id.split('-')[1];
        const response = await getData(
          `/user-messages/${userId}`,
          checkUnreadMessageController.signal
        );
        const unreadMessages = user.querySelector(
          '.messanger__unread-messages'
        );
        unreadMessages.textContent = response.unreadMessages;
      })
    );
  };

  const readMessages = async (interlocutor) => {
    const messageData = {
      receiverId: loggedUser,
      senderId: interlocutor,
    };
    try {
      await postData(
        '/user-messages-read',
        messageData,
        null,
        readMessageController.signal
      );
    } catch (error) {
      if (error.name == 'AbortError') {
      }
    }
  };

  const loadMessages = async (userId) => {
    try {
      const response = await getData(
        `/user-messages/${userId}`,
        getMessageController.signal
      );
      if (response.messages.length > 0) {
        messagesListField.innerHTML = '';
        response.messages.forEach((message) => {
          const listItem = document.createElement('div');
          listItem.classList.add(
            'message__item',
            response.userId == message.senderId ? 'right' : 'left'
          );
          listItem.innerHTML = `
              <div class="message__wrap">
                <div class="message__text">${message.text}</div>
                <div class="message__date">${new Date(
                  message.createdAt
                ).toLocaleString()}</div>
              </div>
            `;
          messagesListField.prepend(listItem);
        });
      } else {
        messagesListField.innerHTML = '';
      }
    } catch (error) {
      if (error.name == 'AbortError') {
      }
      messagesListField.innerHTML = 'Failed to receive message';
    }
  };

  const showOnlineUsers = (onlineUsersId) => {
    users.forEach((user) => {
      const userId = user.id.split('-')[1];
      const onlineMark = user.querySelector('.messanger__online-mark');
      if (onlineUsersId && onlineUsersId.includes(userId)) {
        onlineMark.classList.add('active');
      } else {
        if (onlineMark.classList.contains('active')) {
          onlineMark.classList.remove('active');
        }
      }
    });
  };

  socket.on('users', (users) => {
    const onlineUsersId = users.map((user) => user.userId);
    showOnlineUsers(onlineUsersId);
  });

  const uploadMessages = (data, type = 'send') => {
    const listItem = document.createElement('div');
    listItem.classList.add(
      'message__item',

      type === 'send' ? 'right' : 'left'
    );
    listItem.innerHTML = `
      <div class="message__wrap">
        <div class="message__user-avatar"></div>
        <div class="message__text">${data.message}</div>
        <div class="message__date">${new Date(
          data.createdAt
        ).toLocaleString()}</div>
      </div>
    `;
    messagesListField.prepend(listItem);
  };

  const initLatestConversation = () => {
    const userId = localStorage.getItem('interlocutor');
    if (userId) {
      const userItem = document.getElementById(`user-${userId}`);
      if (userItem) {
        userItem.classList.add('active');
        receiverId = userId;
        messageForm.style.display = 'flex';
        loadMessages(userId);
      }
    }
  };

  socket.on('getMessage', (data) => {
    checkUnreadMessages();
    if (data.sender === receiverId) {
      uploadMessages(data, 'receive');
    }
  });

  users.forEach((user) => {
    user.addEventListener('click', async (event) => {
      readMessageController.abort();
      getMessageController.abort();
      readMessageController = new AbortController();
      getMessageController = new AbortController();
      users.forEach((user) => user.classList.remove('active'));
      user.classList.add('active');
      const interlocutorId = user.id.split('-')[1];
      receiverId = interlocutorId;
      messageForm.style.display = 'flex';
      localStorage.setItem('interlocutor', interlocutorId);
      unreadMessages();
      await readMessages(interlocutorId);
      await checkUnreadMessages();
      await loadMessages(interlocutorId);
    });
  });

  document
    .getElementById('private-message')
    .addEventListener('click', async () => {
      const interlocutorId = localStorage.getItem('interlocutor');
      unreadMessages();
      await readMessages(interlocutorId);
      await checkUnreadMessages();
    });

  messageForm.addEventListener('submit', async (event) => {
    let message = document.getElementById('private-message').value;
    event.preventDefault();
    if (message.trim() === '' || !receiverId) {
      return;
    }
    socket.emit('sendMessage', {
      sender: loggedUser,
      receiver: receiverId,
      message: message,
    });

    uploadMessages(
      {
        message: message,
        createdAt: new Date(),
      },
      'send'
    );

    try {
      await postData('/user-messages/', {
        receiverId: receiverId,
        message: message,
      });
      messageForm.reset();
    } catch (error) {
      if (error.name == 'AbortError') {
      }
    }
  });

  checkUnreadMessages();
  showOnlineUsers();
  initLatestConversation();
}

messenger();
