import { lazy, Suspense } from "react";
import {Route, Routes} from 'react-router-dom'

const ROUTES = [
  {
    path: '/',
    component: lazy(() => import('../views/Home'))
  },
  {
    path: '/currencies/:symbol/:coinId',
    component: lazy(() => import('../views/CurrenciesDetail'))
  }
]

const Router = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        {
          ROUTES.map(({path, component: Component, ...rest}) => (
            <Route key={`route=${path}`} path={path} element={<Component />} {...rest}  />
          ))
        }
      </Routes>
    </Suspense>
  )
}

export default Router