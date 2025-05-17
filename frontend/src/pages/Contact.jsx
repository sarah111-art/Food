import React from 'react'
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <section className="max-padd-container mt-24">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-8 text-secondary">Contact Us</h2>
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          {/* Form Contact */}
          <form className="mb-8">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Name</label>
              <input
                id="name"
                type="text"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                placeholder="Your name"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                placeholder="Your email"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700">Message</label>
              <textarea
                id="message"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                placeholder="Your message"
                rows="4"
                required
              ></textarea>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-secondary text-white py-2 px-6 rounded-md hover:bg-primary-dark"
              >
                Send Message
              </button>
            </div>
          </form>
          
          {/* Google Map Embed */}
          <div className="w-full h-64 bg-secondary-200 rounded-lg mb-5">
            <iframe
              src="https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=restaurant+name+or+address"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer/>
    </section>
  )
}

export default Contact;
