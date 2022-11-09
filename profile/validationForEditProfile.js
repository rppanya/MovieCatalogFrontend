const EMAIL_REGEXP = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

function isValid() {
    var isValidForm = true
    $('[required]').each(function (indexFormInput, formInput) {
        if ($(formInput).val() === '') {
            $(formInput).addClass('is-invalid')
            isValidForm = false
            return false
        } else {
            $(formInput).removeClass('is-invalid')
        }
    })

    if (!isValidForm) {
        return false
    }

    var email = $('.user-email')
    if (!isEmailValid(email.val())) {
        $('.user-email').toggleClass('is-invalid', true)
        $('.user-email+.invalid-feedback').text('Некорректный Email')
        return false
    } else {
        $('.user-email').removeClass('is-invalid')
    }

    let birthDate = $('.user-birth-date')
    if (Date.parse(`${birthDate.val()}T00:00:00`) > Date.now()) {
        $('.user-birth-date').toggleClass('is-invalid', true)
        $('.user-birth-date+.invalid-feedback').text('Вы из будущего?')
        return false
    } else {
        $('.user-birth-date').removeClass('is-invalid')
    }

    return true
}

function isEmailValid(value) {
    return EMAIL_REGEXP.test(value)
}

export default isValid