import React from 'react'
import Footer from '../components/Footer'
import process1 from '../assets/process1.jpg'
import { useNavigate } from 'react-router-dom'

const AboutUs = () => {
  const navigate = useNavigate()
  return (
    <section className="max-padd-container mt-5 w-full flex flex-col min-h-screen ">
      <div className="flex flex-col items-center flex-1">
        <h2 className="text-2xl font-bold mb-8 text-secondary">About Us</h2>
        <div className="w-full max-w-4xl bg-white p-10 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-10">
          <img
            src={process1}
            alt="About FoodSun"
             className="pizza-fade-in pizza-spin rounded-xl shadow-md w-full md:w-1/2 object-cover mb-6 md:mb-0"
          />
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-4 text-primary">Welcome to FoodSun!</h1>
              <p className="mb-4">
                <span className="font-semibold text-secondary">FoodSun</span> is a modern online food ordering system, bringing you a wonderful culinary experience with fresh, diverse dishes and fast delivery service. We are passionate about food and dedicated to delivering the best meals to your doorstep.
              </p>
              <p className="mb-4">
                <span className="font-semibold">Our Vision:</span> To become the leading food delivery platform in Vietnam, connecting people with their favorite meals anytime, anywhere.
              </p>
              <p className="mb-4">
                <span className="font-semibold">Our Values:</span> Quality, Freshness, Convenience, and Customer Satisfaction. We carefully select ingredients, work with trusted partners, and always listen to your feedback to improve our service.
              </p>
              <p className="mb-4">
                <span className="font-semibold">Our Team:</span> Our chefs are experienced, creative, and passionate about food. Our delivery staff are friendly and professional, ensuring your order arrives hot and on time.
              </p>
              <p className="mb-4">
                <span className="font-semibold">Why Choose FoodSun?</span>
                <ul className="list-disc ml-6 mt-2">
                  <li>Wide variety of cuisines: Vietnamese, Asian, Western, and more</li>
                  <li>Easy ordering process and secure payment</li>
                  <li>Fast delivery and real-time order tracking</li>
                  <li>Regular promotions and loyalty rewards</li>
                  <li>24/7 customer support</li>
                </ul>
              </p>
              <p className="mb-4">
                Our mission is to provide quality, convenient, and reasonably priced meals for every family. Thank you for trusting and choosing FoodSun!
              </p>
            </div>
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
              <ul>
                <li>Hotline: 123-456-7890</li>
                <li>Email: info@foodora.com</li>
                <li>Address: 123 Main Street, District 1, Ho Chi Minh City</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8 mb-8">
          <button
            onClick={() => navigate('/')}
            className="bg-primary text-secondary py-2 px-6 rounded-md hover:bg-primary-dark"
          >
            Back to Home
          </button>
        </div>
      </div>
      <Footer />
    </section>
  )
}

export default AboutUs