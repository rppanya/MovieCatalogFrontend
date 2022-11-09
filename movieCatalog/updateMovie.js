import LoadMovies from './LoadMovies.js'

function updateMovie(pageNumber) {
    $('#movies-page-pagination').children().removeClass('active')
    $(`#paginationItem${pageNumber}`).addClass('active')

    LoadMovies(pageNumber)
}

export default updateMovie