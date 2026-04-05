import React from 'react';
import { Package, CreditCard, Award, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#10141b] text-white pt-12 pb-6 mt-auto">
      <div className="container mx-auto px-4">
        
        {/* Top Section - Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1 */}
          <div className="bg-[#ff5e00] rounded-lg p-6 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-white p-2 rounded-md">
                <Package className="text-[#ff5e00]" size={24} strokeWidth={2.5} />
              </div>
              <h3 className="font-bold text-lg">Fast Delivery</h3>
            </div>
            <p className="text-white/90 text-[14px]">
              Delivery within 2-3 hours in the city
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#ff5e00] rounded-lg p-6 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-white p-2 rounded-md">
                <CreditCard className="text-[#ff5e00]" size={24} strokeWidth={2.5} />
              </div>
              <h3 className="font-bold text-lg">Secure Payment</h3>
            </div>
            <p className="text-white/90 text-[14px]">
              We accept all types of payments
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#ff5e00] rounded-lg p-6 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-white p-2 rounded-md">
                <Award className="text-[#ff5e00]" size={24} strokeWidth={2.5} />
              </div>
              <h3 className="font-bold text-lg">Quality Guaranteed</h3>
            </div>
            <p className="text-white/90 text-[14px]">
              Premium quality gifts and verified products
            </p>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-[#1e2736] mb-10" />

        {/* Middle Section - Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1 */}
          <div>
            <h4 className="font-bold text-[15px] mb-5">About Company</h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-bold text-[15px] mb-5">For Customers</h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Delivery</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Payment</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-bold text-[15px] mb-5">Help</h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Reviews</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-bold text-[15px] mb-5">Contact</h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-gray-500" />
                <span>+7 (800) 123-45-67</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-gray-500" />
                <span>info@flora.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-gray-500 mt-0.5 shrink-0" />
                <span>Moscow, Sample St., 1</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section - Copyright */}
        <div className="text-center text-sm text-gray-500 pt-6 border-t border-[#1e2736]">
          © 2026 Flora. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
