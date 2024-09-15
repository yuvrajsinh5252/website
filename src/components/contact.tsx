"use client"

import { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to an API or email service)
    console.log("Form submitted", formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Contact Us
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block mb-2 text-gray-600">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Enter your name"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block mb-2 text-gray-600">Your Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Enter your email"
            />
          </div>

          {/* Message Input */}
          <div>
            <label className="block mb-2 text-gray-600">Your Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 h-32"
              placeholder="Enter your message"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white p-3 rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
