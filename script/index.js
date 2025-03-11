function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((response) => response.json())
    .then((data) => displayCategories(data.categories));
}

function displayCategories(categories) {
  const container = document.getElementById("category-container");

  for (let item of categories) {
    // console.log(item);
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
         <button class="btn btn-sm hover:bg-red-500 hover:text-white">${item.category}</button>

    `;
    container.appendChild(categoryDiv);
  }
}

// load videos
function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then((data) => displayVideos(data.videos));
}

const displayVideos = (videos) => {
  //   console.log(videos);
  const videoContainer = document.getElementById("video-container");
  videos.forEach((video) => {
    // console.log(video);
    const videoDiv = document.createElement("div");
    videoDiv.innerHTML = `


<div class="card bg-base-100  shadow-sm">
                    <figure class="relative">
                        <img class="w-full h-[250px] object-cover" src="${video.thumbnail}" alt="Shoes" />
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
                                            src="${video.authors[0].profile_picture}" />
                                    </div>
                                </div>
                            </div>

                            <div class="intro">
                                <h2 class="text-lg font-semibold">Building a Winning UX Strategy Using the Kano Model
                                </h2>



                            </div>

                        </div>


                        <div class="ml-12 flex items-center relative">
                            <p class="font-semibold text-gray-500">${video.authors[0].profile_name}</p>
                            <div class="absolute left-24"><img class="w-8"
                                    src="https://img.icons8.com/?size=48&id=FNbnqlDTjR45&format=gif" alt=""></div>


                        </div>
                        <p class="ml-12 text-gray-500 font-semibold">${video.others.views}</p>
                    </div>
                </div>

    `;
    videoContainer.append(videoDiv);
  });
};

loadCategories();
loadVideos();
