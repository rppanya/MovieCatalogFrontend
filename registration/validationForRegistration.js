
const EMAIL_REGEXP = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const WITHOUT_SPACES_REGEXP = /^\S+$/

function isValid() {
    let userLogin = $('#userLogin').val()
    if (!isWithoutSpaces(userLogin)) {
        $('#userLogin').toggleClass('is-invalid', true)
        $('#userLogin+.invalid-feedback').text('Некорректный login, логин не может содеражать символы пробела')
        return false
    } else {
        $('#userLogin').removeClass('is-invalid')
    }

    let password1 = $('#userPassword1').val()
    let password2 = $('#userPassword2').val()
    if (password1.length < 6 || password1.length > 20) {
        $('#userPassword1').addClass('is-invalid')
        $('#userPassword1+.invalid-feedback').text('Пароль должен содержать от 6 до 20 символов')
        return false
    } else {
        $('#userPassword1').removeClass('is-invalid')
    }
    if (!isWithoutSpaces(password1)) {
        $('#userPassword1').toggleClass('is-invalid', true)
        $('#userPassword1+.invalid-feedback').text('Некорректный пароль, пароль не может содержать символы пробела')
        return false
    } else {
        $('#userPassword1').removeClass('is-invalid')
    }
    if (password1 !== password2) {
        $('#userPassword2').addClass('is-invalid')
        $('#userPassword2+.invalid-feedback').text('Пароли не совпадают')
        return false
    } else {
        $('#userPassword2').removeClass('is-invalid')
    }

    let email = $('#userEmail')
    if (!isEmailValid(email.val())) {
        $('#userEmail').toggleClass('is-invalid', true)
        $('#userEmail+.invalid-feedback').text('Некорректный Email')
        return false
    } else {
        $('#userEmail').removeClass('is-invalid')
    }

    let birthDate = $('#userBirthDate')
    if (Date.parse(`${birthDate.val()}T00:00:00`) > Date.now()) {
        $('#userBirthDate').toggleClass('is-invalid', true)
        $('#userBirthDate+.invalid-feedback').text('Вы из будущего?')
    } else {
        $('#userBirthDate').removeClass('is-invalid')
    }

    return true
}

function isEmailValid(value) {
    return EMAIL_REGEXP.test(value)
}

function isWithoutSpaces(value) {
    return WITHOUT_SPACES_REGEXP.test(value)
}

export default isValid