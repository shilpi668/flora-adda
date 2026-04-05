import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* Hero Header */}
      <div className="bg-[#fbbf24] py-16 text-center">
        <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Contact Us</h1>
        <p className="text-lg text-gray-800 max-w-2xl mx-auto font-medium">
          Have a question or a custom requirement? Our team is always here to help you out.
        </p>
      </div>

      <div className="container mx-auto px-4 -mt-8 max-w-6xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          
          {/* Left Column: Contact Details */}
          <div className="bg-gray-900 text-white p-10 md:p-14 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Get in touch</h2>
              <p className="text-gray-400 mb-8 border-b border-gray-700 pb-8">
                Fill up the form and our team will get back to you within 24 hours.
              </p>

              <div className="flex flex-col gap-8">
                <div className="flex items-start gap-4">
                  <Phone className="text-[#fbbf24] mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-lg">Phone</h4>
                    <p className="text-gray-400">+91 98765 43210</p>
                    <p className="text-gray-400">+91 11 2345 6789</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="text-[#fbbf24] mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-lg">Email</h4>
                    <p className="text-gray-400">support@flora-partygift.com</p>
                    <p className="text-gray-400">corporate@flora-partygift.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="text-[#fbbf24] mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-lg">Head Office</h4>
                    <p className="text-gray-400">123 Celebration Avenue,<br />Mumbai, Maharashtra 400001</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Clock className="text-[#fbbf24] mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-lg">Working Hours</h4>
                    <p className="text-gray-400">Mon - Sun: 9:00 AM - 9:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="p-10 md:p-14">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Send us a message</h2>
            <form className="flex flex-col gap-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-600 mb-2">First Name</label>
                  <input type="text" placeholder="John" className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fbbf24] transition-all" />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-600 mb-2">Last Name</label>
                  <input type="text" placeholder="Doe" className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fbbf24] transition-all" />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-600 mb-2">Email Address</label>
                <input type="email" placeholder="john@example.com" className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fbbf24] transition-all" />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-600 mb-2">Message</label>
                <textarea rows="4" placeholder="How can we help you?" className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fbbf24] transition-all resize-none"></textarea>
              </div>

              <button type="button" className="px-8 py-3 bg-[#fbbf24] text-black font-bold rounded-md hover:bg-yellow-500 transition-colors w-full md:w-auto self-start mt-2">
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
