import Layout from '../layouts/Main';
import PageIntro from '../components/page-intro';
import Featured from '../components/featured';
import WhyUs from '../components/whyus';
import ProductsFeatured from '../components/products-featured';
import Footer from '../components/footer';
import Subscribe from '../components/subscribe';
import withHydrationOnDemand from "react-hydration-on-demand";

const FeaturedOnDemand = withHydrationOnDemand({ on: ["visible"] })(
  Featured
);
const WhyUsOnDemand = withHydrationOnDemand({ on: ["visible"] })(
  WhyUs
);
const ProductsFeaturedOnDemand = withHydrationOnDemand({ on: ["visible"] })(
  ProductsFeatured
);
const FooterOnDemand = withHydrationOnDemand({ on: ["visible"] })(
  Footer
);
const SubscribeOnDemand = withHydrationOnDemand({ on: ["visible"] })(
  Subscribe
);

const IndexPage = () => {
  return (
    <Layout>
      <PageIntro /> {/** Leave this component as normal since it above the folde */}
      <FeaturedOnDemand />
      <WhyUsOnDemand />
      <ProductsFeaturedOnDemand />
      <SubscribeOnDemand />
      <FooterOnDemand />
    </Layout>
  )
}


export default IndexPage