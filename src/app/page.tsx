import Heading from "@/components/Heading";
import HomeBanner from "@/components/HomeBanner";
import Products from "@/components/products/page";
import CategoryItems from "@/components/categories/CategoryItems";

 
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
