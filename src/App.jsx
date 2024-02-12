import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
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

function App() {

  const loading = useLoadApp()
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/products/:prodId' element={<Product />} />

          {/* ========== Unprotected Routes ======== */}

          <Route exact path='/auth' >
            <Route index element={<Navigate to='login' />} />
            <Route exact path='seller' element={<SellerUnprotected />}>
              <Route index element={<Navigate to='login' />} />
              <Route exact path='login' element={<SellerLogin />} />
              <Route exact path='signup' element={<SellerSignUp />} />
            </Route>
          </Route>

          <Route exact path='/seller/activation/:activationToken' element={<SellerActivation />} />

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
