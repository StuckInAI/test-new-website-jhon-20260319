export default function Promotions() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Free Shipping</h3>
          <p>On all orders over $999. No code required.</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">30-Day Returns</h3>
          <p>Hassle-free returns within 30 days of purchase.</p>
        </div>
      </div>
    </section>
  );
}