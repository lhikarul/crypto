import {PriceProps} from '../../types'

const Price = ({price}: {price: PriceProps}) => {
  return <div className="absolute top-[13px] left-[10px] text-[#FFFFFF] inline-flex" style={{'color': price?.color}}>
    <div className="pr-[10px]">O:<span>{price?.open}</span></div>
    <div className="pr-[10px]">H:<span>{price?.high}</span></div>
    <div className="pr-[10px]">L:<span>{price?.low}</span></div>
    <div className="pr-[10px]">C:<span>{price?.close}</span></div>
  </div>
}

export default Price