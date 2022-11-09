import changeNavbar from '../navbar/changeNavbar.js'
import URL from '../url.js'

$(document).ready(function () {
    fetch(`${URL}/api/account/profile`, {
        headers: new Headers ({
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
    })
    .then((response) => {
        if (response.ok) {
            changeNavbar('favorites')
            LoadMovies()
        }
        else {
            localStorage.removeItem('token')
            location.href='../logIn/index.html'
        }
    })
})

function LoadMovies() {
    fetch(`${URL}/api/favorites`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        $('#movies-container').empty()

        let template = $('#card-template')
    
        for(let movies of json['movies']){

            let block = template.clone()
            block.removeClass('d-none')
            block.attr('id', 'movies-' + movies.id)
            block.find('.movies-poster').attr('src', movies.poster)
            block.find('.movies-name').text(movies.name)
            block.find('.movies-year').text(movies.year)

            let movieGenres = ''
            for (let genres of movies['genres']){
                movieGenres += genres.name + ', '
            }

            let movieLikes = 0
            for (let likes of movies['reviews']){
                movieLikes += likes.rating
            }
            if (movies['reviews'].length != 0) {
                movieLikes = movieLikes / movies['reviews'].length
            } else {
                movieLikes = 0
            }

            block.find('.movies-rating').text('Средняя оценка - ' + movieLikes.toFixed(1))

            block.find('.movies-name').on('click', function () {
                // localStorage.setItem('movieId', movies.id)
                location.href = '../movie/index.html#' + movies.id
            })

            block.find('.movies-country-tags').text(movies.country + ' • ' + movieGenres.substr(0, movieGenres.length-2))

            block.find('.delete-button').click(() => {
                removeFromFavorites(movies.id)
            })
            $('#movies-container').append(block)
        }
    })
}

function removeFromFavorites(id) {
    fetch(`${URL}/api/favorites/${id}/delete`, {
    method: 'DELETE',    
    headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
    .then(() => {
        $(`#movies-${id}`).remove()
    })
    
}