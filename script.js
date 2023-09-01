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
    let fetchVideos = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    let getVideos = await fetchVideos.json();
    let videos = getVideos.data;
    let videosContainer = document.querySelector('.videosContainer');
    videos.forEach(video =>{
        let div = document.createElement('div');
        div.classList.add('video', 'max-w-sm');
        div.innerHTML = ` <img class="rounded-lg w-full h-[220px]" src="${video.thumbnail}" alt="thumbnail" />
        <div class="py-5 cardContent flex gap-3">
            <img src="${video.authors[0].profile_picture}" alt="avatar"
                class="avatar rounded-full h-[60px] w-[60px]">
            <div class="avatarContent">
                <h4 class="mb-2 secon primaryHeading">${video.title}</h4>
                <div class="author flex items-center justify-start gap-2">
                    <p class="text">${video.authors[0].profile_name}</p><img src="./images/verified.png" alt="verified"
                        class="w-5">
                </div>
                <p class="text mt-2">99K views</p>
            </div>`
            videosContainer.appendChild(div);
    })

}

loadCategories();