import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("All fields are required!");
      return;
    }

    toast.loading("Sending...");

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "cdfd370d-f1fc-4ce5-b97d-704638c26eed",
        ...formData,
      }),
    });

    const result = await res.json();
    toast.dismiss(); // remove "Sending..." toast

    if (result.success) {
      toast.success("Message sent successfully ✅");
      setFormData({ name: "", email: "", message: "" });
    } else {
      toast.error("Something went wrong ❌");
    }
  };

  return (
    <section className="bg-gradient-to-b from-gray-100 to-gray-200 py-10 px-3 sm:px-6">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 text-gray-800">
          Contact Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 text-sm sm:text-base">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="3"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-2.5 rounded-lg hover:bg-gray-800 transition"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="flex flex-col justify-center space-y-4 text-sm sm:text-base text-gray-700">
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-red-500" /> <span>+91 839399....</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-pink-500" />
              <span>bilalansarixyz@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-green-500" />
              <span>Dheradun, India</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
