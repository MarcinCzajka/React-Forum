import basePath from '../../../api/basePath';
import jwt_decode from 'jwt-decode';

export default (email, password) => {
    return new Promise((resolve, reject) => {
        basePath({
        method: 'post',
        url: '/login',
        data: {
            email: email,
            password: password
        },
        withCredentials: true
        }).then(res => {
            if (res.status === 200) resolve(jwt_decode(document.cookie));
        }).catch(error => {
            reject(error.response.data);
        });
    })
}