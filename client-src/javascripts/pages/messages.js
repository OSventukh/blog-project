import { getData, postData } from '../utils/fetch.js';


function messenger() {
  const users = document.querySelectorAll('.messenger__user-item');
  const messageForm = document.getElementById('private-message-form');
  const messagesListField = document.querySelector('.messenger__messages');
  const mobileToggle = document.querySelector('.messenger__user-mobile');
  const userListMenu = document.querySelector('.messenger__users');
  let receiverId;
  
  const documentHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--doc-height', `${window.innerHeight}px`);
  };
  window.addEventListener('resize', documentHeight);
  documentHeight();

  if (mobileToggle) {
    mobileToggle.addEventListener('click', (event) => {
      userListMenu.classList.toggle('active');
      if (document.body.style.overflow === '') {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }

  if (!receiverId) {
    messagesListField.innerHTML = `
      <p2 style="margin:auto">Choose user for conversation</p2>
    `
    messageForm.style.display = 'none';
  }

  const loadMessages = async (userId) => {
    const response = await getData(`/user-messages/${userId}`);

    if (!response.ok) {
      console.log('error');
    }
    messagesListField.innerHTML = '';

    if (response.messages.length > 0) {
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
    }
  };


  const showOnlineUsers = () => {
    const onlineUsersId = sessionStorage.getItem('usersOnline');
    users.forEach((user) => {
      const userId = user.id.split('-')[1];
      const onlineMark = user.querySelector('.messanger__online-mark')
      if (onlineUsersId && onlineUsersId.includes(userId)) {
        onlineMark.classList.add('active')
      } else {
        if (onlineMark.classList.contains('active')) {
          onlineMark.classList.remove('active')
        }
      }
    })

  }

  const getOlineUsers = (onlineUsersId) => {
    sessionStorage.removeItem('usersOnline')
    sessionStorage.setItem('usersOnline', onlineUsersId)
  }

  socket.on('users', users => {
    const onlineUsersId = users.map((user) => user.userId)
    getOlineUsers(onlineUsersId);
    showOnlineUsers();
  })

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
    console.log(data, receiverId)
    if (data.sender === receiverId) {
      uploadMessages(data, 'receive');

    }
  });

  users.forEach((user) => {
    user.addEventListener('click', async (event) => {
      users.forEach((user) => user.classList.remove('active'));
      user.classList.add('active');
      const interlocutorId = user.id.split('-')[1];
      receiverId = interlocutorId;
      // socket.emit('createConversation', {
      //   sender: currentUser,
      //   receiver: interlocutorId,
      // })
      messageForm.style.display = 'flex';
      localStorage.setItem('interlocutor', interlocutorId);

      await loadMessages(interlocutorId);
    });
  });

  messageForm.addEventListener('submit', async (event) => {
    let message = document.getElementById('private-message').value;
    event.preventDefault();
    if (message.trim() === '' || !receiverId) {
      return;
    }


    socket.emit('sendMessage', {
      sender: currentUser,
      receiver: receiverId,
      message: message,
    });

    uploadMessages({
      message: message,
      createdAt: new Date(),
    }, 'send')

    const response = await postData('/user-messages/', {
      receiverId: receiverId,
      message: message,
    });

    if (response.ok) {
      messageForm.reset();
    }
  });

  showOnlineUsers();
  initLatestConversation();

}

messenger();
