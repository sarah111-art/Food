import React, { useState } from 'react'
import Footer from '../components/Footer'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const navigate = useNavigate()
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    try {
      // Gửi dữ liệu về backend (bạn cần tạo route /api/contact ở backend)
      await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/contact', form)
      toast.success('Your message has been sent to admin!')
      setForm({ name: '', email: '', message: '' })
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    }
    setSending(false)
  }

  return (
    <section className="max-padd-container mt-5 w-full">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-8 text-secondary">Contact Us</h2>
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          {/* Form Contact */}
          <form className="mb-8" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Name</label>
              <input
                id="name"
                type="text"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                placeholder="Your name"
                required
                value={form.name}
                onChange={handleChange}
                disabled={sending}
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
                value={form.email}
                onChange={handleChange}
                disabled={sending}
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
                value={form.message}
                onChange={handleChange}
                disabled={sending}
              ></textarea>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-secondary text-white py-2 px-6 rounded-md hover:bg-primary-dark"
                disabled={sending}
              >
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
          
          {/* Google Map Embed */}
          <div className="w-full h-64 bg-secondary-200 rounded-lg mb-5">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d31348.650697239955!2d106.76172755217347!3d10.843316599606624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sPizza%20Hut!5e0!3m2!1sen!2s!4v1748179867636!5m2!1sen!2s"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
              title="Google Map"
            ></iframe>
          </div>
        </div>
      </div>
             <div className="flex justify-center mt-4">
            <button
              onClick={() => navigate('/')}
              className="bg-primary text-secondary py-2 px-6 rounded-md hover:bg-primary-dark"
            >
              Back to Home
            </button>
          </div>
      <Footer/>
    </section>
  )
}

export default Contact