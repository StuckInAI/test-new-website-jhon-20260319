export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">PhoneStore</h3>
            <p>Your trusted destination for the latest smartphones.</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/products" className="hover:text-primary-500">
                  Products
                </a>
              </li>
              <li>
                <a href="/cart" className="hover:text-primary-500">
                  Cart
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-primary-500">
                  Dashboard
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <p>support@phonestore.com</p>
            <p>+1 234 567 890</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} PhoneStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}