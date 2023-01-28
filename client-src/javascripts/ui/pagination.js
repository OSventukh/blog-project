export default function pagination() {
  const pages = document.querySelectorAll('.page');
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');

  pages.forEach((page, i) => {
    page.addEventListener('click', (e) => {
      e.preventDefault();
      const searchParams = new URLSearchParams(window.location.search);
      console.log(searchParams.get('page'));
      searchParams.set('page', i + 1);
      window.location.search = searchParams.toString();
    });
  });

  if (prev) {
    prev.addEventListener('click', (e) => {
      console.log('prev');
      e.preventDefault();
      const searchParams = new URLSearchParams(window.location.search);
      const currentPage = +searchParams.get('page');
      searchParams.set('page', currentPage - 1);
      window.location.search = searchParams.toString();
    });
  }

  if (next) {
    next.addEventListener('click', (e) => {
      console.log('next');
      e.preventDefault();
      const searchParams = new URLSearchParams(window.location.search);
      const currentPage = +searchParams.get('page');
      searchParams.set('page', currentPage + 1);
      window.location.search = searchParams.toString();
    });
  }
}
