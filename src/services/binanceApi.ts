import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '79a9818dc1msh37f6857fb7b30b0p188523jsn16eff0b0086f'
}

const baseUrl = 'https://api.binance.com'

const createRequest = (url: string) => ({url})

export const binanceApi = createApi({
  reducerPath: 'binanceApi',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: (builder) => ({
    getKline: builder.query({
      query: ({symbol, interval}) => createRequest(`/api/v3/klines?symbol=${symbol}&interval=${interval}`)
    })
  })
})

export const {
  useGetKlineQuery
} = binanceApi