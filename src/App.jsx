import AdminPreview from './admin/AdminPreview'
import AsoEbiOrder from './components/AsoEbiOrder'
import Catalogue from './components/Catalogue'
import Deliveries from './components/Deliveries'
import FabricMarquee from './components/FabricMarquee'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Wholesale from './components/Wholesale'
import WhatsAppButton from './components/WhatsAppButton'
import { usePath } from './lib/router'
import { ProductsProvider } from './store/ProductsContext'

function Shop() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FabricMarquee />
        <Catalogue />
        <AsoEbiOrder />
        <Wholesale />
        <Deliveries />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default function App() {
  const path = usePath()
  const isAdmin = path.replace(/\/+$/, '') === '/admin'

  return <ProductsProvider>{isAdmin ? <AdminPreview /> : <Shop />}</ProductsProvider>
}
