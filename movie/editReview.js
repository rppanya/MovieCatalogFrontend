import URL from '../url.js'

function editReview(json, movieId) {
    $('#add-reviews').removeClass('d-none')
    $('#reviews-text').val(json['reviewText'])
    $('#review-rating').val(json['rating'])
    $('#review-is-anonim').val(json['isAnonymous'])

    const el = document.getElementById('add-reviews')
    el.scrollIntoView()
    $('#add-reviews').find('.header-of-add-review').text('Редактировать отзыв')
    $('#add-reviews').find('.save-changed-review-button').removeClass('d-none')
    $('#add-reviews').find('.save-review-button').addClass('d-none')

    $('#edit-review-btn').text('Сохранить')
    $('#edit-review-btn').removeClass('btn-warning')
    $('#edit-review-btn').addClass('btn-outline-warning')

    $('.save-changed-review-button').click(function (e) {
        e.preventDefault()

        let data = {
            'reviewText': $('#reviews-text').val(),
            'rating': parseInt($('#review-rating').val()),
            'isAnonymous': $('#review-is-anonim').val() === '0' ? true : false
        }

        fetch(`${URL}/api/movie/${movieId}/review/${json.id}/edit`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                if(response.ok) {
                    $('#edit-review-btn').text('Редактировать')
                    $('#edit-review-btn').removeClass('btn-outline-warning')
                    $('#edit-review-btn').addClass('btn-warning')
                    $('#add-reviews').addClass('d-none')
                    location.reload()
                } else {
                    $('.invalid-feedback-review').removeClass('d-none')
                    $('.invalid-feedback-review').text('Напишите отзыв и поставьте оценку фильму')
                }
            })

    })
}

export default editReview