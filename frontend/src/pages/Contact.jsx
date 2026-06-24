import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, AlertCircle } from 'lucide-react';
import { contactService } from '../services/contactService';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'Product Inquiry',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    let inquiryType = 'GENERAL';
    if (form.department === 'Product Inquiry') inquiryType = 'PRODUCT_INQUIRY';
    else if (form.department === 'Vendor Partnership Request') inquiryType = 'VENDOR_PARTNERSHIP';

    const payload = {
      senderName: form.name,
      email: form.email,
      phone: form.phone,
      subject: form.subject,
      message: form.message,
      inquiryType
    };

    try {
      await contactService.submitContactForm(payload);
      setSubmitted(true);
      setForm({
        name: '',
        email: '',
        phone: '',
        department: 'Product Inquiry',
        subject: '',
        message: ''
      });
    } catch (err) {
      console.error('Failed to send message:', err);
      setError('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
      
      {/* Overview */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-black font-heading text-primary">Contact Us</h1>
        <p className="text-neutral-600 leading-relaxed text-lg">
          Get in touch with our departmental units. We look forward to hearing from you.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Office Details */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-6">
            <h2 className="text-2xl font-bold font-heading text-primary">Headquarters</h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-sm text-neutral-600">
                <MapPin className="w-5 h-5 text-accent shrink-0" />
                <div>
                  <p className="font-bold text-neutral-800">Addis Ababa Office</p>
                  <p>Bole Sub-city, Ward 03, House 405</p>
                  <p>Near Bole International Airport, Addis Ababa, Ethiopia</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-sm text-neutral-600">
                <Phone className="w-5 h-5 text-accent" />
                <span>+251 11 663 4567 / +251 911 234567</span>
              </div>

              <div className="flex items-center space-x-3 text-sm text-neutral-600">
                <Mail className="w-5 h-5 text-accent" />
                <span>info@synergypharma.com.et</span>
              </div>

              <div className="flex items-start space-x-3 text-sm text-neutral-600">
                <Clock className="w-5 h-5 text-accent shrink-0" />
                <div>
                  <p className="font-bold text-neutral-800">Working Hours</p>
                  <p>Monday - Friday: 8:30 AM - 5:30 PM (EAT)</p>
                  <p>Saturday: 8:30 AM - 12:30 PM (EAT)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map */}
          <div className="h-64 bg-neutral-200 rounded-3xl border border-neutral-300 overflow-hidden flex items-center justify-center text-neutral-400 relative">
            <iframe
              title="Synergy Pharma Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15761.54737227497!2d38.783100!3d9.027000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cefc3e0d8b%3A0xc3b7d1565eab9b1!2sBole%20International%20Airport!5e0!3m2!1sen!2set!4v1689264875000!5m2!1sen!2set"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold font-heading text-primary">Send a Message</h2>
          
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <span className="inline-block p-3 bg-green-100 text-green-500 rounded-full">
                <Send className="w-8 h-8 animate-pulse" />
              </span>
              <h3 className="text-lg font-bold text-primary font-heading">Message Sent Successfully</h3>
              <p className="text-sm text-neutral-600">Our support staff will route your message to the appropriate department and respond shortly.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-primary text-white font-semibold py-2 px-6 rounded-xl text-sm"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-600">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full border border-neutral-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Full name"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-600">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full border border-neutral-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Email address"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-600">Department</label>
                <select
                  className="w-full border border-neutral-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                >
                  <option>Product Inquiry</option>
                  <option>Vendor Partnership Request</option>
                  <option>General Questions</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-600">Subject</label>
                <input
                  type="text"
                  required
                  className="w-full border border-neutral-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Inquiry topic"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-600">Message</label>
                <textarea
                  rows="4"
                  required
                  className="w-full border border-neutral-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Write your query details here..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-light text-white py-3 rounded-xl font-bold transition flex items-center justify-center gap-1.5 shadow-sm text-sm disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
