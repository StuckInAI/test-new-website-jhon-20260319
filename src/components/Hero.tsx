export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to Our Modern Landing Page
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
          Built with Next.js, TypeScript, and Tailwind CSS. Fast, responsive, and ready for production.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            className="bg-white text-primary-700 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition duration-300"
            onClick={() => alert('Get Started clicked!')}
          >
            Get Started
          </button>
          <button
            className="bg-transparent border-2 border-white hover:bg-white hover:text-primary-700 font-semibold py-3 px-8 rounded-lg transition duration-300"
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Contact Us
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </section>
  )
}