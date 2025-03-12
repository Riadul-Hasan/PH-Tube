function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((response) => response.json())
    .then((data) => displayCategories(data.categories));
}
// remove activeclass
function removeActiveClass() {
  const activeButtons = document.getElementsByClassName("active");
  for (let btn of activeButtons) {
    btn.classList.remove("active");
  }
}

// Load category videos onlclick
const loadCategoryVideos = (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const clickedButton = document.getElementById(`${id}`);
      clickedButton.classList.add("active");
      console.log(clickedButton);

      displayVideos(data.category);
    });
};

// display categories

function displayCategories(categories) {
  const container = document.getElementById("category-container");

  for (let item of categories) {
    // console.log(item);
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
         <button id="${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn btn-sm hover:bg-red-500 hover:text-white">${item.category}</button>

    `;
    container.appendChild(categoryDiv);
  }
}

// Load video details
const loadVedioDetails = (videoId) => {
  console.log(videoId);
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayVideoDetails(data.video));
};

// display details
const displayVideoDetails = (videoObject) => {
  console.log(videoObject);
  document.getElementById("videoDetailsModal").showModal();
  const detailsContainer = document.getElementById("detailsContainer");
  detailsContainer.innerHTML = `
      <div class="card bg-base-100 image-full  shadow-sm">
  <figure>
    <img
      src="${videoObject.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${videoObject.title}</h2>
    <p>${videoObject.authors[0].profile_name}</p>
    
    <div class="card-actions justify-end">
     
    </div>
  </div>
</div>
  
  `;
};
// load videos
function loadVideos(inputText = "") {
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${inputText}`
  )
    .then((response) => response.json())
    .then((data) => {
      removeActiveClass();
      document.getElementById("btn-all").classList.add("active");

      displayVideos(data.videos);
    });
}

const displayVideos = (videos) => {
  //   console.log(videos);
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";
  if (videos.length == 0) {
    videoContainer.innerHTML = `
        
                <div class="col-span-4 flex flex-col justify-center items-center space-y-2">
                    <img src="assest/Icon.png" alt="">
                    <h1 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h1>

                </div>
    `;
    return;
  }
  videos.forEach((video) => {
    // console.log(video);
    const videoDiv = document.createElement("div");
    videoDiv.innerHTML = `


<div class="card bg-base-100  shadow-sm">
                    <figure class="relative">
                        <img class="w-full h-[250px] object-cover" src="${
                          video.thumbnail
                        }" alt="Shoes" />
                        <span class="absolute bg-black text-white p-2 rounded-md text-sm bottom-2 right-2">3hrs 56 min
                            ago</span>

                    </figure>
                    <!-- Card Body -->
                    <div class="card-body px-0">
                        <div class="flex gap-3 items-center">
                            <div class="avatar">
                                <div class="avatar">
                                    <div class="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                                        <img
                                            src="${
                                              video.authors[0].profile_picture
                                            }" />
                                    </div>
                                </div>
                            </div>

                            <div class="intro">
                                <h2 class="text-lg font-semibold">${video.title}
                                </h2>



                            </div>

                        </div>


                        <div class="ml-12 flex items-center relative">
                            <p class="font-semibold text-gray-500">${
                              video.authors[0].profile_name
                            }
                                        ${
                                          video.authors[0].verified == true
                                            ? `  <div class="absolute left-24"><img class="w-8"
                                    src="https://img.icons8.com/?size=48&id=FNbnqlDTjR45&format=gif" alt=""></div>
                        </div>`
                                            : ``
                                        }</p>

                        <p class="ml-12 text-gray-500 font-semibold">${
                          video.others.views
                        }</p>
                    </div>
                    <button onclick=loadVedioDetails("${
                      video.video_id
                    }") class="btn btn-block">Show Details</button>
                </div>

    `;
    videoContainer.append(videoDiv);
  });
};

// Search Input Track
document.getElementById("search-input").addEventListener("keyup", (event) => {
  const searchInput = event.target.value;
  // console.log(searchInput);
  loadVideos(searchInput);
});
loadCategories();
