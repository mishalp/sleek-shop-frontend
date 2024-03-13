import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import SellerUnprotected from '@/routes/seller/Unprotected'
import SellerProtected from '@/routes/seller/Protected'
import UserProtected from '@/routes/user/Protected'
import UserUnProtected from '@/routes/user/UnProtected'
import SellerDashboard from '@/pages/seller/dashboard/SellerDashboard'
import SellerActivation from '@/pages/seller/activation/SellerActivation'
import SellerLogin from '@/pages/seller/login/SellerLogin'
import SellerSignUp from '@/pages/seller/signUp/SellerSignUp'
import useLoadApp from '@/hooks/useLoadApp'
import AllOrders from '@/pages/seller/allOrders/AllOrders'
import AllProducts from '@/pages/seller/allProducts/AllProducts'
import CreateProduct from '@/pages/seller/createProduct/CreateProduct'
import EditProduct from '@/pages/seller/editProduct/EditProduct'
import UserLogin from '@/pages/user/login/UserLogin'
import UserSignUp from '@/pages/user/signUp/UserSignUp'
import UserActivation from '@/pages/user/activation/UserActivation'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Order from '@/pages/seller/order/Order'
import UserOrder from '@/pages/user/orders/Order'
import Home from '@/pages/user/home/Home'
import Product from '@/pages/user/product/Product'
import Search from '@/pages/user/search/Search'
import Checkout from '@/pages/user/checkout/Checkout'
import Payment from '@/pages/user/payment/Payment'
import Profile from '@/pages/user/profile/Profile'
import Orders from '@/pages/user/orders/Orders'
import ChangePass from '@/pages/user/changePass/ChangePass'
import Address from './pages/user/address/Address'

const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_PUBLISH_KEY}`);

function App() {

  useLoadApp()

  return (
    <>
      <BrowserRouter >
        <Elements stripe={stripePromise}>
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
              <Route exact path='user' element={<UserUnProtected />}>
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
              <Route exact path='order/:orderId' element={<Order />} />
              <Route exact path='create-product' element={<CreateProduct />} />
              <Route exact path='product/edit/:id' element={<EditProduct />} />
            </Route>

            {/*====================== User Protected route =====================*/}
            <Route exact path='/user' element={<UserProtected />}>
              <Route index element={<Navigate to='profile' />} />
              <Route exact path='profile' element={<Profile />} />
              <Route exact path='orders' element={<Orders />} />
              <Route exact path='orders/:orderId' element={<UserOrder />} />
              <Route exact path='change-password' element={<ChangePass />} />
              <Route exact path='address' element={<Address />} />
            </Route>
          </Routes>
        </Elements>
      </BrowserRouter>
    </>
  )
}

export default App
