import URL from "../url.js"
function LoadMovies(currentPage) {

    fetch(`${URL}/api/movies/${currentPage}`)
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

            var movieLikes = 0
            for (let likes of movies['reviews']){
                movieLikes += likes.rating
            }
            if (movies['reviews'].length != 0) {
                movieLikes = movieLikes / movies['reviews'].length
            } else {
                movieLikes = 0
            }

            block.find('.movies-likes').text('Средняя оценка - ' + movieLikes.toFixed(1))

            block.on('click', function () {
                //localStorage.setItem('movieId', movies.id)
                location.href = '../movie/index.html#' + movies.id
            })

            block.find('.movies-tags').text(movies.country + ' • ' + movieGenres.substr(0, movieGenres.length-2))
            $('#movies-container').append(block)
        }
    })
    window.scrollTo(0, 0)
}

export default LoadMovies