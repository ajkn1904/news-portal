const loadCategory = async() =>{
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    try{
        const res = await fetch(url);
        const data = await res.json();
        showCategory(data.data.news_category);
    }
    catch(error){
        console.log(error);
    }
}

const showCategory = (data) =>{
    console.log(data);
    const categorylist = document.getElementById('category-list');
    data.forEach(element => {        
        let list = document.createElement('li');
        list.classList.add('d-inline-block');
        list.style.listStyle = 'none';

        list.innerHTML = `
        <li><a onclick="loadNews('${element.category_id}')">${element.category_name}</a></li>
        `
        categorylist.appendChild(list);
    });
}

const loadNews = async (data) => {

    const newsCount = document.getElementById ('news-count');

    const url = `https://openapi.programming-hero.com/api/news/category/${data}`;
    try{
        const res = await fetch(url)
        const data = await res.json();
        console.log(data);
        newsCount.innerText = `${data.data.length} items found.`;
    }
    catch(e){
        console.log(e);
    }
}

loadCategory();