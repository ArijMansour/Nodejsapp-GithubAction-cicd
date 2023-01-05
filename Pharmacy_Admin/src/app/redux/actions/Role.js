

import RoleService from "../../../infrastructure/services/api/RoleService.ts";   
import { GET_ROLES_FAIL, GET_ROLES_SUCCESS, SET_MESSAGE } from "../types/Types";


export const getRoles = () => (dispatch) => {
    return RoleService.getRoles(
      (res) => {
        
        dispatch( {
            type: GET_ROLES_SUCCESS,
            payload: res.data
        })
    }
    )
    
};