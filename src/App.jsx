import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Unprotected from './routes/seller/Unprotected'
import Protected from './routes/seller/Protected'
import SellerDashboard from './pages/seller/dashboard/SellerDashboard'
import SellerActivation from './pages/seller/activation/SellerActivation'
import SellerLogin from './pages/seller/login/SellerLogin'
import SellerSignUp from './pages/seller/signUp/SellerSignUp'
import Product from './pages/product/Product'
import useLoadApp from './hooks/useLoadApp'

function App() {

  const loading = useLoadApp()
  console.log(loading);

  return (
    <>
      <BrowserRouter>
        {/* <UserRoutes />
        <SellerRotes /> */}
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/products/:prodId' element={<Product />} />
          {/* ========== Unprotected Routes ======== */}
          <Route exact path='/seller/signup' element={
            <Unprotected>
              <SellerSignUp />
            </Unprotected>}
          />
          <Route exact path='/seller/login' element={
            <Unprotected>
              <SellerLogin />
            </Unprotected>}
          />
          <Route exact path='/seller/activation/:activationToken' element={
            <SellerActivation />}
          />
          {/* ========== Protected Routes ======== */}
          <Route exact path='/seller/dashboard' element={
            <Protected>
              <SellerDashboard />
            </Protected>}
          />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
