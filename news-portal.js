const loadCategory = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    try {
        const res = await fetch(url);
        const data = await res.json();
        showCategory(data.data.news_category);
    }
    catch (error) {
        console.log(error);
    }
}


const showCategory = (data) => {

    const categorylist = document.getElementById('category-list');

    data.forEach(element => {
        let list = document.createElement('li');
        list.classList.add('d-inline-block');
        list.style.listStyle = 'none';
        list.style.padding = '5px';

        list.innerHTML = `
        <li onclick="loadNews('${element.category_id}')">${element.category_name}</li>
        
        <style>
            li:visited{
                color:gray;
            }
            li:hover, li:focus, li:active {
                background-color: #937293;
                color: white;
            }
        </style>
        `
        categorylist.appendChild(list);
    });
}


const showloader = document.getElementById('loader');
const showNotFoundMsg = document.getElementById('not-found-msg');


const loadNews = async (data) => {
    showloader.classList.remove('d-none');

    const newsCount = document.getElementById('news-count');

    const url = `https://openapi.programming-hero.com/api/news/category/${data}`;
    try {
        const res = await fetch(url)
        const data = await res.json();
        loadNewsData(data);
        newsCount.innerText = `${data.data.length} News Found.`;
    }
    catch (e) {
        console.log(e);
    }
}

const loadNewsData = (data) => {
    console.log(data.data);
    console.log(data.data.length);

    if(data.data.length === 0){
        showNotFoundMsg.classList.remove('d-none');
        showloader.classList.add('d-none');
    }
    else{
        showNotFoundMsg.classList.add('d-none');
    }

    const newsCard = document.getElementById("news-card");
    newsCard.innerHTML = '';

    data.data.forEach(element => {

        const newsCardDiv = document.createElement('div');

        newsCardDiv.classList.add('card');
        newsCardDiv.classList.add('mb-3');

        newsCardDiv.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${element.image_url}" class="img-fluid rounded-start">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text d-block text-truncate">${element.details}</p>
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
          <small><i class="fa-regular fa-eye">  ${element?.total_view ? element.total_view : ''} M</i></small>
          <button onclick='showDetailNews(${JSON.stringify(element._id)})' class="btn btn-outline-secondary fw-semibold" data-bs-toggle="modal" data-bs-target="#newsDetailModal">READ</button>
        </div>

        `
        newsCard.appendChild(newsCardDiv);
        showloader.classList.add('d-none');
    });
}

const showDetailNews = async (data) => {
    const url = `https://openapi.programming-hero.com/api/news/${data}`
    try{
        const res = await fetch(url);
        const data = await res.json();
        loadModalData(data);
    }
    catch(e){
        console.log(e);
    }

}


const loadModalData = (data) =>{
    console.log(data)
    const modalTitle = document.getElementById('newsDetailModalLabel');
    modalTitle.innerHTML = `
    <h5>${data.data[0].title};</h5>
    <div class="d-flex justify-content-between align-items-center pt-4">
        <div class="d-flex flex-col gap-3">
            <img src="${data.data[0].author.img}" style="height:30px; width:30px;" class="rounded-5">
            <div>
                <h6>${data.data[0].author?.name ? data.data[0].author.name : "Author name not found"}</h6>
                <small class="text-muted">${data.data[0].author?.published_date ? data.data[0].author.published_date : "No date found"}</small>
            </div>
        </div>
        <small class="text-muted">View: ${data.data[0]?.total_view ? data.data[0].total_view : 'No data found'} M</i></small>
    </div> 
    </div> 
    `

    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <p>${data.data[0].details}</p>  
    `
 
    const modalFooter = document.getElementById('modal-footer');
    modalFooter.innerHTML = `
    <h6 class="text-muted">Readers' Opinion: ${data.data[0].rating.badge}</h6>
    <p class="text-muted">Rating: ${data.data[0].rating.number}</p>  
    `
}

loadCategory();