import { createSlice } from '@reduxjs/toolkit'
import roomsService from '../api/rooms.api'

const initialState = {
  loading: false,
  hasError: false,
  room: false
}

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    getRoom: (state) => {
      state.loading = true
    },
    getRoomSuccess: (state, { payload }) => {
      state.room = payload
      state.loading = false
      state.hasError = false
    },
    getRoomFailure: (state) => {
      state.loading = false
      state.hasError = true
    },
    deleteRoom: (state) => {
      state.room = false
      state.loading = false
      state.hasError = false
    }
  }
})

export const { getRoom, getRoomSuccess, getRoomFailure, deleteRoom } = roomSlice.actions

export const roomSelector = (status) => status.room

export default roomSlice.reducer

export function fetchRoom(roomId) {
  return async (dispatch) => {
    dispatch(getRoom)

    await roomsService.getRoom(roomId)
      .then(res => dispatch(getRoomSuccess(res.body)))
      .catch(e => {
        console.log(e)
        dispatch(getRoomFailure())
      })
  }
}

export function deleteRoomInStore() {
  return (dispatch) => {
    dispatch(deleteRoom())
  }
}