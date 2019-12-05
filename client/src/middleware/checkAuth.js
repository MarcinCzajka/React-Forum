import UserContext from '../contexts/UserContext';
import jwt_decode from 'jwt-decode';

static contextType = UserContext;

export default function () {
    if (localStorage.getItem('token')) {
        const data = {...jwt_decode( localStorage.getItem('token') ), ...{loggedIn: true}};
        this.context.setContextData(data);
    } else if() {
        
    }

}