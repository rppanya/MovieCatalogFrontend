import updateMovie from './updateMovie.js'

function LoadPagination(json) {
    $('#movies-page-pagination').empty()
    let paginationItem = $('#movies-page-pagination-item')

    for (let i = 0; i < json['pageInfo']['pageCount']; i++) {

        let newPaginationItem = paginationItem.clone()
        newPaginationItem.removeClass('d-none')

        newPaginationItem.find('.movies-page-pagination-item-link').text(i + 1)
        newPaginationItem.attr('id', `paginationItem${i + 1}`)

        newPaginationItem.on('click', function (e) {
            location.hash = newPaginationItem.text()
            updateMovie(newPaginationItem.text())
            e.preventDefault()
        })

        $('#movies-page-pagination').append(newPaginationItem)
    }

    $(`#paginationItem${json['pageInfo']['currentPage']}`).addClass('active')

    $('.pagination-previous').on('click', function (e) {
        location.hash = 1
        updateMovie(1)
        e.preventDefault()
    })

    $('.pagination-next').on('click', function (e) {
        location.hash = json['pageInfo']['pageCount']
        updateMovie(json['pageInfo']['pageCount'])
        e.preventDefault()
    })
}

export default LoadPagination