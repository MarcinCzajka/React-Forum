import basePath from '../../../api/basePath';

export default (postId) => {
    return new Promise((resolve, reject) => {
        basePath({
            method: "get",
            url: `/api/rooms/${postId}`
        })
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            reject(err);
        })
    })
}