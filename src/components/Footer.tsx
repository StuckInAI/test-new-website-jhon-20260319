export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold">Landing Page App</h3>
            <p className="text-gray-400 mt-2">Built with Next.js & TypeScript</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
            <p className="text-gray-400 mt-2">Deployable on Coolify with Docker</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>This is a sample fullstack landing page application for demonstration purposes.</p>
          <p className="mt-2">Database: SQLite | ORM: TypeORM | Styling: Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}