import axios from "axios";




const API_URL = "https://localhost:44397/api/role/";



class RoleService {



    getRoles() {
        return axios
          .get(API_URL + "getRoles")
      ;
      }
    
}
 
export default new RoleService();

