import { postData, getData } from '../../utils/fetch.js';
import modal from '../../ui/modal.js';
const [modalShow, modalClose] = modal();

async function saveData(
  editor,
  inputs,
  postStatus,
  postId,
  actionButtons,
  event
) {
  const pressedButton = event.currentTarget;
  if (event) {
    pressedButton.disabled = true;
  }

  const [title, category, tags, slug] = inputs;

  const contentValue = editor.getData();

  const titleValue = title.value;
  const categoryValue = category.value;
  const tagsValue = tags.value;
  const slugValue = slug.value;

  const data = {
    content: contentValue,
    title: titleValue,
    category: categoryValue,
    tags: tagsValue,
    slug: slugValue,
    postId: postId,
    postStatus: postStatus,
  };

  try {
    const response = await postData('/add-post', data);
    if (postStatus && postStatus === 'published') {
      const [saveButton, publishButton] = actionButtons;

      saveButton && saveButton.remove();
      publishButton.textContent = 'update';
    }

    window.history.pushState({}, 'Article', `?id=${response.postId}`);
  } catch (error) {
    pressedButton.disabled = false;
    modalShow(error.message);
  }
}

async function getPreviousContent(editor, postId) {
  try {
    const response = await getData(`/post-edit/${postId}`);
    editor.setData(response.content);
  } catch (error) {
    modalShow(error.message);
  }
}

function changeHandler(editor, inputs, actionButtons) {
  const activeActionButtons = () => {
    actionButtons.forEach((btn) => {
      if (btn) {
        btn.disabled = false;
      }
    });
  };

  editor.model.document.on('change:data', (evt, data) => {
    activeActionButtons();
  });

  inputs.forEach((input) => {
    input.addEventListener('input', activeActionButtons);
  });
}

function initCKEditor() {
  const titlePlaceholder = 'Type your title';
  const contentPlaceholder = 'Type your content';

  const saveButton = document.getElementById('save');
  const saveMobileButton = document.getElementById('save-mobile');
  const publishButton = document.getElementById('publish');
  const publishMobile = document.getElementById('publish-mobile');
  const token = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute('content');
  const postId = document.querySelector('input[name="postId"]').value;

  const title = document.getElementById('article-title');
  const category = document.getElementById('article-category');
  const tags = document.getElementById('article-tags');
  const slug = document.getElementById('article-slug');

  title.placeholder = titlePlaceholder;
  BalloonBlockEditor.create(document.querySelector('#editor'), {
    licenseKey: '',
    simpleUpload: {
      uploadUrl: '/editor-upload-image',

      // Enable the XMLHttpRequest.withCredentials property.
      withCredentials: true,

      // Headers sent along with the XMLHttpRequest to the upload server.
      headers: {
        'CSRF-Token': token,
      },
    },
    placeholder: contentPlaceholder,
  })
    .then(async (editor) => {
      window.editor = editor;

      postId && (await getPreviousContent(editor, postId));

      const inputs = [title, category, tags, slug];
      const actionButtons = [saveButton, publishButton];
      changeHandler(editor, inputs, actionButtons);

      publishButton.addEventListener('click', async (event) => {
        saveData(editor, inputs, 'published', postId, actionButtons, event);
      });

      publishMobile.addEventListener('click', async (event) => {
        saveData(editor, inputs, 'published', postId, actionButtons, event);
      });

      saveButton.addEventListener('click', async (event) => {
        saveData(editor, inputs, 'draft', postId, actionButtons, event);
      });

      saveMobileButton.addEventListener('click', async (event) => {
        saveData(editor, inputs, 'draft', postId, actionButtons, event);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

function openArticleMobileMenu() {
  const optionsMenuBtn = document.getElementById('mobile-article-options');
  const optionsMenu = document.querySelector('.article-edit__control-area');

  optionsMenuBtn.addEventListener('click', (event) => {
    event.stopPropagation();

    optionsMenu.classList.toggle('active');
  });

  window.addEventListener('click', (event) => {
    event.stopPropagation();
    if (
      !event.target.matches('.article-edit__control-area') &&
      !event.target.matches('.article-edit__control-area > *')
    ) {
      if (optionsMenu.classList.contains('active')) {
        optionsMenu.classList.remove('active');
      }
    }
  });
}
openArticleMobileMenu();
initCKEditor();
