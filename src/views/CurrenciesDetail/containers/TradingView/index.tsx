import { useEffect, useState } from 'react'
import {scaleLinear, scaleBand, range, symbol} from "d3";

import {useWebsocketContext} from '@/services/ws'

import CrossLine from '../../components/CrossLine'
import Price from '../../components/Price'
import Volume from '../../components/Volume'
import CandleStick from '../../components/CandleStick'
import Yaxis from '../../components/Yaxis'
import Xaxis from '../../components/Xaxis'

import {getKlineObj, getDomain} from '../../utils'

import {PriceProps, D3Props} from '../../types'

interface LivePriceProps {
  open: string
  high: string
  low: string
  close: string
  volume: string
}

const BASE_ENDPOINT = 'wss://stream.binance.com:9443'

const downColor = '#f6465d'
const upColor = '#0ecb81'

const svgWidth = 1280
const svgHeight = 600

const margin = {
  top: 20,
  left: 10,
  right: 60,
  bottom: 20
}

const innerWidth = svgWidth - margin.left - margin.right
const innerHeight = svgHeight - margin.top - margin.bottom

const LivePrice = (props: {y: number, price: number, up: boolean}) => {
  const {y, price, up} = props
  console.log(y,price);
  
  return <g transform={`translate(${innerWidth}, ${y})`}>
    <rect x={5} width={40} height={20} fill={up ? upColor : downColor}></rect>
    <text
      fill={up ? '#000000' : '#FFFFFF'}
      x={7}
      dy={13}
      style={{fontSize: '10px'}}
    >{+price.toFixed(2)}</text>
    <line
      x1={0}
      x2={-innerWidth}
      strokeWidth={1}
      stroke={up ? upColor : downColor}
      strokeDasharray={3}
    />
  </g>
}

const TradingView = ({data, timeperiod, symbol}: {data: any, timeperiod: string, symbol: string}) => {

  const {connect} = useWebsocketContext()

  const kline = getKlineObj(data)
  const newestPrice = kline[kline.length - 1]
  const domain = getDomain(kline)

  const [priceList, setPriceList] = useState<PriceProps>({
    open: +newestPrice.open,
    high: +newestPrice.high,
    low: +newestPrice.low,
    close: +newestPrice.close,
    color: newestPrice.open > newestPrice.close ? "#f6465d" : "#0ecb81"
  })

  const [livePrice, setLivePrice] = useState<LivePriceProps>({
    open: '0',
    high: '0',
    low: '0',
    close: '0',
    volume: '0'
  })

  const [mouseCoords, setMouseCoords] = useState({
    x: 0,
    y: 0
  })

  const xScale = scaleLinear().domain([0, kline.length - 1]).range([0, innerWidth])

  const xBand = scaleBand().domain(range(0, kline.length - 1) as any).range([0, innerWidth]).padding(0.3)

  const yScale = scaleLinear().domain(domain).range([innerHeight / 1.3, 0]).nice()

  const onMouseMove = (x: number, y: number, price: D3Props['d']) => {    
    if (x > mouseCoords.x && x < mouseCoords.x + xBand.bandwidth()) return
    
    setMouseCoords({
      x,
      y
    });

    setPriceList({
      ...price,
      color: price.open > price.close ? "#f6465d" : "#0ecb81"
    })
  };

  useEffect(() => {
    const ws = connect(BASE_ENDPOINT + `/ws/${symbol.toLowerCase()}usdt@kline_${timeperiod}`)

    ws.onmessage = (e) => {
      const obj = JSON.parse(e.data)
      setLivePrice({
        open: obj.k.o,
        high: obj.k.h,
        low: obj.k.l,
        close: obj.k.c,
        volume: obj.k.v
      })
    }

    return () => {
      ws.close()
    }
  }, [])

  return <div>
    <div className={'relative'}>
      <Price 
        price={priceList}
      />
    <svg
      width={svgWidth} 
      height={svgHeight} 
      className="pt-[50px] px-[10px] mg-[auto]"
      style={{backgroundColor: "#000000"}
    }>
    {
      yScale.ticks().map(tickValue => (
        <Yaxis
          key={tickValue} 
          innerWidth={innerWidth}
          tickValue={tickValue}
          yScale={yScale}
        />
      ))
    }
    {
      kline.map((d, i) => {
        if (i === kline.length - 1) return <></>
        return <>
          <CandleStick 
            key={i}
            xScale={xScale}
            yScale={yScale}
            xBand={xBand}
            i={i}
            d={d}
          />
          <Volume
            key={1 + (i*10)}
            xScale={xScale}
            yScale={yScale}
            xBand={xBand}
            i={i}
            d={d}
            cb={onMouseMove}
            height={svgHeight}
          />
          </>
        })
    }
    {
      xScale.ticks().map(tickValue => (
        <Xaxis 
          key={tickValue * 4}
          innerHeight={innerHeight}
          tickValue={tickValue}
          xScale={xScale}
        />
      ))
    }
    <CandleStick 
      key={'dynamicCandleStick'}
      xScale={xScale}
      yScale={yScale}
      xBand={xBand}
      i={kline.length - 1}
      d={livePrice}
    />
    <Volume
      key={'dynamicVolume'}
      xScale={xScale}
      yScale={yScale}
      xBand={xBand}
      i={kline.length - 1}
      d={livePrice}
      cb={onMouseMove}
      height={svgHeight}
    />
    <LivePrice 
      y={yScale(+livePrice.close)}
      price={+livePrice.close}
      up={+livePrice.close >= +livePrice.open}
    />
    <CrossLine 
      x={mouseCoords.x}
      y={mouseCoords.y}
      innerWidth={innerWidth}
      innerHeight={innerHeight}
    />
  </svg>
  </div>
  </div>
}

export default TradingView