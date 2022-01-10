import {Select, Typography, Row, Col, Avatar, Card} from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useGetCryptosQuery } from '../services/cryptoApi'

import {useGetCryptoNewsQuery} from '../services/cryptoNewsApi'

const {Text, Title} = Typography
const {Option} = Select
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg'

const News = ({simplified}: {simplified?: boolean}) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  const {data: cryptoNews} = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12
  })
  const {data: cryptosList} = useGetCryptosQuery(100)

  if (!cryptoNews?.value) return <div>'Loading... '</div>

  return (
    <Row gutter={[24, 24]}>
      {
        !simplified && (
          <Col span={24}>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a Crypto"
              optionFilterProp="children"
              onChange={(value) => setNewsCategory(value)}
              filterOption
            >
              <Option value="Cryptocurrency">Cryptocurrency</Option>
              {cryptosList?.data?.coins.map(((coin: any) => <Option value={coin.name}>{coin.name}</Option>))}
            </Select>
          </Col>
        )
      }
      {
        cryptoNews.value.map((news: any, i: number) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>{news.name}</Title>
                  <img 
                    style={{maxWidth: '200px', maxHeight: '100px'}}
                    src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news"
                  />
                </div>
                <p>
                  {news.description > 100 
                    ? `${news.description.substring(0, 100)}...`
                    : news.description
                  }
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage}/>
                    <Text className="providername">{news.provider[0]?.name}</Text>
                  </div>
                  <Text>{news.datePublished}</Text>
                </div>
              </a>
            </Card>
          </Col>
        ))
      }
    </Row>
  )
}

export default News