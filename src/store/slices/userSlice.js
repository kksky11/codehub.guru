import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeLeftMenu: "",
  utmData :{},
  userData:{}
}

export const userSlice = createSlice({
  name: 'userReducer',
  initialState: initialState,
  reducers: {
    setUserData: (state, action) => { state.userData = action?.payload },
    setUtmData: (state, action) => { state.utmData = action?.payload },
    setActiveLeftMenu: (state, action) => { state.activeLeftMenu = action.payload },
  }
})

export const {setUserData,setUtmData,setActiveLeftMenu,  } = userSlice?.actions;
export const selectUserReducer = (state) => state?.userReducer
export const selectUserData = (state) => state?.userReducer?.userData
export const selectUtmData  = (state) => state?.userReducer?.utmData
export const selectsActiveLeftMenu = (state) => state?.userReducer?.activeLeftMenu;

export default userSlice.reducer