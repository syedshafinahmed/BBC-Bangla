const categoryContainer = document.getElementById("category-container");

const loadCategory = () => {
    fetch('https://news-api-fs.vercel.app/api/categories')
        .then(res => res.json())
        .then(data => {
            const categories = data.categories
            console.log(data.categories)
            categories.forEach( cat => {
                categoryContainer.innerHTML += `
                <li class="hover:border-b-4 hover:border-red-700 cursor-pointer">${cat.title}</li>`
            })
        })
        .catch(err => {
            console.log(err)
        })
};

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
