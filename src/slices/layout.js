import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loaded: false,
  layout: {}
}

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    getLayout: (state) => {
      state.loaded = false
    },
    getLayoutSuccess: (state, { payload }) => {
      state.layout = payload
      state.loaded = true
    },
    setSideMenu: (state) => {
      state.layout.sideMenuActive = !state.layout.sideMenuActive
    },
    closeSideMenu: (state) => {
      state.layout.sideMenuActive = false
    }
  }
})

export const { getLayout, getLayoutSuccess, setSideMenu, closeSideMenu } = layoutSlice.actions

export const layoutSelector = (state) => state.layout

export default layoutSlice.reducer

export function setLayout(layout) {
  return (dispatch) => {
    dispatch(getLayout())
    dispatch(getLayoutSuccess(layout))
  }
}

export function toogleSideMenu() {
  return (dispatch) => {
    dispatch(setSideMenu())
  }
}

export function closeSideMenuOnClick() {
  return (dispatch) => {
    dispatch(closeSideMenu())
  }
}