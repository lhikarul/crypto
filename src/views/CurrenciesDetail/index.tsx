import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import {useGetCryptoDetailsQuery, useGetCryptoHistoryQuery} from '@/services/cryptoApi'
import {useGetKlineQuery} from '@/services/binanceApi'
import TimeRange from './components/TimeRange'
import Title from './components/Title'
import TradingView from './containers/TradingView'
import BookDepth from './containers/BookDepth'
import {WebsocketContextProvider} from '@/services/ws'
import Navbar from '@/components/Navbar';

const TIME_LINE = ['15m', '30m', '1h', '4h', '8h', '1d', '1w', '1M'];

const TradingViewContext = (props: {symbol: string, timeperiod: string}) => {
  const {symbol, timeperiod} = props
  const {data: kLine, isFetching: isFetchKLine } = useGetKlineQuery({symbol: `${symbol}USDT`, interval: timeperiod})
  if (isFetchKLine) return <div>loading...</div>
  return <div>
        <WebsocketContextProvider>
            <TradingView 
              data={kLine}
              timeperiod={timeperiod}
              symbol={symbol as string}
            />
        </WebsocketContextProvider>
    </div>
}

const BookDepthContext = (props: {symbol: string}) => {
  const {symbol} = props
  return <div className="min-w-[300px] flex-1">
    <WebsocketContextProvider>
      <BookDepth 
        symbol={symbol as string}
      />
  </WebsocketContextProvider>
  </div>
}

const CryptoDetails = () => {
  const {symbol} = useParams()
  const [timeperiod, settimeperiod] = useState('15m')
  const onSelectTime = (time: string) => {
    settimeperiod(time)
  }
  return (
    <div className='bg-[#14151a] text-[#FFFFFF] h-[100%]'>
      <div className="flex justify-between	">
        <Title 
          symbol={symbol as string}
        />
        <Navbar />
      </div>
      <div className="flex">
        <div style={{'width': window.innerWidth * 0.7}}>
          <TimeRange 
            range={TIME_LINE}
            onSelect={onSelectTime}
          />
          <TradingViewContext symbol={symbol as string} timeperiod={timeperiod}/>
        </div>
      <div className='flex-1'>
          <BookDepthContext symbol={symbol as string}/>
      </div>
      </div>
    </div>
  )
}

export default CryptoDetails