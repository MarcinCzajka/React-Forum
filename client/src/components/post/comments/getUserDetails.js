import basePath from '../../../api/basePath';

export default (id) => {
    return new Promise((resolve,reject) => {
        basePath({
            method: "get",
            url: `/api/users/${id}`
        })
        .then(res => {
            resolve(res);
        })
        .catch(err => {
            reject(err);
        })
    })
}