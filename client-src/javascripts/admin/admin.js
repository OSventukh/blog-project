import {deleteItem, deleteMultipleItems} from './deleteItem';

// Deleting articles
deleteItem('/post/delete', '.articles__item-delete');

deleteMultipleItems('/post/delete', '.articles__check');

// Deleting users
deleteItem('/post/delete', '.users__item-delete');

deleteMultipleItems('/post/delete', '.users__check');