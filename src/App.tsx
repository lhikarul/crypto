import React, { useState } from 'react'
import {Route, Link, Routes} from 'react-router-dom'
import {Layout, Typography, Space, Switch} from 'antd'

import { Navbar, Exchanges, Homepage, Cryptocurrencies, CryptoDetails, News, Jigsaw } from './components'
import Router from './router'
import getRandom from './utils/getRandom'
import './App.css'

const imageUrl = [
  'https://vd004-tiger-portal.dev.mppwr.com/static/media/15.9ecf49ba.jpg',
  'https://vd004-tiger-portal.dev.mppwr.com/static/media/6.e2224487.jpg',
  'https://vd004-tiger-portal.dev.mppwr.com/static/media/11.ae1570d8.jpg',
  'https://vd004-tiger-portal.dev.mppwr.com/static/media/14.66d0d132.jpg',
  'https://vd004-tiger-portal.dev.mppwr.com/static/media/9.8fd0b466.jpg'
]

const App = () => {
  const [imageUrlIdx, setImageUrlIdx] = useState(getRandom(0, 4))

  return (
    <div className='max-w-[1402px] mx-auto app'>
      <Router />
      {/* <Routes>
        <Route path="/" element={<Homepage />}></Route>
      </Routes> */}
      {/* <Router /> */}
      {/* <Jigsaw 
        imageUrl={imageUrl[imageUrlIdx]}
        onSuccess={() => console.log('success')}
        onError={() => {console.log('error')}}
        onReload={() => {
          if (imageUrlIdx >= 0 && imageUrlIdx < 4) {
            setImageUrlIdx(imageUrlIdx + 1)
          } else {
            setImageUrlIdx(imageUrlIdx - 1)
          }
        }}
      /> */}
      {/* <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<Homepage />}></Route>
              <Route path="/exchanges" element={<Exchanges />}></Route>
              <Route path="/cryptocurrencies" element={<Cryptocurrencies />}></Route>
              <Route path="/crypto/:coinId" element={<CryptoDetails />}></Route>
              <Route path="/news" element={<News />}></Route>
            </Routes>
          </div>
        </Layout>
        
        <div className="footer">
          <Typography.Title level={5} style={{color: 'white', textAlign: 'center'}}>
            Cryptoeverse <br />
            All rights reserve
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div> */}
    </div>
  )
}

export default App