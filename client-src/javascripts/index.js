import navigation from './ui/nav';
import pagination from './ui/pagination';
import auth from './components/auth';
import footer from './components/footer';
import connectSocket from './components/socket';
import unreadMessages from './components/unreadMessages';

const loggedUser = document.currentScript.getAttribute('loggedUser');
window.socket = connectSocket(loggedUser);
window.loggedUser = loggedUser
navigation();
pagination();
auth();
footer();
unreadMessages();
