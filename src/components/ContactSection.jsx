// ContactSection.jsx

import React from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const ContactSection = () => {
  const CONTACT_INFO = [
    { 
      title: "Email Address", 
      icon: Mail, 
      details: "hello@delivery.co.uk", 
      type: 'email' 
    },
    { 
      title: "Phone Number", 
      icon: Phone, 
      details: "+44 (0)20 1234 5678", 
      type: 'phone' 
    },
    { 
      title: "WhatsApp Chat", 
      icon: Send, 
      details: "+44 (0)77 1234 5678", 
      type: 'whatsapp' 
    },
  ];

  const OPENING_HOURS = [
    { day: "Monday - Thursday", hours: "11:00 AM - 10:00 PM" },
    { day: "Friday - Saturday", hours: "11:00 AM - 11:30 PM" },
    { day: "Sunday", hours: "12:00 PM - 9:00 PM" },
  ];

  const ADDRESS = "14 Fake Street, Anytown, AB1 2CD, United Kingdom";

  return (
    <section id="contact" className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto">
        
        <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-4">
          Get In Touch
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
          We're here to answer any questions you have. Contact us via phone, email, or visit us directly.
        </p>

        {/* Contact Cards and Opening Hours */}
        <div className="grid lg:grid-cols-5 gap-8 mb-16">
          
          {/* Contact Cards */}
          <div className="lg:col-span-3 grid md:grid-cols-3 gap-6">
            {CONTACT_INFO.map((item, index) => (
              <div 
                key={index} 
                className="bg-red-50 dark:bg-zinc-800 p-6 rounded-lg shadow-lg border-t-4 border-red-600 hover:shadow-xl transition duration-300"
              >
                <item.icon className="w-8 h-8 text-red-600 mb-3" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 font-medium">
                  {item.details}
                </p>
                <a 
                  href={
                    item.type === 'email' 
                      ? `mailto:${item.details}` 
                      : item.type === 'phone' 
                      ? `tel:${item.details.replace(/\s/g, '')}` 
                      : `https://wa.me/${item.details.replace(/\s/g, '').replace('+', '')}`
                  }
                  className="mt-3 inline-block text-sm text-red-600 hover:text-red-800 font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.type === 'email' ? 'Send Email' : item.type === 'phone' ? 'Call Now' : 'Chat Now'} →
                </a>
              </div>
            ))}
          </div>

          {/* Opening Hours */}
          <div className="lg:col-span-2 bg-red-50 dark:bg-zinc-800 p-6 rounded-lg shadow-lg border-l-4 border-red-600">
            <div className="flex items-center mb-4">
              <Clock className="w-7 h-7 text-red-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Opening Hours</h3>
            </div>
            
            <ul className="space-y-3">
              {OPENING_HOURS.map((item, index) => (
                <li key={index} className="flex justify-between border-b border-gray-200 dark:border-zinc-700 pb-2">
                  <span className="text-gray-700 dark:text-gray-300">{item.day}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{item.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Location and Google Maps */}
        <div className="border-t pt-16 border-gray-200 dark:border-zinc-700">
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <MapPin className="w-6 h-6 text-red-600 mr-3" />
                Our Location
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{ADDRESS}</p>

            {/* Google Maps Embed */}
            <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-xl">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.123456789!2d-0.12775868412345!3d51.50735087912345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761bcd12345678%3A0x123456789abcdef!2s14+Fake+Street!5e0!3m2!1sen!2suk!4v1234567890123!5m2!1sen!2suk" 
                    width="100%" 
                    height="100%" 
                    style={{border:0}} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
