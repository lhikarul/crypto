interface KlineProps {
  openTime: number
  open: string
  high: string
  low: string
  close: string
  volume: string
}

enum KlineResponse {
  openTime = 0,
  open = 1,
  high = 2,
  low = 3,
  close = 4,
  volume = 5
}

export const getKlineObj = (data: any[]): KlineProps[] => {
  const klineData: KlineProps[] = []
  for (let i=0; i < data.length; i++) {
    const kline = data[i]
    klineData.push({
      openTime: kline[KlineResponse.openTime],
      open: kline[KlineResponse.open],
      high: kline[KlineResponse.high],
      low: kline[KlineResponse.low],
      close: kline[KlineResponse.close],
      volume: kline[KlineResponse.volume]
    })
  }
  return klineData
}

export const getDomain = (kline: KlineProps[]) : [number, number] => {
  return [Math.min(...kline.map((item) => +item.low)), Math.max(...kline.map(item => +item.high)) * 1.005]
}

export const downColor = '#f6465d'
export const upColor = '#0ecb81'