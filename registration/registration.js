import changeNavbar from '../navbar/changeNavbar.js'
import isValid from './validationForRegistration.js'
import URL from '../url.js'

$(document).ready(function () {
    changeNavbar('registration')
})

$('#form-registration').submit(handleFormSubmit)

function handleFormSubmit(event) {
    event.preventDefault()
    if (isValid()) {
        const data = serializeForm()
        sendData(data)
    }
}

function serializeForm() {
    let userName = $('#userLogin').val()
    let nameFIO = $('#userName').val()
    let password = $('#userPassword1').val()
    let email = $('#userEmail').val()
    let birthDate = $('#userBirthDate').val()
    let gender = $('#userGender').val()

    let data = {
        'userName': userName,
        'name': nameFIO,
        'password': password,
        'email': email
    }
    if (birthDate !== '') {
        data.birthDate = birthDate + 'T00:00:00.000Z'
    }
    if (gender !== '') {
        data.gender = parseInt(gender)
    }

    return data
}

function sendData(data) {
    fetch(`${URL}/api/account/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept':'application/json'  
    },
      body: JSON.stringify(data),
    })
    .then ((response) => {
        if (response.ok) {
            $('#register').removeClass('is-invalid')
            return response.json()
        } else {
            $('#register').toggleClass('is-invalid', true)
            $('#register+.invalid-feedback').text('Ошибка! Возможно этот email уже зарегистрирован или логин уже используется.')
        }
    })
    .then ((json) => {
        localStorage.setItem('token', `${json['token']}`)
        location.href = '../index.html'
    })
  }

