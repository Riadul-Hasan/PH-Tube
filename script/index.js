function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((response) => response.json())
    .then((data) => displayCategories(data.categories));
}

function displayCategories(categories) {
  const container = document.getElementById("category-container");

  for (let item of categories) {
    console.log(item);
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
         <button class="btn btn-sm hover:bg-red-500 hover:text-white">${item.category}</button>

    `;
    container.appendChild(categoryDiv);
  }
}
loadCategories();
