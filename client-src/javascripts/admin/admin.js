import {deleteItem, deleteMultipleItems} from './deleteItem';

// Deleting articles
deleteItem('/post/delete', '.articles__item-delete', 'Are you sure you want to delete this article?');

deleteMultipleItems('/post/delete', '.articles__check', 'Are you sure you want to delete this articles?');

// Deleting users
deleteItem('/admin/delete-users', '.users__item-delete', 'Are you sure you want to delete this user?');

deleteMultipleItems('/admin/delete-users', '.users__check', 'Are you sure you want to delete this users?');