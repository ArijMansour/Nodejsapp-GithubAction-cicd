import { GET_ROLES_FAIL, GET_ROLES_SUCCESS } from "../types/Types";


const initialState = {
    roles:[],
}


export default function(state = initialState, action){

    switch(action.type){

        case GET_ROLES_SUCCESS:
        return {
            ...state,
            roles:action.payload,

        }
        default: return state
    }

}