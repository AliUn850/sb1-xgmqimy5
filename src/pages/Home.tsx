import Hero from '../components/Hero';
import ProductInfo from '../components/ProductInfo';
import PricingSection from '../components/PricingSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ProductInfo />
      <PricingSection />
    </div>
  );
}