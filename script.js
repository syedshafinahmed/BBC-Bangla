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

// const bookmarked = (article) =>{

// }


const bookmarked = (article) => {
    const div = document.createElement("div");
    div.classList.add("flex", "justify-between", "items-center", "px-3", "py-5", "border-b", "border-b-red-700", "gap-x-5");

    div.innerHTML = `
        <h1 class="text-xs md:text-sm">${article.title}</h1>
        <i class="fa-solid fa-trash cursor-pointer h-full object-cover" style="color: #B91C1C"></i>
    `;
    div.querySelector("i").addEventListener("click", ()=>{
        div.remove();
    })
    bookmarkContainer.appendChild(div);
};

const modal = (article) => {
    const modalBox = document.getElementById("show-modal");
    const modalEl = document.getElementById("my_modal_2");

    modalBox.innerHTML = `
        <div class="border border-gray-300 rounded-lg p-5">
            <img class="w-full object-cover" src="${article.image.srcset[5].url}" />
            <h1 class="font-bold text-base md:text-lg mt-3">${article.title}</h1>
            <p class="opacity-80 text-sm md:text-base">${article.time}</p>
        </div>
    `;
    modalEl.showModal();
};




const showNewsByCategory = (articles) =>{
    newsContainer.innerHTML = ""
    articles.forEach(article => {
        newsContainer.innerHTML += `
        <div class="border border-gray-300 rounded-lg">
            <div>
                <img class="w-full h-60 object-cover rounded-tl-lg rounded-tr-lg" src="${article.image.srcset[5].url}"
            </div>
            <div class="p-5">
                <h1 onclick='modal(${JSON.stringify(article)})' class="font-bold text-base md:text-lg">${article.title}</h1>
                <div class="flex justify-between items-center pt-5">
                    <p class="opacity-80 text-sm md:text-base">${article.time}</p>
                    <i onclick='bookmarked(${JSON.stringify(article)})' class="fa-solid fa-bookmark" style="color: #B91C1C;"></i>
                </div>
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
