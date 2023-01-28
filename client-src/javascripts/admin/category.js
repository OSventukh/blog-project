const editCategoryForm = document.getElementById('edit-category');

if (editCategoryForm) {
  editCategoryForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const categoryName = document.getElementById('categoryName').value;
    const categorySlug = document.getElementById('categorySlug').value;
  
    const data = JSON.stringify({
      categoryName: categoryName,
      categorySlug: categorySlug,
    });
  
    const response = await fetchData('/admin/articles/add-category', data);
    if (response.ok) { 
      return location.href = '/admin/articles/categories';
    }
  
    const res = await response.json();
  
    if (res.message) {
    
      const errorMessage = document.createElement('div');
      errorMessage.classList.add('message__alert', 'error', 'show');
      const existError = document.querySelector('.message__alert');
  
      if (existError) {
        existError.remove();
      }
  
      errorMessage.textContent = res.message;
      editCategoryForm.prepend(errorMessage);
    }
  });
}

