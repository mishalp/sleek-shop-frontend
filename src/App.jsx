import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Product from './pages/product/Product'
import SellerSignUp from './pages/sellerSignUp/SellerSignUp'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/products/:prodId' element={<Product />} />
          <Route exact path='/seller-signup' element={<SellerSignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
