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
    //console.log(data);
    const categorylist = document.getElementById('category-list');
    
    data.forEach(element => {        
        let list = document.createElement('li');
        list.classList.add('d-inline-block');
        list.style.listStyle = 'none';
        list.style.padding = '5px';

        list.innerHTML = `
        <li><a onclick="loadNews('${element.category_id}')">${element.category_name}</a></li>
        
        <style>
            li:hover, li:focus, li:active {
                background-color: #937293;
                color: white;
            }
        </style>
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
        loadNewsData(data);
        newsCount.innerText = `${data.data.length} items found.`; 
    }
    catch(e){
        console.log(e);
    }
}

const loadNewsData = (data) => {
    console.log(data.data)
    
    const newsCard = document.getElementById("news-card");
    newsCard.innerHTML = '';

    data.data.forEach(element =>{
        
        const newsCardDiv = document.createElement('div');

        newsCardDiv.classList.add('card');
        newsCardDiv.classList.add('mb-3');
        // newsCardDiv.style.maxWidth = '100%';

        newsCardDiv.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${element.image_url}" class="img-fluid rounded-start">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text d-block text-truncate">${element.details}</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
        </div>
        <div class="card-footer d-flex justify-content-between align-items-center pt-4">
          <div class="d-flex flex-col gap-3">
            <img src="${element.author.img}" style="height:50px; width:50px;" class="rounded-5">
            <div>
                <h5>${element.author?.name ? element.author.name : "Author name not found"}</h5>
                <small class="text-muted">${element.author?.published_date ? element.author.published_date : "No Date Found"}</small>
            </div>
          </div>
          <small><i class="fa-regular fa-eye">  ${element?.total_view ? element.total_view : ""} M</i></small>
          <button class="btn btn-outline-secondary fw-semibold">READ</button>
        </div>

        `
        newsCard.appendChild(newsCardDiv);
    });
}

loadCategory();