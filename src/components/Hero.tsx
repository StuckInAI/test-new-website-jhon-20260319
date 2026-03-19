import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-primary-500 to-primary-700 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">Discover the Latest Smartphones</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Explore our curated collection of flagship devices with unbeatable prices and exclusive deals.
        </p>
        <div className="space-x-4">
          <Link
            href="/products"
            className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 inline-block"
          >
            Shop Now
          </Link>
          <Link
            href="/#featured"
            className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 inline-block"
          >
            View Deals
          </Link>
        </div>
      </div>
    </section>
  );
}