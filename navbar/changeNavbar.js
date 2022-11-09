import URL from '../url.js'

function changeNavbar(activePage) {
    $('#navbar-movies').load('../navbar/navbar.html');
    fetch(`${URL}/api/account/profile`, {
        headers: new Headers({
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
    })
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
        })
        .then((json) => {
            $('.unauthorize-section').addClass('d-none')
            $('.authorize-section').removeClass('d-none')
            $('.nick-name a').text(`${json['nickName']}`);
            $(`#${activePage}`).addClass('active')
        })
        .catch(() => {
            localStorage.removeItem('token')
                $('.authorize-section').addClass('d-none')
                $('.unauthorize-section').removeClass('d-none')
                $(`#${activePage}`).addClass('active')
        })
}

export default changeNavbar;