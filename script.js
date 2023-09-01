// Call the data
let loadCategories = async () => {
    let fetchData = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    let getData = await fetchData.json();
    let videoCategories = getData.data;
    // console.log(getData);
    handleData(videoCategories);
    loadVideos(videoCategories[0]);
}

let handleData = (categories) => {
    console.log(categories[3]);
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
                loadVideos(category);
            })
        });
    })
}

let loadVideos = async (category) => {
    let id = category.category_id;
    let fetchVideos = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    let getVideos = await fetchVideos.json();
    let videos = getVideos.data;
    let noVideo = document.querySelector('.noContent');
    noVideo.classList.add('hidden');
    // console.log(videos);
    let videosContainer = document.querySelector('.videosContainer');
    videosContainer.innerHTML = '';
    if (videos.length === 0) {
    noVideo.classList.remove('hidden');
    }

    showVideos(videos);
    sortVideos(videos);
}

let showVideos = videos => {
    let videosContainer = document.querySelector('.videosContainer');
    videosContainer.innerHTML = '';
    videos.forEach(video => {
        let div = document.createElement('div');
        div.classList.add('video', 'max-w-sm');
        div.innerHTML = ` <img class="rounded-lg w-full h-[220px]" src="${video.thumbnail}" alt="thumbnail" />
        <div class="py-5 cardContent flex gap-3">
            <img src="${video.authors[0].profile_picture}" alt="avatar"
                class="avatar rounded-full h-[50px] w-[50px] cover">
            <div class="avatarContent">
                <h4 class="mb-2 secon primaryHeading">${video.title}</h4>
                <div class="author flex items-center justify-start gap-2">
                    <p class="text">${video.authors[0].profile_name}</p> <img src="./images/verified.png" alt="verified
                        class="block w-4 ${video.authors[0].verified?'hidden':'block'}>
                </div>
                <p class="text mt-2">${video.others.views? video.others.views: 'No'} views</p>
            </div>`
        videosContainer.appendChild(div);
        console.log(parseFloat(video.others.views));
    })
}

let sortVideos = videos => {
    let sortButton = document.querySelector(".sort");
    sortButton.addEventListener("click", () =>{
        let sortedVideos = videos.sort((a , b) => parseFloat(b.others.views) - parseFloat(a.others.views));
        console.log(sortedVideos);
        showVideos(sortedVideos);
    })
    
}


loadCategories();