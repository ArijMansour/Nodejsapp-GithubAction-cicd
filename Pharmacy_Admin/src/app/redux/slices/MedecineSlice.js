import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../infrastructure/services/api/ApiUrl";
import MedecineService from "../../../infrastructure/services/api/MedecineService";
import { getFiles } from "../../../_helper/auth";

export const RetrieveMedecines = createAsyncThunk(
  "Medecines/RetrieveMedecines",
  async () => {
    const { data } = await axios.get(
      "https://closer-server.herokuapp.com/Medecines"
    );

    return data;
  }
);

export const RetrieveMedecinesByIdCategory = createAsyncThunk(
  "Medecines/RetrieveMedecinesByIdCategory",
  async (idCategory) => {
    const { data } = await axios.get(
      `${API_URL}Medecines/findByIdCategory/` + idCategory
    );

    return data;
  }
);

export const createMedecine =
  (
    name,
    description,
    price,
    expiresDate,
    inStock,
    multiple_resources,
    typeMedicine
  ) =>
  async (dispatch) => {
    console.log(multiple_resources);
    const formData = new FormData();
    for (const key of Object.keys(multiple_resources)) {
      formData.append("multiple_resources", multiple_resources[key]);
      console.log(key);
    }

    formData.append("description", description);
    formData.append("name", name);
    formData.append("inStock", inStock);
    formData.append("price", Number(price));
    formData.append("expiresDate", expiresDate);
    formData.append("typeMedicine", typeMedicine);

    const promise = MedecineService.createMedecine(formData)
      .then((response) => {
        const data = response.data;

        // assign data
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
    const data = promise;
    console.log("this is data");
    console.log(data);
    return data;
  };

export const UpdateMedecines =
  (MedecinesId, titre, description, Resources, selectedItem) =>
  async (dispatch) => {
    const cour = {
      titre: titre,
      description: description,
      multiple_resources: Resources,
      idCategory: selectedItem,
    };
    console.log("this is cour");
    console.log(cour);

    const promise = await axios
      .put("https://closer-server.herokuapp.com/Medecines/" + MedecinesId, cour)
      .then((response) => {
        const CurrentClass = JSON.parse(localStorage.getItem("idClass"));
        console.log(CurrentClass._id);
        dispatch(RetrieveMedecinesByIdClass(CurrentClass._id));

        const data = response.data;

        // assign data
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
    const data = promise;
    console.log("this is data");
    console.log(data);
    return data;
  };

export const GetMedecinesById = createAsyncThunk(
  "Medecines/GetMedecinesById",

  async (id) => {
    const promise = await axios
      .get(`${API_URL}/medecine/${id}`)

      .then((response) => {
        console.log("this is response");
        console.log(response);
        console.log("this is data");
        console.log(response.data);
        //console.log(response);
        const data = response.data;

        // assign data
        return data;
      });

    const data = await promise;
    return data;
  }
);

export const GetCategory = createAsyncThunk(
  "Medecines/GetCategory",

  async (category) => {
    const promise = MedecineService.getcategoryMedecine(category).then(
      (response) => {
        alert(response);
        console.log("this is response");
        console.log(response);
        console.log("this is data");
        console.log(response.data);
        //console.log(response);
        const data = response.data;

        // assign data
        return data;
      }
    );

    const data = await promise;
    return data;
  }
);

export const UpdateResources = createAsyncThunk(
  "Medecines/UpdateResources",

  async (resources) => {
    //MedecinesSlice.state.Resources.push(resources);
    console.log(resources);
    return resources;
  }
);

export const DeleteMedecines = createAsyncThunk(
  "Medecines/DeleteMedecines",

  async (MedecinesId) => {
    const promise = await axios
      .delete("https://closer-server.herokuapp.com/Medecines/" + MedecinesId)

      .then((response) => {
        console.log("this is response");
        console.log(response);
        console.log("this is data");
        console.log(response.data);
        //console.log(response);
        const data = response.data;

        // assign data
        return data;
      });

    const data = await promise;
    return data;
  }
);

export const DeleteResources = createAsyncThunk(
  "Medecines/DeleteResources",

  async (index) => {
    return index;
  }
);

export const MedecinesSlice = createSlice({
  name: "Medecines",
  initialState: {
    Medecines: [],
    category: null,
    status: null,
    statusUpdate: null,
    MedecinesById: [],
    MedecinesByCategory: [],
    Resources: [],
  },
  extraReducers: {
    [RetrieveMedecines.pending]: (state, action) => {
      state.status = "loading";
    },
    [RetrieveMedecines.fulfilled]: (state, { payload }) => {
      state.Medecines = payload;
      state.status = "success";
    },
    [RetrieveMedecines.rejected]: (state, action) => {
      state.status = "failed";
    },
    [RetrieveMedecinesByIdCategory.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.MedecinesByCategory = payload;
    },

    [RetrieveMedecinesByIdCategory.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.MedecinesByCategory = payload;
    },
    [GetCategory.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.category = payload;
    },
    [UpdateResources.fulfilled]: (state, action) => {
      //state.Resources.push(action.payload);

      state.Resources.push(action.payload);
    },

    [GetMedecinesById.fulfilled]: (state, action) => {
      state.MedecinesById = action.payload;
      state.Resources = action.payload.multiple_resources;
      console.log(state.Resources);
    },
    [DeleteMedecines.fulfilled]: (state, action) => {
      state.Medecines = state.Medecines.filter((u) => {
        return u._id !== action.payload.result._id;
      });
    },

    [DeleteResources.fulfilled]: (state, action) => {
      //state.Resources.splice(action.payload, 1);
      let res = action.payload;
      let resources = state.Resources.slice();
      resources = resources.filter((u) => {
        return u.url !== res;
      });
      state.Resources = resources;
    },

    UpdateMedecines: (state, action) => {
      state.statusUpdate = "success";
      let cour = action.payload.result;

      for (let i = 0, n = state.Medecines.length; i < n; i++) {
        if (state.Medecines[i]._id === cour._id) {
          state.Medecines[i].titre = cour.titre;
          state.Medecines[i].idCategory = cour.idCategory;
          state.Medecines[i].dateCreation = cour.dateCreation;
          state.Medecines[i].description = cour.description;
          state.Medecines[i].multiple_resources = cour.multiple_resources;

          break; // Stop this loop, we found it!
        }
      }
    },

    createMedecine: (state, action) => {
      state.Medecines.push(action.payload.result);
    },
  },
});

export default MedecinesSlice.reducer;
