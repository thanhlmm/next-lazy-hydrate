import Layout from '../layouts/Main';
import PageIntro from '../components/page-intro';
import Featured from '../components/featured';
import WhyUs from '../components/whyus';
import ProductsFeatured from '../components/products-featured';
import Footer from '../components/footer';
import Subscribe from '../components/subscribe';

const IndexPage = () => {
  return (
    <Layout>
      <PageIntro />
      <Featured />
      <WhyUs />
      <ProductsFeatured />
      <Subscribe />
      <Footer />
    </Layout>
  )
}


export default IndexPage