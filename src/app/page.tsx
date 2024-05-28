import type { Metadata } from 'next'
import HomeBanner from "@/components/HomeBanner";
import ItemListByCategory from '@/components/ItemListByCategory';
import Footer from '@/components/footer/Footer';

export const metadata: Metadata = {
  title: 'Carry Home | Electronic Online Shop',
  openGraph: {
    images: "https://res.cloudinary.com/dlnjktcii/image/upload/v1716801346/ra2qf4rg2g8oydvxkhex.png" // Helps sharing of webpages on social media.
  },
}

export const dynamic = "force-dynamic";

const Home = () => {
  return (
    <div >
       <HomeBanner/>
       <ItemListByCategory/>
       <div className='mt-9'>
          <Footer/>
       </div>
    </div>
  )
}
export default Home;
