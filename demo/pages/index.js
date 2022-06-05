import Layout from '../layouts/Main';
import PageIntro from '../components/page-intro';
import Featured from '../components/featured';
// import ProductsFeatured from '../components/products-featured';
// import Footer from '../components/footer';
// import Subscribe from '../components/subscribe';
import lazyHydrate from 'next-lazy-hydrate';

const WhyUs = lazyHydrate(() => import(/* webpackChunkName: "whyus" */'../components/whyus'));
const ProductsFeatured = lazyHydrate(() => import(/* webpackChunkName: "product-featured" */'../components/products-featured'));
const Subscribe = lazyHydrate(() => import(/* webpackChunkName: "subscribe" */'../components/subscribe'));
const Animation = lazyHydrate(() => import(/* webpackChunkName: "animation" */'../components/animation'));
const Footer = lazyHydrate(() => import(/* webpackChunkName: "footer" */'../components/footer'));

const IndexPage = () => {
  return (
    <Layout>
      <PageIntro /> {/** Leave this component as normal since it above the folde */}
      <Featured />
      <WhyUs />
      <ProductsFeatured />
      <Animation />
      <Subscribe />
      <Footer />
    </Layout>
  )
}


export default IndexPage