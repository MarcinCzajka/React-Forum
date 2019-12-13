import jwt_decode from 'jwt-decode';

export default function () {
    if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token');
        const data = { ...jwt_decode(token), ...{loggedIn: true}};
        document.cookie = token;
        return data;
    };

    return false
}