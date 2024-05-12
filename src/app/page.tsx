import Heading from "@/components/Heading";
import type { Metadata } from 'next'
import HomeBanner from "@/components/HomeBanner";
import Products from "@/components/products/page";
import CategoryItems from "@/components/categories/CategoryItems";

export const metadata: Metadata = {
  title: 'Carry Home | Electronic Online Shop',
}

export default function Home() {
  return (
    <div >
       <CategoryItems/>
       <HomeBanner/>
       <Heading title="Products"/>
       <Products/>
    </div>
  )
}
