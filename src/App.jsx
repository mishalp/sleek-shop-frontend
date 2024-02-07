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
import AllOrders from './pages/seller/allOrders/AllOrders'
import AllProducts from './pages/seller/allProducts/AllProducts'
import CreateProduct from './pages/seller/createProduct/CreateProduct'
import EditProduct from './pages/seller/editProduct/EditProduct'
import { useSellerVerifyQuery } from './app/services/seller'

function App() {

  const loading = useLoadApp()
  const { isLoading } = useSellerVerifyQuery()

  if (isLoading) return <p>Loading App</p>

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/products/:prodId' element={<Product />} />

          {/* ========== Seller Unprotected Routes ======== */}
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
          {/* ==========Seller Protected Routes ======== */}
          <Route exact path='/seller/dashboard' element={
            <Protected>
              <SellerDashboard />
            </Protected>}
          />
          <Route exact path='/seller/all-orders' element={
            <Protected>
              <AllOrders />
            </Protected>}
          />
          <Route exact path='/seller/all-products' element={
            <Protected>
              <AllProducts />
            </Protected>}
          />
          <Route exact path='/seller/create-product' element={
            <Protected>
              <CreateProduct />
            </Protected>}
          />
          <Route exact path='/seller/product/edit/:id' element={
            <Protected>
              <EditProduct />
            </Protected>}
          />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
