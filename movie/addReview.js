import URL from '../url.js'

$('.save-review-button').click(function () {
    let data = serializeData()
    //saveReview(data, localStorage.getItem('movieId'))
    saveReview(data, location.hash.substring(1))
})

function serializeData() {
    let reviewText = $('#reviews-text').val()
    let reviewRating = $('#review-rating').val()
    let reviewIsAnonim = $('#review-is-anonim').is(":checked")
    let userId, nickName, avatar

    fetch(`${URL}/api/account/profile`, {
        headers: new Headers({
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
    })
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            userId = json['id']
            nickName = json['nickName']
            avatar = json['avatarLink']
        })

    
    let data = {
        'reviewText': reviewText,
        'rating': parseInt(reviewRating),
        'isAnonymous': reviewIsAnonim,
        'createDateTime': Date.now(),
        'author': {
            'userId': userId,
            'nickName': nickName,
            'avatar': avatar
        }
    }
    return data
}

function saveReview(data, id) {
    fetch(`${URL}/api/movie/${id}/review/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if(response.ok) {
                location.reload()
            } else {
                $('.invalid-feedback-review').removeClass('d-none')
                $('.invalid-feedback-review').text('Напишите отзыв и поставьте оценку фильму')
            }
        })
}