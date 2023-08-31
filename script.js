// Call the data
let loadCategories = async () => {
    let fetchData = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    let getData = await fetchData.json();
    let videoCategories = getData.data;
    // console.log(getData);
    // console.log(videoCategories);
    handleData(videoCategories);
}

let handleData = (categories) => {
    let tabs = document.querySelector('.categories');
    categories.forEach(category => {
        let categoryName = category.category;
        // console.log(category);
        const button = document.createElement('button');
        button.innerHTML = `${categoryName}`;
        button.classList.add('btnGraySmall');
        (categoryName === 'All') ? button.classList.add('btnRedSmall'): button.classList.add('btnGraySmall');
        tabs.appendChild(button);
        button.addEventListener('click', (e) => {
            const currentElement = e.target;
            currentElement.parentNode.childNodes.forEach(element => {
                element.classList.remove('btnRedSmall');
                e.target.classList.add('btnRedSmall');
            })
        });
        loadVideos(categoryName, category.category_id);
    })
}

let loadVideos = async (category, id) => {
    console.log(category, id);
        let fetchVideos = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
        let videos = await fetchVideos.json();
        console.log(videos);
}

loadCategories();