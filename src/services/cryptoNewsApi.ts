import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoNewsHeaders = {
  'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
  'x-rapidapi-key': '79a9818dc1msh37f6857fb7b30b0p188523jsn16eff0b0086f'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com'

const createRequest = (url: string) => ({url, headers: cryptoNewsHeaders})

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({newsCategory, count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
    })
  })
})

export const {useGetCryptoNewsQuery} = cryptoNewsApi