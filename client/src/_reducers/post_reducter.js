import {
    GET_POSTS,
    CREATE_POST,
    UPDATE_POST,
    DELETE_POST
} from '../_actions/types';
 

export default function(state={},action){
    switch(action.type){
        case GET_POSTS:
            return {...state, getPostsSuccess: action.payload }
        case CREATE_POST:
            return {...state, createSuccess: action.payload }
        case UPDATE_POST:
            return { ...state, updateSuccess: action.payload }
        case DELETE_POST:
            return {...state, deleteSuccess: action.payload }
        default:
            return state;
    }
}