import {PriceProps} from '../../types'

const Price = ({price}: {price: PriceProps}) => {
  let format:string = ''

  if (price.openTime) {
    const date = new Date(price.openTime)

    let m:number | string = date.getMonth() + 1
    m = (m < 10 ? '0' : '') + m

    let d:number | string = date.getDate()
    d = (d < 10 ? '0' : '') + d

    let h: number | string = date.getHours()
    h = (h < 10 ? '0' : '') + h

    let minutes: number | string = date.getMinutes()
    minutes = (minutes < 10 ? '0' : '') + minutes

    format = `${date.getFullYear()}/${m}/${d} ${h}:${minutes}`
  }
  return <div className="absolute top-[13px] left-[10px] text-[#FFFFFF] inline-flex" style={{'color': price?.color}}>
    <div className="pr-[10px]">O:<span>{price?.open}</span></div>
    <div className="pr-[10px]">H:<span>{price?.high}</span></div>
    <div className="pr-[10px]">L:<span>{price?.low}</span></div>
    <div className="pr-[10px]">C:<span>{price?.close}</span></div>
    <div className="pr-[10px]"><span>{format && format}</span></div>
  </div>
}

export default Price