import {D3Props, PriceProps} from '../../types'

interface VolumeProps extends D3Props {
  height: number
}

const Volume = (props: VolumeProps) => {
  const {xScale, yScale, xBand, d, i, cb, height} = props

  const handleOnMouseMove = (x: number, e: any, price: PriceProps) => {
    const y = e.nativeEvent.y - Math.round(e.currentTarget.getBoundingClientRect().top)
    cb && cb(x,y,price)
  }

  return <g key={i}>
    <rect 
      x={xScale(i) - xBand.bandwidth()}
      y={height - 50 - ((d.open === d.close) ? 1 : yScale(Math.min(+d.open, +d.close)) - yScale(Math.max(+d.open, +d.close)))}
      width={i === 0 ? xBand.bandwidth() : xBand.bandwidth() + xBand.bandwidth() * .3}
      height={(d.open === d.close) ? 1 : yScale(Math.min(+d.open, +d.close)) - yScale(Math.max(+d.open, +d.close))}
      fill={d.open > d.close ? "#f6465d" : "#0ecb81"}
    />

    <rect 
      onMouseMove={(e) => handleOnMouseMove((xScale(i) - xBand.bandwidth() / 2), e,{
        open: +d.open,
        high: +d.high,
        low: +d.low,
        close: +d.close,
        color: d.open > d.close ? "#f6465d" : "#0ecb81"
      })} 
      x={xScale(i) - xBand.bandwidth()}
      y={0}
      width={i === 0 ? xBand.bandwidth() : xBand.bandwidth() + xBand.bandwidth() * .3}
      height={height}
      fill={'rgba(255,255,255,0)'}
    />
  </g>
}

export default Volume