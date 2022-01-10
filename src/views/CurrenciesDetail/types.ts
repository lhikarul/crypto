import {ScaleLinear, ScaleBand,} from "d3";

export interface PriceProps {
  open: number | string
  high: number | string
  low: number | string
  close: number | string
  color: string
}

export interface D3Props {
  xScale: ScaleLinear<number, number, never>
  yScale: ScaleLinear<number, number, never>
  xBand: ScaleBand<string>
  i: number
  d: Omit<PriceProps, 'color'>
  cb?: (x:number, y:number, price: D3Props['d']) => void
  svgHeight?: number
}