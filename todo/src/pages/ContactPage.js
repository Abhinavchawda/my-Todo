import React from 'react';
import NavBar from '../features/ui/NavBar';
import { Link } from 'react-router-dom';
import Footer from '../features/ui/Footer';

function Contact() {
    return (
        <div>
            <NavBar></NavBar>

            <div className="rounded-xl bg-white p-6 sm:p-10 shadow-lg">
                <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">Contact Us</h1>
                <p className="text-gray-600 mb-6 text-center">
                    We'd love to hear from you! Please fill out the form below and we'll get in touch with you as soon as possible.
                </p>
                <form className="max-w-lg mx-auto space-y-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            id="name"
                            type="text"
                            placeholder="Your name"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            id="email"
                            type="email"
                            placeholder="Your email"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                            Message
                        </label>
                        <textarea
                            className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            id="message"
                            rows="5"
                            placeholder="Your message"
                        ></textarea>
                    </div>
                    <div className="text-center">
                        <button
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            type="button"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
                <div className="mt-8 text-center">
                    <p className="text-gray-600">
                        Or reach us at: <br />
                        <strong>Email:</strong> support@my-Todo.com <br />
                        <strong>Phone:</strong> +1 (555) 123-4567
                    </p>
                </div>
            </div>

            <Footer></Footer>
        </div>
    );
};

export default Contact;
