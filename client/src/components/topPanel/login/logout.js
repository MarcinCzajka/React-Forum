export default (context) => {
    document.cookie = 'x-auth-token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
    localStorage.removeItem('token');

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