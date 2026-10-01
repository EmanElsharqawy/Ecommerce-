import PageLayout from "@/app/component/PageLayout";
import Slider from "@/app/component/slider";
import Topcategory from "@/app/component/topcatogry";
import About from "@/app/component/about";
import TopRated from"@/app/component/topRated"
import Featured from"@/app/component/featuredProduct"
import Navbar from "@/app/component/navbar"
import Groceries from './component/groceriesProduct';
import Footer from "./component/footer";
import Header from "./component/header";
export default function Home() {
  return (
    <PageLayout>
  <Navbar />
      <Header />
      <section className="w-full bg-[#f0f0f0]">
        <Slider />
        <Topcategory />
      </section>
    <section className="w-full bg-white ">
 
     <TopRated/>
      <About />
      <Featured/>
      <Groceries/>
     
      </section>
      <Footer/>
    </PageLayout>
  );
}