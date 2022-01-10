import {extent, line, scaleLinear, curveNatural} from "d3";

const chartWidth = 164
const chartHeight = 53

interface TrendLine {
  data: string[]
}

const TrendLine = (props: TrendLine) => {
  const {data} = props
  
  const xScale = scaleLinear()
  .domain([0, 25])
  .range([0, chartWidth])
  .nice()

  const yValue = (d:string) => +d
  const yScale = scaleLinear()
  .domain(extent(data, yValue) as number[])
  .range([chartHeight, 0])
  .nice()
 

  return <svg width={chartWidth} height={chartHeight}>
    <g>
      <path 
        fill="none"
        stroke={data[data.length - 1] > data[0] ? 'rgb(14, 203, 129)' : ' rgb(246, 70, 93)'}
        strokeWidth="2"
        d={
          line<any>()
          .x((d,i) => {
              return xScale(i)
          })
          .y((d) => {
              return yScale(yValue(d))
          })
          .curve(curveNatural)(data) as any
        }

      />
    </g>
  </svg>
}

export default TrendLine