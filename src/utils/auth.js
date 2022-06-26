export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
    })
        .then(res => res.json())
            .then(res => res)
                .catch(err => console.log(err))
}
export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then(res => res.json())
            .then(data => {
                if(data.token) {
                    localStorage.setItem('jwt', data.token);
                    return data;
                }
            })
                .catch(err => console.log(err))
}
export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
    })
        .then(res => {
            try {
                if(res.status === 200) {
                    return res.json();
                }
                if(res.status === 400) {
                    throw new Error('Токен не передан или передан не в том формате')
                }
                if(res.status === 401) {
                    throw new Error('Переданный токен некорректен')
                }
            }
            catch(error) {
                return error
            }
        })
            .then(data => data)
}