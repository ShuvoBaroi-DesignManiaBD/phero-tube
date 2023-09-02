
// Call the data
async function loadCategories () {
    let fetchData = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    let getData = await fetchData.json();
    let videoCategories = getData.data;
    handleData(videoCategories);
    loadVideos(videoCategories[0]);
}

// This function will pull the categories from the fetched data
function handleData (categories) {
    let tabs = document.querySelector('.categories');
    tabs.innerHTML = '';
    categories.forEach(category => {
        let categoryName = category.category;
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

// It will fetch the videos by the category ID & will load the videos for the specific category
async function loadVideos (category) {
    let id = category.category_id;
    let fetchVideos = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    let getVideos = await fetchVideos.json();
    let videos = getVideos.data;
    let noVideo = document.querySelector('.noContent');
    noVideo.classList.add('hidden');
    let videosContainer = document.querySelector('.videosContainer');
    videosContainer.innerHTML = '';
    if (videos.length === 0) {
        noVideo.classList.remove('hidden');
    }

    showVideos(videos);
    sortVideos(videos);
}

// It will load the videos data from the loadvideos() function and will show the videos into the page.
function showVideos (videos) {
    let videosContainer = document.querySelector('.videosContainer');
    videosContainer.innerHTML = '';
    videos.forEach(video => {
        let postedDate = calculatePostedDate(video);
        let div = document.createElement('div');
        div.classList.add('video', 'max-w-sm', 'relative');
        div.innerHTML = ` <img class="rounded-lg w-full h-[220px] md:h-[160px] lg:h-[220px] relative" src="${video.thumbnail}" alt="thumbnail" />
        <p class="text text-[10px] text-white right-3 -mt-[40px] bg-gray-900 p-2 z-10 absolute rounded-[4px] ${(postedDate === undefined) ? 'hidden' : 'block'}">${postedDate} ago</p>
        <div class="py-5 cardContent flex items-top gap-3">
            <img src="${video.authors[0].profile_picture}" alt="avatar"
                class="avatar rounded-full h-[60px] w-[60px] object-cover">
            <div class="avatarContent space-y-1">
                <h4 class="secon primaryHeading">${video.title}</h4>
                <div class="author flex items-center justify-start gap-2">
                    <p class="text">${video.authors[0].profile_name}</p> <img src="./images/verified.png" alt="verified
                        class="block ${video.authors[0].verified?'hidden':'block'} width="16px">
                </div>
                <p class="text">${video.others.views? video.others.views: 'No'} views</p>
            </div>`
        videosContainer.appendChild(div);
    })
}

// It will calculate the posted date of the each video & will convert the seconds to standard format. Then will send the data to the showVideos() function
function calculatePostedDate (video) {
    let seconds = video.others.posted_date;
    if (seconds !== '' && seconds > 0) {
        let days = `${Math.floor(seconds / (60 * 60 * 24))} days`;
        seconds %= 3600 * 24;
        let hours = `${Math.floor(seconds / 3600)} hrs`;
        seconds %= 3600;
        const minutes = `${Math.floor(seconds / 60)} min`;

        if (parseFloat(days) === 0) {
            return `${hours} ${minutes}`;
        } else if (parseFloat(hours) === 0) {
            return `${days} ${minutes}`;
        } else if (parseFloat(minutes) === 0) {
            return `${days} ${hours}`;
        } else if (parseFloat(days) === 0 && parseFloat(hours) === 0) {
            return minutes;
        } else if (parseFloat(hours) === 0 && parseFloat(minutes) === 0) {
            return null;
        } else if (parseFloat(days) === 0 && parseFloat(minutes) === 0) {
            return hours;
        }
    }
}

// It will sort the videos by the number of views
function sortVideos (videos) {
    let sortButton = document.querySelector(".sort");
    sortButton.addEventListener("click", () => {
        let sortedVideos = videos.sort((a, b) => parseFloat(b.others.views) - parseFloat(a.others.views));
        showVideos(sortedVideos);
    })

}

loadCategories();


// It will show blog page content once the 'blog' button is clicked.
document.getElementById('blogButton').addEventListener('click', () => {
    let newEndpoint = '/blog.html'; // Replace with the desired endpoint
    history.pushState(null, '', newEndpoint);

    let fetchData = async () => {
        let fetchData = await fetch('./blog.html');
        let data = await fetchData.text();
        document.querySelector("script[src='./script.js']")?.remove();
        document.querySelector("script[src='./blog.js']")?.remove();
        let script = document.createElement('script');
        script.src = './blog.js';
        document.head.appendChild(script);
        let div = document.createElement('div');
        div.innerHTML = data;
        let blogMain = div.querySelector('main');
        let homeMain = document.querySelector('main');
        homeMain.replaceWith(blogMain);
    };

    fetchData();
});