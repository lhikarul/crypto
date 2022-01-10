import { useState } from 'react';
import {useParams} from 'react-router-dom'
import {useGetCryptoDetailsQuery, useGetCryptoHistoryQuery} from '@/services/cryptoApi'
import {useGetKlineQuery} from '@/services/binanceApi'
import TimeRange from './components/TimeRange'
import TradingView from './containers/TradingView'
import {WebsocketContextProvider} from '@/services/ws'

const TIME_LINE = ['15m', '30m', '1h', '4h', '8h', '1d', '1w', '1M'];

const CryptoDetails = () => {
  const {coinId, symbol} = useParams()
  const [timeperiod, settimeperiod] = useState('15m')
  const [incomingPrice, setIncompingPrice] = useState()
  const {data: kLine, isFetching: fetchingKline } = useGetKlineQuery({symbol: `${symbol}USDT`, interval: timeperiod})

  const onSelect = (time: string) => {
    settimeperiod(time)
  }

  if (fetchingKline) return <div>loading...</div>

  return (
    <div className="bg-[#000000] text-[#FFFFFF]">
    <TimeRange 
      range={TIME_LINE}
      onSelect={onSelect}
    />
    <WebsocketContextProvider>
      <TradingView 
        data={kLine.slice(-60)}
        timeperiod={timeperiod}
        symbol={symbol as string}
      />
    </WebsocketContextProvider>
    </div>
  )
}

export default CryptoDetails