import React from 'react';
import NavBar from '../features/ui/NavBar';
import { Link } from 'react-router-dom';
import Footer from '../features/ui/Footer';

function Contact() {
    return (
        <div>
            <NavBar></NavBar>
            <div className="bg-slate-100 md:w-[60%] w-[80%] mx-auto mb-10 p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold mb-4">Contact Me</h1>
                <p className="text-gray-700">
                    Feel free to reach out if you have any questions, feedback, or suggestions!
                </p>
                <div className="mt-6">
                    <p className="">Email : abhinavchawda23@gmail.com</p>
                    <p className="">Phone : +91 9516510552</p>
                </div>
                <div className="mt-6">
                    <p className="text-gray-700">Connect with me on social media:</p>
                    <div className="flex flex-col">
                        <Link to={'https://twitter.com/'} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter text-blue-500 hover:text-blue-700">Twitter</i>
                        </Link>
                        <Link to={'https://linkedin.com/in/Abhinav-Chawda'} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin text-blue-500 hover:text-blue-700">Linked-in</i>
                        </Link>
                        {/* Add more social media icons as needed */}
                    </div>
                </div>
            </div>

            <Footer></Footer>
        </div>
    );
};

export default Contact;
