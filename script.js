const categoryContainer = document.getElementById("category-container");
const newsContainer = document.getElementById("news-container");
const bookmarkContainer = document.getElementById("bookmark-container");

const loadCategory = () => {
    fetch('https://news-api-fs.vercel.app/api/categories')
        .then(res => res.json())
        .then(data => {
            const categories = data.categories
            // console.log(categories);
            showCategory(categories);
        })
        .catch(err => {
            console.log(err)
        })
};


const showCategory = (categories) => {
    categories.forEach(cat => {
        categoryContainer.innerHTML += `<li id="${cat.id}" class="hover:border-b-4 hover:border-red-700 cursor-pointer">${cat.title}</li>`;
    });
    categoryContainer.addEventListener('click', (e) =>{
        const allLi = document.querySelectorAll("li")
        console.log(allLi);
        allLi.forEach(li => {
            li.classList.remove("border-b-4");
            li.classList.remove("border-red-700");
        })
        if(e.target.localName === 'li'){
            console.log(e.target.id);
            e.target.classList.add("border-b-4")
            e.target.classList.add("border-red-700")
            loadNewsByCategory(e.target.id)
        }
    })
}



const showNewsByCategory = (articles) =>{
    newsContainer.innerHTML = ""
    articles.forEach(article => {
        newsContainer.innerHTML += `
        <div class="border border-gray-300 rounded-lg p-5">
            <div>
                <img src="${article.image.srcset[5].url}"
            </div>
            <h1 class="font-bold text-base md:text-lg">${article.title}</h1>
            <div class="flex justify-between items-center">
                <p class="opacity-80 text-sm md:text-base">${article.time}</p>
                <i id="bl" class="fa-solid fa-bookmark" style="color: #b91c1c;"></i>
            </div>
        </div>`
    })
}



const loadNewsByCategory = (categoryId) =>{
    // console.log(categoryId);
    fetch(`https://news-api-fs.vercel.app/api/categories/${categoryId}`)
    .then(res => res.json())
    .then(data => {
        showNewsByCategory(data.articles)
    })
    .catch(err =>{
        console.log(err);
    })
}

newsContainer.addEventListener("click", (e) =>{
    console.log(bl);
    // if(e.target.image)
})


loadNewsByCategory('main');
// const loadCategoryAsync = async () => {
//     try {
//         const res = await fetch('https://news-api-fs.vercel.app/api/categories');
//         const data = await res.json()
//         console.log(data)
//     } catch (error) {
//         console.log(error);
//     }
// };

// loadCategoryAsync();
loadCategory();
