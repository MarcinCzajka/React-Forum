import basePath from '../../../../api/basePath';

export const getForumPost = postId => {
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

export const getForumPosts = (pageNr, postsLimit) => {
    return new Promise((resolve, reject) => {
        basePath({
            method: "get",
            url: `/api/rooms/`,
            params: {
                roomsLimit: postsLimit,
                page: pageNr
            }
        })
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            reject(err);
        })
    })
}

export const getPostAuthor = authorId => {
    return new Promise((resolve, reject) => {
        basePath({
            method: 'GET',
            url: `/api/users/${authorId}`
        })
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            reject(err);
        })
    })
}

export const getCommentsCount = forumPostId => {
    return new Promise((resolve, reject) => {
        basePath({
            method: "get",
            url: `/api/posts/responseTo?room=${forumPostId}`,
            withCredentials: true
        })
        .then(res => {
            resolve(res.data.comments);
        })
        .catch(err => {
            reject(err);
        })
    })
}

export const upvoteForumPost = forumPostId => {
    return new Promise((resolve, reject) => {
		basePath({
			method: "put",
			url: `/api/rooms/${forumPostId}`,
			body: {},
			withCredentials: true
		})
		.then(res => {
			resolve(res.data);
		})
		.catch(err => {
			reject(err);
        })
    })
}

export const replyToForumPost = (authorId, forumPostId, content) => {
    return new Promise((resolve, reject) => {
        basePath({
            method: 'POST',
            url: `/api/posts/`,
            data: {
                authorId: authorId,
                roomId: forumPostId,
                content: content,
                responseTo: forumPostId
            },
            withCredentials: true
        })
        .then((res) => {
            resolve(res);
        })
        .catch(err => {
            reject(err);
        })
    })
}

export const createForumPost = (userId, title, description, category, image) => {
    return new Promise((resolve, reject) => {
        basePath({
            method: 'POST',
            url: `/api/rooms/`,
            data: {
                authorId: userId,
                title: title,
                description: description,
                category: category,
                image: image,
                date: new Date().toISOString()
            },
            withCredentials: true
        })
        .then((res) => {
            resolve(res);
        })
        .catch(err => {
            reject(err);
        })
    })
}