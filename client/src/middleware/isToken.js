import jwt_decode from 'jwt-decode';

export default function () {
    if (localStorage.getItem('token')) {
        const data = {...jwt_decode( localStorage.getItem('token') ), ...{loggedIn: true}};
        return data;
    } else if(document.cookie) {
        const data = {...jwt_decode(document.cookie), ...{loggedIn: true}};
        console.log(1, data)
        return data;
    };

    return false
}