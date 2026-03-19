const features = [
  {
    title: 'Next.js 14',
    description: 'Leverage the latest Next.js features including App Router, server components, and optimized performance.',
    icon: '⚡',
  },
  {
    title: 'TypeScript',
    description: 'Full TypeScript support for type-safe development and better developer experience.',
    icon: '📘',
  },
  {
    title: 'Tailwind CSS',
    description: 'Utility-first CSS framework for rapid UI development with responsive design.',
    icon: '🎨',
  },
  {
    title: 'SQLite Database',
    description: 'Lightweight SQLite database with TypeORM for data persistence in contact forms.',
    icon: '💾',
  },
  {
    title: 'Docker Ready',
    description: 'Pre-configured Dockerfile for easy deployment on platforms like Coolify.',
    icon: '🐳',
  },
  {
    title: 'SEO Optimized',
    description: 'Built-in SEO with meta tags, Open Graph, and semantic HTML for better search visibility.',
    icon: '🔍',
  },
]

export default function Features() {
  return (
    <section className="py-20 px-4 md:px-8 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          Features Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}