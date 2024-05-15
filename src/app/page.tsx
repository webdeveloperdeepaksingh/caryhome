import type { Metadata } from 'next'
import HomeBanner from "@/components/HomeBanner";
import Categories from "@/components/categories/page";


export const metadata: Metadata = {
  title: 'Carry Home | Electronic Online Shop',
}

export default function Home() {
  return (
    <div >
       <HomeBanner/>
       <Categories/>
    </div>
  )
}
