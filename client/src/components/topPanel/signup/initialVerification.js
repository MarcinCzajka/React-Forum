export default (data) => {
    if(!data.userName) {
        return 'Username is not allowed to be empty.';
    } else if(!data.email) {
        return 'Email is not allowed to be empty.';
    } else if(!data.password) {
        return 'Password is not allowed to be empty.';
    } else if(!data.passwordRepeat) {
        return 'You need to repeat your password.';
    } else if(data.password !== data.passwordRepeat) {
        return 'Passwords are not identical.';
    } else if (!data.captchaToken) {
        return 'Please confirm, you are not a robot.';
    }

    return false;
}