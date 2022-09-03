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
        list.style.padding = '15px';

        list.innerHTML = `
        <li class="border border-1 border-secondary border-end-0 border-start-0 border-top-0"><a onclick="loadNews('${element.category_id}')">${element.category_name}</a></li>
        
        <style>
            li:hover{
                color: white;
                background-color: #937293;
                border-radius:10px;
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
        newsCount.innerText = `${data.data.length} Items Found.`;
    }
    catch (e) {
        console.log(e);
    }
}


const loadNewsData = (data) => {
    
    data.data.sort((a,b) =>{
        return b.total_view - a.total_view;
        });


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
        newsCardDiv.classList.add('mb-4');
        // newsCardDiv.style.maxWidth = ('460px');

        newsCardDiv.innerHTML = `
       
        <style>
        .fa-solid, .fa-eye{
            color: #7c177c;
        }
        </style>


        <div class="row g-0">
            <div class="col-md-4 col-12">
                <img src="${element.image_url}" class="img-fluid rounded-start">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h3 class="card-title">${element.title}</h3>
                    <p class="card-text d-block">${element.details.slice(0,200)+'...'}</p>
                </div>
            </div>
        </div>
        <div class="card-footer d-flex justify-content-between align-items-center pt-4 flex-lg-row flex-md-row flex-sm-column flex-column gap-3">

        <div class="d-flex justify-content-between align-items-center gap-5">

            <div class="d-flex align-items-center flex-col gap-3 pe-lg-5 pe-md-5 me-lg-5 me-md-5">
                <img src="${element.author.img}" style="height:30px; width:30px;" class="rounded-5">
                <div>
                    <h6 style="color:#7c177c;">${element.author?.name ? element.author.name : "Author name not found"}</h6>
                    <small class="text-muted">${element.author?.published_date ? element.author.published_date : "No Date Found"}</small>
                </div>
            </div>
         

            <div class="d-flex flex-lg-row flex-md-column flex-sm-column flex-column gap-lg-5 gap-md-2 gap-sm-2 gap-2">
            
                <small class="pe-lg-5 pe-md-5 me-lg-5 me-md-5">
                    <i class="fa-regular fa-eye">  <span style="color:black;">${element?.total_view ? element.total_view+' M' : ' Not found'}</span></i>
                </small>
          
                <span clas="d-flex flex-row ps-lg-5 ps-md-5 ms-lg-5 ms-md-5">
                    <small>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star-half-stroke"></i>
                        </small>
                    </span>
            </div>
        </div>

          
            <button onclick='showDetailNews(${JSON.stringify(element._id)})' class="btn btn-outline-secondary rounded-5 fw-semibold" data-bs-toggle="modal" data-bs-target="#newsDetailModal">READ</button>
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
    const modalTitle = document.getElementById('newsDetailModalLabel');
    modalTitle.innerHTML = `
    <h5>HEADING: <span style="color:#7c177c;">${data.data[0].title};</span></h5>
    <div class="d-flex justify-content-between align-items-center pt-4">
        <div class="d-flex align-items-center flex-col gap-3">
            <img src="${data.data[0].author.img}" style="height:30px; width:30px;" class="rounded-5">
            <div>
                <h6 class="text-muted">${data.data[0].author?.name ? data.data[0].author.name : "Author name not found"}</h6>
                <small class="text-muted">${data.data[0].author?.published_date ? data.data[0].author.published_date : "No date found"}</small>
            </div>
        </div>
        <small class="text-muted">View: ${data.data[0]?.total_view ? data.data[0].total_view+' M' : 'No data found'}</i></small>
    </div> 
    </div> 
    `

    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <img src="${data.data[0].image_url}" class="img-fluid mb-4">
    <p>${data.data[0].details}</p>  
    `
 
    const modalFooter = document.getElementById('modal-footer');
    modalFooter.innerHTML = `
    <h6 class="text-muted">Readers' Opinion: ${data.data[0].rating.badge}</h6>
    <p class="text-muted">Rating: ${data.data[0].rating.number}</p>  
    `
}

loadCategory();
loadNews('01');