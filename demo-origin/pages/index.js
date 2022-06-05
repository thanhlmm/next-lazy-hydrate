import Layout from '../layouts/Main';
import PageIntro from '../components/page-intro';
import Featured from '../components/featured';
import WhyUs from '../components/whyus';
import ProductsFeatured from '../components/products-featured';
import Animation from '../components/animation';
import Subscribe from '../components/subscribe';
import Footer from '../components/footer';

const IndexPage = () => {
  return (
    <Layout>
      <PageIntro />
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