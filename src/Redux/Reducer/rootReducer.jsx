import { combineReducers } from 'redux'
import { PostsReducer } from './PostsReducer'
import { handelLogin } from './handelLogin'



export const rootReducer = combineReducers({
    DataPosts: PostsReducer,
    Red: handelLogin,
   
})