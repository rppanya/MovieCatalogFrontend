import editReview from './editReview.js'
import deleteReview from './deleteReview.js'

function LoadReviews(userId, json) {
    let reviewTemplate = $('#review-template')

    for (let review of json['reviews']) {
        let myReview = false
        let block = reviewTemplate.clone()
        block.removeClass('d-none')
        if (!review.isAnonymous) {
            review.author.avatar === null ? block.find('.reviews-user-avatar').attr('src', 'https://asupr.mos.ru/asupr2/images/avatar_2x.png') : block.find('.reviews-user-avatar').attr('src', review.author.avatar)
            block.find('.reviews-user-name').text(review.author.nickName)
        } else {
            block.find('.reviews-user-avatar').attr('src', 'https://asupr.mos.ru/asupr2/images/avatar_2x.png')
            block.find('.reviews-user-name').text('Анонимный пользователь')
        }

        block.find('.reviews-user-rating').text(review.rating)
        block.find('.reviews-user-date').text(review.createDateTime.substr(0, 10).replaceAll('-', '.'))
        block.find('.reviews-user-text').text(review.reviewText)

        if (review.rating >= 5) {
            block.addClass('border-success')
            block.find('.reviews-user-rating').removeClass('bg-secondary')
                .addClass('bg-success')
            block.find('.reviews-user-text').addClass('text-success')
        } else {
            block.addClass('border-danger')
            block.find('.reviews-user-rating').removeClass('bg-secondary')
                .addClass('bg-danger')
            block.find('.reviews-user-text').addClass('text-danger')

        }

        if (userId !== null && review.author !== null) {
            if (userId === review.author.userId) {
                block.find('.reviews-user-name').text(review.author.nickName+' (Мой отзыв)')
                $('#add-reviews').addClass('d-none')
                block.find('.review-buttons').removeClass('d-none')
                myReview = true
            }
        }

        block.find('.edit-review-btn').on('click', function () {
            editReview(review, json.id)
        })

        block.find('.delete-review-btn').on('click', function () {
            deleteReview(review.id)
        })

        if(myReview) {
            $('#reviews-container').prepend(block)
        } else {
            $('#reviews-container').append(block)
        }
    }
}
export default LoadReviews