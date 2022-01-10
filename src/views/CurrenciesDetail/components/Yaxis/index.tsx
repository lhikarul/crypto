import {ScaleLinear} from "d3";

const Yaxis = (props: {tickValue: number, yScale: ScaleLinear<number, number, never>, innerWidth: number}) => {
  const {tickValue, yScale, innerWidth} = props
  return <g key={tickValue} transform={`translate(${innerWidth}, ${yScale(tickValue)})`}>
  <line x2={-innerWidth} stroke="rgba(255,255,255, .2)" />
  <text
    fill={'white'} 
    key={tickValue}
    x={7}
    dy={10}
    style={{fontSize: '12px'}}
    
  >
    {tickValue}
  </text>
</g>
}

export default Yaxis