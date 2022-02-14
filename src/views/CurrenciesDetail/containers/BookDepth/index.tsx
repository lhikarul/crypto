import { useEffect, useState } from "react"
import { useWebsocketContext, BINANCE_WS_BASE_POINT } from "@/services/ws"

import {upColor, downColor} from '../../utils'
import getRandom from "@/utils/getRandom"

const Popup = () => {
  return <div className="p-[10px] w-[200px] bg-[#858585] text-[#FFFFFF] absolute z-[1]">
    <div>均價</div>
    <div>合計 SOL:</div>
    <div>合計 USDT:</div>
  </div>
}

const ProgressBar = (props: {index:number, color: string}) => {
  const {index, color} = props
  const randomX = (index > 5) ? getRandom(50, 100) : getRandom(30, 100)
  return <div 
    className="w-[100%] h-[22px] absolute top-0"
    style={{background: color, opacity: .1, transform: `translateX(${randomX}%)`}} 
  />
} 

const Bid = (props: {bid: number, amount: number}) => {
  const {bid, amount} = props
  const total = (bid * amount).toFixed(2)

  return <div className="flex">
    <div className='px-[5px] flex-1' style={{color: upColor}}>{bid}</div>
    <div className='px-[5px] flex-1'>{amount}</div>
    <div className='px-[5px] flex-1'>{total}</div>
  </div>
}

const Ask = (props: {ask: number, amount: number}) => {
  const {ask, amount} = props
  const total = (ask * amount).toFixed(2)

  return <div className="flex">
    <div className='px-[5px] flex-1' style={{color: downColor}}>{ask}</div>
    <div className='px-[5px] flex-1'>{amount}</div>
    <div className='px-[5px] flex-1'>{total}</div>
  </div>
}

const BookDepth = (props: {symbol: string}) => {
  const {symbol} = props
  const {connect} = useWebsocketContext()
  const [bidsList, setBidsList] = useState<string[][]>([])
  const [asksList, setAsksList] = useState<string[][]>([])

  useEffect(() => {
    const ws = connect(BINANCE_WS_BASE_POINT + `/ws/${symbol.toLowerCase()}usdt@depth10@1000ms`)

    ws.onmessage = (e) => {
      const obj = JSON.parse(e.data)
      setBidsList(obj.bids)
      setAsksList(obj.asks)
    }

    return () => {
      ws.close()
    }
  }, [symbol])

  return <div className="relative m-[10px] flex-1">
    <div className="leading-[40px] pl-[5px]">委託訂單</div>
    <div className="flex">
        <div className="pl-[5px] flex-1">Price(USDT)</div>
        <div className="pl-[5px] flex-1">{`Amount(${symbol})`}</div>
        <div className="pl-[5px] flex-1">Total</div>
    </div>
    {
      asksList.map((ask, idx) => (<div 
        className="relative overflow-hidden" 
        // onMouseOver={() => console.log(idx)}
      >
        <Ask
            key={idx} 
            ask={+(+ask[0]).toFixed(2)}
            amount={+(+ask[1]).toFixed(2)}
          />
          <ProgressBar 
            color={downColor}
            index={idx}
          />
        </div>)
      )
    }
    {
      bidsList.map((bid,idx) => (<div 
      className="relative overflow-hidden" 
      // onMouseOver={() => console.log(idx)}
      // onMouseLeave={() => console.log('leave')}
    >
        <Bid
          key={idx} 
          bid={+(+bid[0]).toFixed(2)}
          amount={+(+bid[1]).toFixed(2)}
        />
        <ProgressBar 
          color={upColor}
          index={idx}
        />
      </div>)
      )
    }
    {/* <Popup /> */}
  </div>
}

export default BookDepth