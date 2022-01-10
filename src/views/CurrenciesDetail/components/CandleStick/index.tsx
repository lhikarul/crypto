import {D3Props} from '../../types'

const CandleStick = (props: D3Props) => {
  const {xScale, yScale, xBand, i, d} = props

  return <g key={i}>
    <rect 
      x={xScale(i) - xBand.bandwidth()}
      y={yScale(Math.max(+d.open, +d.close))}
      width={xBand.bandwidth()}
      height={(d.open === d.close) ? 1 : yScale(Math.min(+d.open, +d.close)) - yScale(Math.max(+d.open, +d.close))}
      fill={d.open > d.close ? "#f6465d" : "#0ecb81"}
    />
    <line 
      x1={xScale(i) - xBand.bandwidth() / 2}
      x2={xScale(i) - xBand.bandwidth() / 2}
      y1={yScale(+d.high)}
      y2={yScale(+d.low)}
      stroke={d.open > d.close ? "#f6465d" : "#0ecb81"}
    />
  </g>
}

export default CandleStick