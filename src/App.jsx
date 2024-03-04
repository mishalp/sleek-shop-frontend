import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/home/Home'
import SellerUnprotected from './routes/seller/Unprotected'
import SellerProtected from './routes/seller/Protected'
import SellerDashboard from './pages/seller/dashboard/SellerDashboard'
import SellerActivation from './pages/seller/activation/SellerActivation'
import SellerLogin from './pages/seller/login/SellerLogin'
import SellerSignUp from './pages/seller/signUp/SellerSignUp'
import Product from './pages/product/Product'
import useLoadApp from './hooks/useLoadApp'
import AllOrders from './pages/seller/allOrders/AllOrders'
import AllProducts from './pages/seller/allProducts/AllProducts'
import CreateProduct from './pages/seller/createProduct/CreateProduct'
import EditProduct from './pages/seller/editProduct/EditProduct'
import UserLogin from './pages/user/login/UserLogin'
import UserSignUp from './pages/user/signUp/UserSignUp'
import UserActivation from './pages/user/activation/UserActivation'
import Search from './pages/search/Search'
import Checkout from './pages/checkout/Checkout'
import Payment from './pages/payment/Payment'
import useScrollToTop from './hooks/useScrollToTop'

function App() {

  const loading = useLoadApp()
  useScrollToTop()
  return (
    <>
      <BrowserRouter >
        <Routes >
          {/* ========== User Routes ============ */}
          <Route exact path='/' element={<Home />} />
          <Route exact path='/products/:prodId' element={<Product />} />
          <Route exact path='/search/:search' element={<Search />} />
          <Route exact path='/checkout' element={<Checkout />} />
          <Route exact path='/payment' element={<Payment />} />

          {/* ========== Unprotected Routes ======== */}

          <Route exact path='/auth' >
            <Route index element={<Navigate to='login' />} />
            <Route exact path='seller' element={<SellerUnprotected />}>
              <Route index element={<Navigate to='login' />} />
              <Route exact path='login' element={<SellerLogin />} />
              <Route exact path='signup' element={<SellerSignUp />} />
            </Route>
            <Route exact path='user'>
              <Route index element={<Navigate to='login' />} />
              <Route exact path='login' element={<UserLogin />} />
              <Route exact path='signup' element={<UserSignUp />} />
            </Route>
          </Route>

          <Route exact path='/seller/activation/:activationToken' element={<SellerActivation />} />
          <Route exact path='/user/activation/:activationToken' element={<UserActivation />} />

          {/* ==========Seller Protected Routes ======== */}

          <Route exact path='/seller' element={<SellerProtected />}>
            <Route index element={<Navigate to='dashboard' />} />
            <Route exact path='dashboard' element={<SellerDashboard />} />
            <Route exact path='all-orders' element={<AllOrders />} />
            <Route exact path='all-products' element={<AllProducts />} />
            <Route exact path='create-product' element={<CreateProduct />} />
            <Route exact path='product/edit/:id' element={<EditProduct />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
