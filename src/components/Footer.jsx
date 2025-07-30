import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1F2937] text-white py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: Logo & Tagline */}
        <div>
          <h2 className="text-2xl font-bold text-[#4F46E5]">Spacer</h2>
          <p className="mt-2 text-gray-400">
            Find, book, or list flexible work and event spaces anywhere.
          </p>
        </div>

        {/* Column 2: Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-[#06B6D4]">Quick Links</h3>
          <ul className="text-gray-400 space-y-2">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="#features" className="hover:text-white">Features</a></li>
            <li><a href="#testimonials" className="hover:text-white">Testimonials</a></li>
          </ul>
        </div>

        {/* Column 3: Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-[#06B6D4]">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-[#3B82F6]"><FaFacebook size={20} /></a>
            <a href="#" className="hover:text-[#3B82F6]"><FaTwitter size={20} /></a>
            <a href="#" className="hover:text-[#3B82F6]"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-[#3B82F6]"><FaLinkedin size={20} /></a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="text-center text-gray-400 mt-10 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} Spacer. All rights reserved.
      </div>
    </footer>
  );
}
