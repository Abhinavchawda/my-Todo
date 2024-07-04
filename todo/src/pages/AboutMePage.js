import React from 'react';
import NavBar from '../features/ui/NavBar';
import Footer from '../features/ui/Footer';

function About() {
    return (
        <div >
            <NavBar></NavBar>
            <div className="bg-slate-100 md:w-[60%] w-[80%] mx-auto mb-10 p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold mb-4">About Our Task Manager</h1>
                <p className="text-slate-700">
                    Your task manager website is designed to help you stay organized and productive. Here are some key features:
                </p>
                <ul className="list-disc ml-6 mt-4 text-gray-600">
                    <li>Efficient task creation and management</li>
                    <li>Natural language recognition for input</li>
                    <li>Priority and due date settings</li>
                    <li>Custom filters and views</li>
                    <li>Collaboration for teams</li>
                </ul>
                <p className="mt-4 text-gray-700">
                    Inspired by popular tools like Todoist and Toodledo, our platform aims to simplify your life!
                </p>
            </div>

            <Footer></Footer>
        </div>

    );
};

export default About;
