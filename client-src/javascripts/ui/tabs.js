export default function tabs(id, status) {
  document.getElementById(id).addEventListener('click', (e) => {
    const searchParams = new URLSearchParams(window.location.search);
    e.target.classList.add('active')
    searchParams.set('status', status)
    searchParams.set('page', 1)
    window.location.search = searchParams.toString();
  })

}

