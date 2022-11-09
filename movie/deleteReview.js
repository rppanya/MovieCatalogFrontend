import URL from '../url.js'

function deleteReview(id) {
    $('#add-reviews').removeClass('d-none')
    // fetch(`${URL}/api/movie/${localStorage.getItem('movieId')}/review/${id}/delete`, {
    fetch(`${URL}/api/movie/${location.hash.substring(1)}/review/${id}/delete`, {

        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
        .then(() => {
            location.reload()
        })
}

export default deleteReview