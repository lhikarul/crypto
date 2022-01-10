import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit'

import {cryptoApi} from '../services/cryptoApi'
import { cryptoNewsApi } from '../services/cryptoNewsApi'
import {binanceApi} from '../services/binanceApi'

const binanceWsSlice = createSlice({
  name: 'counter',
  initialState: {
    kLineStreams: {
      open: '',
      close: '',
      high: '',
      low: ''
    }
  },
  reducers: {
    setKlineSteams: (state, action: PayloadAction<any>) => {
      state.kLineStreams = action.payload
    }
  },
});

export default configureStore ({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    [binanceApi.reducerPath]: binanceApi.reducer,
    binanceWs: binanceWsSlice.reducer
  }
})