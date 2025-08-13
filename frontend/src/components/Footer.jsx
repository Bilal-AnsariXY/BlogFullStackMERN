import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-100 to-gray-200 border-t border-gray-300 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Top Grid Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm text-gray-700">
          {/* Products */}
          <div>
            <h3 className="font-semibold mb-3 text-gray-900">Products</h3>
            <ul className="space-y-1">
              {["Flutter", "React", "Android", "iOS"].map((item) => (
                <li
                  key={item}
                  className="hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Design to code */}
          <div>
            <h3 className="font-semibold mb-3 text-gray-900">Design to code</h3>
            <ul className="space-y-1">
              {["Figma plugin", "Templates"].map((item) => (
                <li
                  key={item}
                  className="hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Comparison */}
          <div>
            <h3 className="font-semibold mb-3 text-gray-900">Comparison</h3>
            <ul className="space-y-1">
              {[
                "DhiWise vs Anima",
                "DhiWise vs Appsmith",
                "DhiWise vs FlutterFlow",
                "DhiWise vs Monday Hero",
                "DhiWise vs Retool",
                "DhiWise vs Bubble",
                "DhiWise vs Figma Dev Mode",
              ].map((item) => (
                <li
                  key={item}
                  className="hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-3 text-gray-900">Company</h3>
            <ul className="space-y-1">
              {[
                "About Us",
                "Contact Us",
                "Career",
                "Terms of Service",
                "Privacy Policy",
              ].map((item) => (
                <li
                  key={item}
                  className="hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t border-gray-300 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500">
          {/* Logo */}
          <div className="font-extrabold text-lg text-gray-800 tracking-wide flex items-center gap-1">
            BA <span className="text-blue-600">Blog</span>
          </div>

          {/* Copyright */}
          <div className="mt-2 sm:mt-0 text-center">
            © {new Date().getFullYear()} DhiWise PVT. LTD. All rights reserved
          </div>

          {/* Social Icons */}
          <div className="flex space-x-5 mt-2 sm:mt-0 text-gray-700 text-lg">
            {[
              { Icon: FaGithub, link: "https://github.com" },
              { Icon: FaLinkedin, link: "https://linkedin.com" },
              { Icon: FaInstagram, link: "https://instagram.com" },
            ].map(({ Icon, link }, i) => (
              <a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors duration-300"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
