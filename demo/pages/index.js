import Layout from '../layouts/Main';
import PageIntro from '../components/page-intro';
// import ProductsFeatured from '../components/products-featured';
// import Footer from '../components/footer';
// import Subscribe from '../components/subscribe';
import lazyHydrate from 'next-lazy-hydrate';

const Featured = lazyHydrate(() => import(/* webpackChunkName: "featured" */'../components/featured'), { on: ['click'] });
const WhyUs = lazyHydrate(() => import(/* webpackChunkName: "whyus" */'../components/whyus'), { on: ['click'] });
const ProductsFeatured = lazyHydrate(() => import(/* webpackChunkName: "product-featured" */'../components/products-featured'), { on: ['click'] });
const Footer = lazyHydrate(() => import(/* webpackChunkName: "footer" */'../components/footer'), { on: ['click'] });
const Subscribe = lazyHydrate(() => import(/* webpackChunkName: "subscribe" */'../components/subscribe'), { on: ['click'] });

const IndexPage = () => {
  return (
    <Layout>
      <PageIntro /> {/** Leave this component as normal since it above the folde */}
      <Featured />
      <WhyUs />
      <ProductsFeatured />
      <Subscribe />
      <Footer />
    </Layout>
  )
}


export default IndexPage