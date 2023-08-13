import Image from 'next/image'
import Navbar from './components/Navbar'
import FeaturedBio from './components/Biodata/FeaturedBio'
import FeaturedRent from './components/Rent/FeaturedRent'
import FeaturedSales from './components/Sales/FeaturedSales'

export default function Home() {
  return (
    <div className='max-w-screen-2xl mx-auto min-h-screen'>
      <Navbar />
      <div>
        <FeaturedBio />
      </div>
      <div>
        <FeaturedRent />
      </div>
      <div>
        <FeaturedSales />
      </div>
    </div>
  )
}
