import {Card, Row, Col, Input} from 'antd'
import millify from 'millify'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import {useGetCryptosQuery} from '../services/cryptoApi'

interface Currency {
  uuid: string,
  price: number,
  marketCap: number,
  change: number,
  rank: number,
  name: string,
  iconUrl: string
}

const Cryptocurrencies = ({simplified}: {simplified?: boolean}) => {
  const count = simplified ? 10 : 100
  const {data: cryptosList, isFetching} = useGetCryptosQuery(count)
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins)
  const [searchTerm, setsearchTerm] = useState('')

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins)
    const filteredData = cryptosList?.data?.coins.filter((coin: {name: string}) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setCryptos(filteredData)
  }, [cryptosList, searchTerm])

  if (isFetching) return <div>Loading...</div>

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input 
            placeholder="Search Cryptocurrency"
            onChange={(e) => setsearchTerm(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-containers">
        {cryptos?.map((currency: Currency) => (
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card 
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies