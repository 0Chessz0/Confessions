const content = document.getElementById('content');
const links = document.querySelectorAll('.nav-links a');

async function loadPage(page) {
  if (page === 'home') {
    location.reload(); // go back to homepage
    return;
  }

  content.classList.remove('show');
  const res = await fetch(`${page}.html`);
  const html = await res.text();
  setTimeout(() => {
    content.innerHTML = html;
    content.classList.add('show');
  }, 300);
}

links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    links.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    const page = link.getAttribute('href').substring(1);
    loadPage(page);
  });
});
