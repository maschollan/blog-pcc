import {http, httpfile} from "../../Pages/Test/httpCommon";

export const getAllContents = () => {
    return http.get("/posts");
};

export const getContent = (id) => {
    return http.get(`/posts/${id}`);
};

export const createContent = (data) => {
    return http.post("/posts", data);
};

export const updateContent = (id, data) => {
    return http.patch(`/posts/${id}`, data);
};

export const removeContent = (id) => {
    return http.delete(`/posts/${id}`);
};

export const uploadimage = (data) => {
    return httpfile.post("/uploadImage", data);
};

export const getThumbnail = () => {
    return http.get('/thumbnail');
}

export const addThumbnail = (data) => {
    return http.post('/thumbnail', data);
}

export const removeThumbnail = (id) => {
    return http.delete(`/thumbnail/${id}`);
};
