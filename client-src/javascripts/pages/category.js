import { postData } from '../utils/fetch';
import modal from '../ui/modal';

function addCategory() {
  const categoryForm = document.getElementById('edit-category');

  const [modalShow] = modal();

  categoryForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const categoryName = document.getElementById('categoryName').value;
    const categorySlug = document.getElementById('categorySlug').value;
    if (categoryName && categoryName.trim().length > 0) {
      try {
        const response = await postData('/admin/articles/add-category', {
          categoryName,
          categorySlug,
        });
        modalShow(response.message);
        categoryForm.reset();
      } catch (error) {
        modalShow(error.message);
      }
    }
  });
}

addCategory();
