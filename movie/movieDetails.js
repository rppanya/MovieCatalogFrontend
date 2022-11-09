import changeNavbar from '../navbar/changeNavbar.js'
import { checkInFavorites } from '../favorites/changeFavorites.js'
import { AddToFavorite } from '../favorites/changeFavorites.js'
import { RemoveFromFavorite } from '../favorites/changeFavorites.js'
import LoadReviews from './loadReviews.js'
import URL from '../url.js'


$(document).ready(function () {
    changeNavbar('movies')
    // checkInFavorites(localStorage.getItem('movieId'))
    // LoadMovieDetails(localStorage.getItem('movieId'))
    LoadMovieDetails(location.hash.substr(1))
    checkInFavorites(location.hash.substr(1))
})

function LoadMovieDetails(id) {
    fetch(`${URL}/api/movies/details/${id}`)
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            $('#reviews-container').empty()

            let movieCard = $('#movies-card-template')
            let block = movieCard.clone()
            block.removeClass('d-none')
            block.find('.movies-poster').attr('src', json.poster)
            block.find('.movies-name-year').text(json.name + '(' + json.year + ')')
            block.find('.movies-description').text(json.description)
            block.find('.movies-production-year').text(json.year)
            block.find('.movies-country').text(json.country)
            block.find('.movies-time').text(json.time)
            block.find('.movies-tagline').text(json.tagline)
            block.find('.movies-director').text(json.director)
            block.find('.movies-budget').text(json.budget)
            block.find('.movies-world-fees').text(json.fees)
            block.find('.movies-age').text(json.ageLimit + '+')

            let movieGenres = ''
            for (let genre of json['genres']) {
                movieGenres += genre.name + ', '
            }

            block.find('.add-to-favorites-button').on('click', function () {
                AddToFavorite(json.id)
            })

            block.find('.remove-from-favorites-button').on('click', function () {
                RemoveFromFavorite(json.id)
            })

            block.find('.movies-genre').text(movieGenres.substr(0, movieGenres.length - 2))
            $('#movies-card-template').replaceWith(block)

            $('#reviews-container').empty()
            
            profileId(json)
        })
}

function profileId(json) {
    fetch(`${URL}/api/account/profile`, {
        headers: new Headers({
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
    })
        .then((response) => {
            return response.json()
        })
        .then((userJson) => {
            LoadReviews(userJson.id, json)
        })
        .catch(() => {
            LoadReviews(null, json)
        })
}

