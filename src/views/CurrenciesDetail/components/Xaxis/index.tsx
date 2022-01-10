
import {ScaleLinear} from "d3";

const Xaxis = (props: {tickValue: number, xScale: ScaleLinear<number, number, never>, innerHeight: number}) => {
  const {tickValue, xScale, innerHeight} = props
  return <g key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
    <line y2={innerHeight / 1.3} stroke="rgba(255,255,255, .2)" />
  </g>
}

export default Xaxis