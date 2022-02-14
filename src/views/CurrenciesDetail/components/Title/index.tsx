import { useGetCryptosQuery } from "@/services/cryptoApi"
import { useWebsocketContext, WebsocketContextProvider } from "@/services/ws"
import { useEffect, useState } from "react"
import { downColor, upColor } from "../../utils"
import {useNavigate} from 'react-router-dom'
import { filterCoinList } from "@/views/Home/container/CurrencyList"

const Popup = (props: {count: number, onClick: () => void}) => {
    const navigate = useNavigate()
    const {count} = props
    const {data: cryptoData, isFetching} = useGetCryptosQuery(count)
    const [cryptoList, setCryptoList] = useState(cryptoData?.data?.coins)

    const handleOnClick = (coin: {symbol: string, uuid: string}) => {
        navigate(`/currencies/${coin.symbol}/${coin.uuid}`)
        props.onClick()
    }

    useEffect(() => {
        const filteredData = cryptoData?.data?.coins.filter((coin: {symbol: string}) => !filterCoinList.includes(coin.symbol))
        setCryptoList(filteredData)
    }, [cryptoData?.data?.coins])

    if (isFetching) return <div>loading...</div>

    return  <div className="bg-[#14151a] p-[10px] border-[1px] border-white h-[200px] w-[300px] overflow-scroll absolute z-10">
                <ul>
                    {
                        cryptoList?.map((coin: any) => 
                            <li className="flex cursor-pointer hover:bg-sky-700" onClick={() => handleOnClick(coin)}>
                                <div className="w-[120px]">{`${coin.symbol}/USDT`}</div>
                                <div style={{'color': +coin.change > 0 ? upColor : downColor}} className="w-[120px]">{`${parseFloat(coin.price).toFixed(2)}`}</div>
                                <div style={{'color': +coin.change > 0 ? upColor : downColor}}>{`${coin.change}%`}</div>
                            </li>
                        )
                    }
                </ul>
            </div>
}

const Title = (props: {symbol: string}) => {
    const {symbol} = props
    const {connect} = useWebsocketContext()
    const [price, setPrice] = useState<string>()
    const [isUp, setIsUp] = useState<boolean>()
    const [display, setDisplay] = useState<boolean>(false)

    const handleMouseOver = () => {
        setDisplay(true)
    }

    useEffect(() => {
      const ws = connect('wss://stream.binance.com:9443' + `/ws/${symbol.toLowerCase()}usdt@trade`)
  
      ws.onmessage = (e) => {
        const obj = JSON.parse(e.data)
        const price = parseFloat(obj.p).toFixed(2)

        setPrice((val) => {
            if (val) {
                setIsUp(price > val ? true : false)
            }
            return price
        })
      }
  
      return () => {
        ws.close()
      }
    }, [symbol])
    return <div className="relative cursor-pointer" onMouseOver={handleMouseOver} onMouseLeave={() => setDisplay(false)}>
        <WebsocketContextProvider>
            <div className='text-[20px] px-[5px] pt-[5px]'>
                <span>{`${symbol}/USDT`}</span>
                <span className='ml-[10px]' style={{'color': isUp ? upColor : downColor}}>{price && `${price}`}</span>
            </div>
        </WebsocketContextProvider>
        {
            display && <Popup 
                count={30}
                onClick={() => setDisplay(false)}
            />
        }
    </div>
  }

  export default Title