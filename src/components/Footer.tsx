import Image from 'next/image';
import React from 'react';

export const Footer = () => {
  return (
    <footer className="main-footer-index3 bg-black text-slate-400">
      {/* Footer Logo */}
      <div
        className="footer-logo wow zoomIn animated flex items-center justify-center py-12 border-b-2 border-slate-200/60 w-[95%] mx-auto"
        data-wow-delay="0ms"
        data-wow-duration="1500ms"
        style={{ visibility: 'visible', animationDuration: '1500ms', animationDelay: '0ms', animationName: 'zoomIn' }}
      >
        <a href="#">
          <span>
            <Image
              src="/assets/ALMAHDI LOGO.png"
              alt="Almahdi Logo"
              className="w-[10vw] brightness-0 invert"
              width={100}
              height={100}
            />
          </span>
        </a>
      </div>

      {/* Footer Widgets */}
      <div className="w-full md:w-4/5 container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* First Column */}
          <div className="footer-widgets text-sm">
            <p>
              At Al-Mahdi Auto Parts Ltd, we are dedicated to providing top-quality automotive parts,
              specializing in commercial vehicles. As the sole distributor of Textar brake friction in
              Kenya, we bring world-class safety and reliability to the market. But we don’t stop there—
              our extensive product range covers all essential components to keep your fleet in top condition.
            </p>
            <a
              href="https://almahdi.splendidmedia.co.ke/cart"
              className="inline-block mt-4 px-6 py-2 bg-white text-black font-semibold hover:bg-gray-200"
            >
              SHOP NOW
            </a>
          </div>

          {/* Second Column: Quick Links */}
          <div className="footer-widgets">
            <h2 className="text-xl font-bold mb-4">Quick Link</h2>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-400">Home</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-400">About</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-400">Partners</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-400">Contact</a>
              </li>
            </ul>
          </div>

          {/* Third Column: Contact Info */}
          <div className="footer-widgets">
            <h2 className="text-xl font-bold mb-4">Contact us</h2>
            <p>Machakos Road, Railway Station, Mombasa Kenya</p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center">
                <i className="fa fa-phone-square mr-2"></i>
                <span>+254 798 889026</span>
              </li>
              <li className="flex items-center">
                <i className="fa fa-envelope mr-2"></i>
                <span>sales@al-mahdiautopartsltd.com</span>
              </li>
            </ul>
            {/* Social Links */}
            <ul className="footer-social flex space-x-4 mt-4">
              <li>
                <a
                  href="https://www.facebook.com/almahdiautopartsltd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-400"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/almahdiautopartsltd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-400"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-8 text-gray-400">
          © Almahdi All rights reserved. Designed by{' '}
          <a
            href="https://splendidmedia.co.ke"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200"
          >
            Splendid Media Limited
          </a>
        </div>
      </div>
    </footer>
  );
};

