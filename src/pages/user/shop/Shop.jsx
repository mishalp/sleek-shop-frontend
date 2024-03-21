import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import ShopInfo from './ShopInfo'
import ShopProducts from './ShopProducts'
import { useParams } from 'react-router-dom'
import { useGetShopProdcutsQuery } from '@/app/services/products'

export default function Shop() {
    const { shopId } = useParams()
    const { data, isLoading, isError } = useGetShopProdcutsQuery(shopId)

    if (isLoading || isError) return null

    return (
        <div className='w-screen max-w-full bg-myprimary'>
            <Header />
            <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-4 md:min-h-[90vh] w-full mt-20 p-4 relative">
                <ShopInfo products={data.products} shopId={shopId} />
                <ShopProducts products={data.products} />
            </div>
            <Footer />
        </div>
    )
}
