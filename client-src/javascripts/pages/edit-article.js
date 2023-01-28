import { postData, getData } from '../utils/fetch.js';
import notification from '../ui/notification.js';

function editArticle() {
  const saveButton = document.getElementById('save');
  const publishButton = document.getElementById('publish');
  const title = document.getElementById('title');
  const postId = document.querySelector('input[name="postId"]').value;
  const categoryId = document.querySelector('input[name="categoryId"]').value;
  const token = document
  .querySelector('meta[name="csrf-token"]')
  .getAttribute('content');

  const [showNotification, closeNotification] = notification();

  const beforeUnloadListener = (event) => {
    event.preventDefault();
    return (event.returnValue = 'Are you sure you want to exit?');
  };

  if (categoryId) {
    const categorySelect = document.querySelector('.post__category');
    for (const option of categorySelect.options) {
      if (categoryId === option.value) {
        option.selected = true;
      }
    }
  }

  title.addEventListener('input', (event) => {
    if (saveButton) {
      saveButton.disabled = false;
    }

    if (publishButton) {
      publishButton.disabled = false;
    }

    closeNotification();
  });

  const editor = new EditorJS({
    holder: 'editor',

    tools: {
      paragraph: {
        class: Paragraph,
        inlineToolbar: true,
        config: { placeholder: 'Enter you text' },
      },
      header: {
        class: Header,
        inlineToolbar: true,
        config: {
          placeholder: 'Enter Title',
          levels: [3, 4, 5, 6],
          defaultLevel: 2,
        },
      },

      list: {
        class: List,
        inlineToolbar: true,
      },
      style: EditorJSStyle.StyleInlineTool,
      image: {
        class: ImageTool,
        config: {
          additionalRequestHeaders: {
            'CSRF-Token': token,
          },
          endpoints: {
            byFile: 'http://localhost:3000/editor-upload-image/', // Your backend file uploader endpoint
            byUrl: 'http://localhost:3000/editor-url-image', // Your endpoint that provides uploading by Url
          },
          field: 'image',
        },
      },
    },

    onChange: (api, event) => {
      if (saveButton) {
        saveButton.disabled = false;
      }

      if (publishButton) {
        publishButton.disabled = false;
      }

      window.addEventListener('beforeunload', beforeUnloadListener);
      closeNotification();
    },
    onReady: () => {
      // fetching old data
      if (postId) {
        getData(`/post-edit/${postId}`).then((response) => {
          if (response.ok) {
            const data = JSON.parse(response.text);
            editor.blocks.render(data);
          }
        });
      }

      if (saveButton) {
        saveButton.addEventListener('click', () => {
          const category = document.getElementById('category').value;
          const tags = document.getElementById('tags').value;

          editor
            .save()
            .then((text) => {
              // allow leave page without confirmation
              window.removeEventListener('beforeunload', beforeUnloadListener);
              // send article data to server
              // article will be save as draft and will not display on site pages
              return postData('/add-post', {
                title: title.value,
                text: text,
                category: category,
                tags: tags,
                postId: postId,
                articleStatus: 'draft',
              });
            })
            .then((res) => {
         
              if (res.type === 'error') {
                return Promise.reject(new Error(res.message));
              }
              saveButton.disabled = true;

              if (postId != res.postId) {
                window.history.pushState({}, 'Article', `?id=${res.postId}`);
                // window.location.replace("?id=" + res.postId);
              }
            })
            .catch((error) => {
              showNotification(error.message, '.post__controls', 'error', true);
            });
        });
      }
      if (publishButton) {
        publishButton.addEventListener('click', () => {
          const category = document.getElementById('category').value;
          const tags = document.getElementById('tags').value;
          editor
            .save()
            .then((text) => {
              // send article data to server
              // the article will be published on site pages

              window.removeEventListener('beforeunload', beforeUnloadListener);

              return postData('/add-post', {
                title: title.value,
                text: text,
                category: category,
                tags: tags,
                postId: postId,
                articleStatus: 'published',
              });
            })
            .then((res) => {
              if (res.type === 'error') {
                return Promise.reject(new Error(res.message));
              }

              publishButton.disabled = true;

              publishButton.textContent = 'update';

              if (saveButton) {
                saveButton.style.display = 'none';
              }

              if (postId != res.postId) {
                window.history.pushState({}, 'Article', `?id=${res.postId}`);
              }
            })
            .catch((error) => {
              showNotification(error.message, '.post__controls', 'error', true);
            });
        });
      }
    },
  });


  document.addEventListener('DOMContentLoaded', function (event) {
    var scrollpos = localStorage.getItem('scrollpos');
    if (scrollpos) window.scrollTo(0, scrollpos);
  });

  window.onbeforeunload = function (e) {
    localStorage.setItem('scrollpos', window.scrollY);
  };
}

editArticle();
