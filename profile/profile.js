import changeNavbar from '../navbar/changeNavbar.js'
import LoadDetails from './loadProfileDetails.js'
import isValid from './validationForEditProfile.js'
import URL from '../url.js'

$(document).ready(function () {

    fetch(`${URL}/api/account/profile`, {
        headers: new Headers({
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
    })
        .then((response) => {
            if (response.ok) {
                changeNavbar('myProfile')
                LoadDetails()
            }
            else {
                localStorage.removeItem('token')
                location.href = '../logIn/index.html'
            }
        })
})

$('.edit-profile-btn').click(function (e) {
    e.preventDefault()
    $('.edit-profile-btn').removeClass('is-invalid')
    if ($(this).text() === 'Редактировать') {

        $(this).removeClass('btn-warning')
        $(this).addClass('btn-outline-warning')

        $(this).text('Сохранить')

        $('.profile-input').removeAttr('disabled')

    } else {
        if (isValid()) {
            const data = serializeForm()
            sendData(data)
            $('.profile-input').attr('disabled', 'disabled')
            $(this).addClass('btn-warning')
            $(this).removeClass('btn-outline-warning')
            $(this).text('Редактировать')
        }
    }
})


function serializeForm() {
    let id = $('.form-edit-profile').attr('id').toString()
    let nickName = $('.user-nickname').text()
    let nameFIO = $('.user-name').val()
    let email = $('.user-email').val()
    let avatarLink = $('.user-avatar-link').val()
    let birthDate = $('.user-birth-date').val()

    let gender = $('.user-gender').val()

    let data = {
        'nickName': nickName,
        'name': nameFIO,
        'email': email,
        'id': id,
    }

    if (birthDate !== '') {
        data.birthDate = birthDate + 'T00:00:00.000Z'
    }

    if (avatarLink !== '') {
        data.avatarLink = avatarLink
    }

    if (gender !== '') {
        data.gender = parseInt(gender)
    }

    return data
}

function sendData(data) {
    fetch(`${URL}/api/account/profile`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (response.ok) {
                $('.edit-profile-btn').removeClass('is-invalid')
                return response
            } else {
                $('.edit-profile-btn').toggleClass('is-invalid', true)
                $('.edit-profile-btn+.invalid-feedback').text('Ошибка! Возможно этот email уже зарегистрирован.')
            }
        })
        .then(() => {
            LoadDetails()
        })
}
