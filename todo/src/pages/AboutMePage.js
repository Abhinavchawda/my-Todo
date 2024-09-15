import React from 'react';
import NavBar from '../features/ui/NavBar';
import Footer from '../features/ui/Footer';

function About() {
    return (
        <div>
            <NavBar></NavBar>
            <div className="bg-slate-100 md:w-3/5 w-4/5 mx-auto mb-10 p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">About Our Task Manager</h1>
                <p className="text-gray-700 text-center mb-6">
                    Your task manager website is designed to help you stay organized and productive. Here are some key features:
                </p>
                <ul className="list-disc ml-8 space-y-2 text-gray-600">
                    <li>Efficient task creation and management</li>
                    <li>Natural language recognition for input</li>
                    <li>Priority and due date settings</li>
                    <li>Custom filters and views</li>
                    <li>Collaboration for teams</li>
                </ul>
                <p className="mt-6 text-gray-700 text-center">
                    Inspired by popular tools like Todoist and Toodledo, our platform aims to simplify your life!
                </p>
            </div>

            <Footer></Footer>
        </div>

    );
};

export default About;
