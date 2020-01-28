import basePath from '../../api/basePath';

export default data => {
    return new Promise((resolve, reject) => {
        basePath({
            method: 'post',
            url: '/api/users',
            headers: {
                captchaToken: data.captchaToken
            },
            data: {
                name: data.userName,
                email: data.email,
                password: data.password
            }
        }).then(res => {
            if (res.status === 200) resolve(res);
        }).catch(err => {
            reject(err.response.data);
        })
    })
}