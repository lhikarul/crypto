import cx from 'classnames'
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import { useGetCryptosQuery } from "@/services/cryptoApi";

import TrendLine from '../../components/TrendLine'

import style from './currencyList.module.scss'

export const filterCoinList = ['USDT','HEX','USDC', 'BUSD','BIT','UST','WBTC','DAI','CRO']
interface Currency {
  uuid: string,
  price: number,
  marketCap: number,
  change: number,
  rank: number,
  name: string,
  iconUrl: string
  '24hVolume': string
  sparkline: string[]
  symbol: string
}

const CurrencyList = () => {
  const navigate = useNavigate()
  const {data: cryptoData, isFetching} = useGetCryptosQuery(30)
  const [cryptoList, setCryptoList] = useState(cryptoData?.data?.coins)
  
  useEffect(() => {
    const filteredData = cryptoData?.data?.coins.filter((coin: {symbol: string}) => !filterCoinList.includes(coin.symbol))
    setCryptoList(filteredData)
  }, [cryptoData?.data?.coins])

  if (isFetching) return <div>loading...</div>

  return <>
    <div className={cx(style.currencyList, 'w-[100%]')}>
      <table className="w-[100%]">
        <thead>
          <tr className="text-left">
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>24%</th>
            <th>Market Cap</th>
            <th>Volume(24h)</th>
            <th>trend</th>
            <th>trade</th>
          </tr>
        </thead>
        <tbody>
          {
            cryptoList?.map((crypto: Currency, index: number) => (
              <tr key={crypto.uuid} className='cursor-pointer'>
                <td>{index + 1}</td>
                <td className="cursor-pointer" onClick={() => navigate(`/currencies/${crypto.symbol}/${crypto.uuid}`)}>
                  <img className='w-[24px] h-[24px] mr-[5px] inline' src={crypto.iconUrl} />
                  <span>{crypto.name}</span> <span className="ml-[3px] text-[#808a9d]">{crypto.symbol}</span>
                </td>
                <td>{Number(crypto.price).toFixed(2)}</td>
                <td style={{color: Number(crypto.change) > 0 ? '#16c784': '#ea3943'}}>{Number(crypto.change).toFixed(2)}%</td>
                <td>{crypto.marketCap}</td>
                <td>{crypto['24hVolume']}</td>
                <td>
                  <TrendLine 
                    data={crypto.sparkline}
                  />
                </td>
                <td>
                  交易
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  </>
}

export default CurrencyList