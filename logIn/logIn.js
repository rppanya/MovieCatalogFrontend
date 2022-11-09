import changeNavbar from '../navbar/changeNavbar.js'
import isValid from '../profile/validationForEditProfile.js'
import URL from '../url.js'

$('#form-log-in').submit(handleFormSubmit)

$(document).ready(function () {
    changeNavbar('logIn')
})

$('.registration-btn').click(function (e) { 
    e.preventDefault()
    location.href = '../registration/index.html'
})

function handleFormSubmit(event) {
    event.preventDefault()
    if (isValidLogIn()) {
        const data = serializeForm()
        sendData(data)
        $('.input-log-in').removeClass('is-invalid')
    }
    
}

const WITHOUT_SPACES_REGEXP = /^\S+$/
function isWithoutSpaces(value) {
    return WITHOUT_SPACES_REGEXP.test(value)
}
function isValidLogIn() {
    let username = $('#userLogin').val()
    if (!isWithoutSpaces(username)) {
        errorLogIn()
        return false
    }
    return true
}

function serializeForm() {
    let username = $('#userLogin').val()
    let password = $('#userPassword').val()
    let data = {
        'username' : username,
        'password' : password
    }
    return data
}

function sendData(data) {
    fetch(`${URL}/api/account/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                errorLogIn()
            } else {
                return response.json()
            }
        })
        .then((json) => {
            localStorage.setItem('token', `${json['token']}`)
            location.href = '../index.html'
        })
}

function errorLogIn() {
    $('.input-log-in').addClass('is-invalid')
    $('.invalid-feedback').text('Неверный логин или пароль')
}
