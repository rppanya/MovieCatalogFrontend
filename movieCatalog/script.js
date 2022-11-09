import changeNavbar from '../navbar/changeNavbar.js'
import LoadMovies from './LoadMovies.js'
import LoadPagination from './loadPagination.js'
import URL from '../url.js'

$(window).on('hashchange', function() {
    loadCatalog()
})

$(document).ready(function () {
    loadCatalog()
})

function loadCatalog() {
    changeNavbar('movies')
    if (location.hash == '') {
        location.hash = 1
    }
    fetch(`${URL}/api/movies/${location.hash.substr(1)}`)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        LoadPagination(json)
        LoadMovies(location.hash.substr(1))
    })
}


