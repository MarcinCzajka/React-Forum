export default (context) => {

    localStorage.removeItem('token');
    document.cookie = 'x-auth-token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    if(context) {
        context.setContextData({
            loggedIn: false,
            open: false,
            userName: '',
            userId: '',
            userAvatar: '',
            userEmail: '',
            userCreatedAt: ''
        })
    }
}