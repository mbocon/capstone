import axios from 'axios';
import {
    GET_POSTS,
    CREATE_POST,
    UPDATE_POST,
    DELETE_POST
} from './types';

import { POST_SERVER } from '../components/Config.js';

// GET ALL POSTS
export function getPosts(){
    const request = axios.get(`${POST_SERVER}/getposts`)
        .then(response => response.data);
    
    return {
        type: GET_POSTS,
        payload: request
    }
}

// CREATE A NEW POST
export function createPost(dataToSubmit){
    const request = axios.post(`${POST_SERVER}/create`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: CREATE_POST,
        payload: request
    }
}

// DELETE A POST
export function deletePost(dataToSubmit){
    const request = axios.delete(`${POST_SERVER}/${dataToSubmit.userId}/${dataToSubmit.postId}`, dataToSubmit)
                .then(response => response.data);

    return {
        type: DELETE_POST,
        payload: request
    }
}

// UPDATE A POST
export function updatePost(dataToSubmit){
    const request = axios.put(`${POST_SERVER}/${dataToSubmit.id}`,dataToSubmit)
                .then(response => response.data);

    return {
        type: UPDATE_POST,
        payload: request
    }
}



