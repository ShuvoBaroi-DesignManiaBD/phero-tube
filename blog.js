// It will load the blog page content and will fetch the index.html file.
async function loadBlogPage () {
  let fetchData = await fetch('./index.html');
  let data = await fetchData.text();
  loadHeader(data);
  callHomePage(data);
}

// It will load the header to the page from the index.html file
function loadHeader (html) {
  const existingHeader = document.querySelector('header');
  if (existingHeader) {
    existingHeader.remove();
  }

  const div = document.createElement('div');
  div.innerHTML = html;

  const newHeader = div.querySelector('header');

  if (newHeader) {
    const body = document.querySelector('body');
    body.insertBefore(newHeader, body.firstChild);
  }

  const sortElement = document.querySelector('.sort');
  if (sortElement) {
    sortElement.remove();
  }
}

// It will call & show the home page if the logo is clicked
function callHomePage (html) {
  let tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  let header = tempDiv.querySelector('header');
  let mainElement = tempDiv.querySelector('main');
  document.querySelector('.logo').addEventListener('click', () => {
    history.pushState(null, '', 'index.html');
    let oldMain = document.querySelector('main');

    document.querySelector('header').innerHTML = header.innerHTML;
    oldMain.replaceWith(mainElement);

    document.querySelector("script[src='./script.js']") ?.remove();
    document.querySelector("script[src='./blog.js']") ?.remove();
    
    let script = document.createElement('script');
    script.src = './script.js';
    document.head.appendChild(script);
  });
};

loadBlogPage();