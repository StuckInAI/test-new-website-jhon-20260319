const categories = [
  { name: 'Flagship', count: 12 },
  { name: 'Mid-Range', count: 8 },
  { name: 'Budget', count: 15 },
  { name: 'Gaming', count: 5 },
  { name: 'Camera', count: 7 },
  { name: 'Battery', count: 9 },
];

export default function Categories() {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold text-lg mb-2">{cat.name}</h3>
              <p className="text-gray-600">{cat.count} products</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}