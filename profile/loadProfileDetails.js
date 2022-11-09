import URL from '../url.js'

function LoadDetails() {
    fetch(`${URL}/api/account/profile`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        $('.form-edit-profile').attr('id', json['id'])
        $('.user-nickname').text(`${json['nickName']}`)
        $('.user-email').val(json['email'])
        $('.user-avatar-link').val(json['avatarLink'])
        if (json['avatarLink'] !== null) {
            $('.user-avatar').attr('src', json['avatarLink'])
        }
        $('.user-name').val(json['name'])
        $('.user-birth-date').val(json['birthDate'].substr(0, 10))
        $('.user-gender').val(json['gender'])
    })    
}

export default LoadDetails