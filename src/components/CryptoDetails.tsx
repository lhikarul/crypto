import HTMLReactParser from 'html-react-parser'
import {useParams} from 'react-router-dom'
import millify from 'millify'
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useState } from 'react';
import LineChart from './LineChart'

import {useGetCryptoDetailsQuery, useGetCryptoHistoryQuery} from '../services/cryptoApi'

const {Title, Text} = Typography
const {Option} = Select

const CryptoDetails = () => {
  const {coinId} = useParams()
  const [timeperiod, settimeperiod] = useState('7d')
  const {data, isFetching} = useGetCryptoDetailsQuery(coinId)
  const {data: coinHistory, isFetching: isCoinHistoryFetching} = useGetCryptoHistoryQuery({coinId, timeperiod})
  const cryptoDetails = data?.data?.coin

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.['24hVolume'] && millify(cryptoDetails?.['24hVolume'])}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  if (isFetching || isCoinHistoryFetching) return <div>Loading...</div>

  return (
    <div>
      <Col className="coin-detail-container">
        <Col className="coin-heading-container">
          <Title level={2} className="coin-name">
            {cryptoDetails?.name} ({cryptoDetails?.symbol}) Price
          </Title>
          <p>{cryptoDetails?.name} live price in US dollars. View valeu statistics, market cap and supply</p>
        </Col>
        <Select 
          defaultValue="7d" 
          className="select-timeperiod" 
          placeholder="Select Time Period"
          onChange={(value) => settimeperiod(value)}
        >
          {time.map((date) => <Option key={date}>{date}</Option>)}
        </Select>

        <LineChart 
          coinHistory={coinHistory} 
          currentPrice={millify(cryptoDetails.price)}
          coinName={cryptoDetails.name}
        />

        <Col className="stats-container">
          <Col className="coin-value-statistic">
            <Col className="coin-value-statistic-heading">
              <Title level={3} className="coin-detailes-heading">
                {cryptoDetails?.name} Value Statistics
              </Title>
              <p>
                An overview showing the stats of {cryptoDetails?.name}
              </p>
            </Col>
            {stats.map(({icon, title, value}) => (
              <Col className="coin-stats">
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>

          <Col className="coin-value-info">
            <Col className="coin-value-statistic-heading">
              <Title level={3} className="coin-detailes-heading">
                Other Statistic
              </Title>
              <p>
                An overview showing the stats of all cryptocurrencies
              </p>
            </Col>
            {genericStats.map(({icon, title, value}) => (
              <Col className="coin-stats">
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>
        </Col>

        <Col className="coin-desc-link">
          <Row className="coin-desc">
            <Title level={3} className="coin-details-heading">
              What is {cryptoDetails.name}
              {HTMLReactParser(cryptoDetails.description)}
            </Title>
          </Row>
          <Col className="coin-links">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails.name} Links
            </Title>
            {cryptoDetails.links.map((link: {name: string, type: string, url: string}) => (
              <Row className="coin-link" key={link.name}>
                <Title level={5} className="link-name">
                  {link.type}
                </Title>
                <a href={link.url} target="_blank">{link.name}</a>
              </Row>
            ))}
          </Col>
        </Col>
      </Col>
    </div>
  )
}

export default CryptoDetails