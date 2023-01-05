import {
    SHIPPER_DETAILS_FAIL,
    SHIPPER_DETAILS_REQUEST,
    SHIPPER_DETAILS_RESET,
    SHIPPER_DETAILS_SUCCESS,
    SHIPPER_LIST_FAIL,
    SHIPPER_LIST_REQUEST,
    SHIPPER_LIST_SUCCESS,
    SHIPPER_LIST_RESET,
    SHIPPER_LOGIN_FAIL,
    SHIPPER_LOGIN_REQUEST,
    SHIPPER_LOGIN_SUCCESS,
    SHIPPER_LOGOUT,
    SHIPPER_REGISTER_FAIL,
    SHIPPER_REGISTER_REQUEST,
    SHIPPER_REGISTER_SUCCESS,
    SHIPPER_UPDATE_PROFILE_FAIL,
    SHIPPER_UPDATE_PROFILE_REQUEST,
    SHIPPER_UPDATE_PROFILE_SUCCESS,
    SHIPPER_DELETE_REQUEST,
    SHIPPER_DELETE_SUCCESS,
    SHIPPER_DELETE_FAIL,
    SHIPPER_UPDATE_REQUEST,
    SHIPPER_UPDATE_FAIL,
    SHIPPER_UPDATE_RESET,
    SHIPPER_UPDATE_SUCCESS,
    SHIPPER_CREATE_REQUEST,
    SHIPPER_CREATE_SUCCESS,
    SHIPPER_CREATE_FAIL
} from '../types/ShipperType'

export const SHIPPERLoginReducer = (state={},action) => {
    switch(action.type) {
        case SHIPPER_LOGIN_REQUEST :
            return {loading : true, }
        case SHIPPER_LOGIN_SUCCESS :
            return {loading : false , SHIPPERInfo: action.payload}
        case SHIPPER_LOGIN_FAIL :
            return {loading : false , error : action.payload}
        case SHIPPER_LOGOUT:
            return {}    
        default :
        return state  
        }
}





export const SHIPPERDetailsReducer = (state={SHIPPER: {}},action) => {
    switch(action.type) {
        case SHIPPER_DETAILS_REQUEST :
            return {...state, loading : true, }
        case SHIPPER_DETAILS_SUCCESS :
            return {loading : false , SHIPPER: action.payload}
        case SHIPPER_DETAILS_FAIL :
            return {loading : false , error : action.payload}
        case SHIPPER_DETAILS_RESET :
            return { SHIPPER: {} }
        default :
        return state  
        }
}


export const SHIPPERUpdateProfileReducer = (state={},action) => {
    switch(action.type) {
        case SHIPPER_UPDATE_PROFILE_REQUEST :
            return {loading : true, }
        case SHIPPER_UPDATE_PROFILE_SUCCESS :
            return {loading : false , success: true, SHIPPERInfo: action.payload}
        case SHIPPER_UPDATE_PROFILE_FAIL :
            return {loading : false , error : action.payload}
     
        default :
        return state  
        }
}

export const SHIPPERCreateReducer = (state={},action) => {
    switch(action.type) {
        case SHIPPER_CREATE_REQUEST :
            return {loading : true, }
        case SHIPPER_CREATE_SUCCESS :
            return {loading : false , success: true, SHIPPERInfo: action.payload}
        case SHIPPER_CREATE_FAIL :
            return {loading : false , error : action.payload}
     
        default :
        return state  
        }
}


export const SHIPPERListReducer = (state={SHIPPERs : []},action) => {
    switch(action.type) {
        case SHIPPER_LIST_REQUEST :
            return {loading : true, }
        case SHIPPER_LIST_SUCCESS :
            return {loading : false ,SHIPPERs: action.payload}
        case SHIPPER_LIST_FAIL :
            return {loading : false , error : action.payload}
        case SHIPPER_LIST_RESET : return {SHIPPERs : []}
        default :
        return state  
        }
}

export const SHIPPERDeleteReducer = (state={},action) => {
    switch(action.type) {
        case SHIPPER_DELETE_REQUEST :
            return {loading : true, }
        case SHIPPER_DELETE_SUCCESS :
            return {loading : false ,success: true}
        case SHIPPER_DELETE_FAIL :
            return {loading : false , error : action.payload}
        default :
        return state  
        }
}

export const SHIPPERUpdateReducer = (state={SHIPPER : {}},action) => {
    switch(action.type) {
        case SHIPPER_UPDATE_REQUEST :
            return {loading : true, }
        case SHIPPER_UPDATE_SUCCESS :
            return {loading : false ,success: true}
        case SHIPPER_UPDATE_FAIL :
            return {loading : false , error : action.payload}
        case SHIPPER_UPDATE_RESET : return {SHIPPERs : []}
        default :
        return state  
        }
}