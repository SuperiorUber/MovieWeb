const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

//get movies JSON -> Javascript 
getmovies(API_URL)

async function getmovies(url){
    const res = await fetch(url)
    const data = await res.json()

    showmovies(data.results)
}

function showmovies(movie){
    main.innerHTML = ''

    movie.forEach((movie) => {

        const title = movie.title
        const poster_path = movie.poster_path
        const vote_average = movie.vote_average
        const overview = movie.overview

        const movieElement = document.createElement('div')
        movieElement.classList.add('movie')

        movieElement.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="">
        <div class="movie-info">
            <h3>${title}</h3>
            <span>${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>
        `

        main.appendChild(movieElement)
    });
}

form.addEventListener("submit", (e) =>{
    e.preventDefault()
    const search_text = search.value
    if(search_text && search_text !== ' '){
        getmovies(SEARCH_API + search_text)
        search.value = ""
    }
    else{
        window.location.reload();
    }
})