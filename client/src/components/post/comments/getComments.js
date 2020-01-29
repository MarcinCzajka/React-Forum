import basePath from '../../../api/basePath';

export const fetchResponseComments = (parentId, mongoSorting) => {
    //Fetch all comments with value "responseTo" equal to id
    const sorting = mongoSorting ? `sort=${mongoSorting}` : '';
    
    return new Promise((resolve, reject) => {
        basePath({
            method: "get",
            url: `/api/posts/?responseTo=${parentId}&${sorting}`
        })
        .then(res => {
            resolve(res);
        })
        .catch(err => {
            reject(err);
        })
    })
}

export const removeComment = (id) => {
    //remove comment with given id from DB
    return new Promise((resolve, reject) => {
        basePath({
			method: "delete",
			url: `/api/posts/${id}`,
            withCredentials: true
		})
            .then(res => {
                if(res.status === 200){
                    resolve(res);
                };
            })
            .catch(err => {
                reject(err);
            })
    })
}