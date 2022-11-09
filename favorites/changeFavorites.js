import URL from '../url.js'

export function AddToFavorite(id) {
    fetch(`${URL}/api/favorites/${id}/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
        .then((response) => {
            if (response.ok) {
                $('.add-to-favorites-button').addClass('d-none');
                $('.remove-from-favorites-button').removeClass('d-none');

            }
        })
}

export function RemoveFromFavorite(id) {
    fetch(`${URL}/api/favorites/${id}/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
        .then((response) => {
            if (response.ok) {
                $('.add-to-favorites-button').removeClass('d-none');
                $('.remove-from-favorites-button').addClass('d-none');
            }
        })
}

export function checkInFavorites(id) {
    if (localStorage.getItem('token') !== null) {
        fetch(`${URL}/api/favorites`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then((json) => {
                for (let movie of json['movies']) {
                    if (id == movie['id']) {
                        $('.add-to-favorites-button').toggleClass('d-none', true);
                        $('.remove-from-favorites-button').toggleClass('d-none', false);
                        return;
                    }
                }
                $('.add-to-favorites-button').toggleClass('d-none', false);
                $('.remove-from-favorites-button').toggleClass('d-none', true);
            })
    }
}