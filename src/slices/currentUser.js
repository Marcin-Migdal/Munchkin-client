import { createSlice } from '@reduxjs/toolkit'
import userService from '../api/user.api'

const initialState = {
  loading: false,
  hasErrors: false,
  currentUser: {},
}

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    getCurrentUser: (state) => {
      state.loading = true
    },
    getCurrentUserSuccess: (state, { payload }) => {
      state.currentUser = payload
      state.loading = false
      state.hasErrors = false
    },
    getCurrentUserFailure: (state) => {
      state.loading = false
      state.hasErrors = true
    }
  }
})

export const { getCurrentUser, getCurrentUserSuccess, getCurrentUserFailure } = currentUserSlice.actions

export const currentUserSelector = (state) => state.currentUser

export default currentUserSlice.reducer

export function fetchCurrentUser() {
  return async (dispatch) => {
    dispatch(getCurrentUser)

    await userService.getCurrentUser()
    .then(res => dispatch(getCurrentUserSuccess(res.body)))
    .catch(e => {
      console.log(e)
      dispatch(getCurrentUserFailure())
    })
  }
}