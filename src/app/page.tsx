import type { Metadata } from 'next'
import HomeBanner from "@/components/HomeBanner";
import Categories from "@/components/categories/page";
import Footer from '@/components/footer/Footer';


export const metadata: Metadata = {
  title: 'Carry Home | Electronic Online Shop',
}

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div >
       <HomeBanner/>
       <Categories/>
       <div className='mt-9'>
          <Footer/>
       </div>
    </div>
  )
}
