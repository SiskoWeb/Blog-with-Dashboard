


export const PostsReducer = (state = {Posts:[]} ,action )=>{

    switch (action.type) {
        case "YesData":
            return{ Posts:action.data};
            case "NoData":
                return{ Posts:action.data};
  
        default:
            return state;
    }
}



