import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFilters } from './Context';

const PhotographerProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { name: photographers } = useFilters();
  
    console.log(photographers.id)
    const [showInquiryModal, setShowInquiryModal] = useState(false);
    const [inquiryForm, setInquiryForm] = useState({
        name: '',
        email: '',
        message: ''
    });
    console.log("hello")

    const photographer = photographers.find(p => p.id === parseInt(id));
    console.log(photographer)

    if (!photographer) {
        return (
            <div className="text-center py-12">
                <h2 className="text-xl font-semibold mb-4">Photographer not found</h2>
                <button
                    onClick={() => navigate('/')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Back to Photographers
                </button>
            </div>
        );
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInquiryForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmitInquiry = (e) => {
        e.preventDefault();
        console.log('Inquiry submitted:', inquiryForm);
        setShowInquiryModal(false);
        setInquiryForm({ name: '', email: '', message: '' });
        alert('Your inquiry has been sent successfully!');
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <button
                onClick={() => navigate(-1)}
                className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
            >
                ← Back to Photographers
            </button>

            <div className="flex flex-col md:flex-row gap-8 mb-12">
                <div className="w-full md:w-1/3">
                    <img
                        src={photographer.profilePic}
                        alt={photographer.name}
                        className="w-full h-64 md:h-96 object-cover rounded-lg shadow-md"
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                        }}
                    />
                </div>

                <div className="w-full md:w-2/3">
                    <h1 className="text-3xl font-bold mb-2">{photographer.name}</h1>
                    <p className="text-gray-600 mb-4">{photographer.location}</p>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">About</h2>
                        <p className="text-gray-700">{photographer.bio}</p>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-6">
                        <div>
                            <h3 className="font-semibold">Price</h3>
                            <p>₹{photographer.price.toLocaleString()}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Rating</h3>
                            <div className="flex items-center">
                                <span className="text-yellow-500 mr-1">★</span>
                                <span>{photographer.rating}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="font-semibold mb-2">Styles</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {photographer.styles.map((style, index) => (
                                <span
                                    key={`style-${index}`}
                                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                                >
                                    {style}
                                </span>
                            ))}
                        </div>

                        <h3 className="font-semibold mb-2">Specializations</h3>
                        <div className="flex flex-wrap gap-2">
                            {photographer.tags.map((tag, index) => (
                                <span
                                    key={`tag-${index}`}
                                    className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => setShowInquiryModal(true)}
                        className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-md transition"
                    >
                        Send Inquiry
                    </button>
                </div>
            </div>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Portfolio</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {photographer.portfolio.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`${photographer.name}'s work ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition"
                            onClick={() => window.open(image, '_blank')}
                        />
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
                {photographer.reviews.length > 0 ? (
                    <div className="space-y-6">
                        {photographer.reviews.map((review, index) => (
                            <div key={index} className="border-b pb-6 last:border-0">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold">{review.name}</h3>
                                    <span className="text-sm text-gray-500">
                                        {new Date(review.date).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex items-center mb-2">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <span
                                                key={i}
                                                className={`text-lg ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-700">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No reviews yet.</p>
                )}
            </section>

            {showInquiryModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">Contact {photographer.name}</h3>
                            <button
                                onClick={() => setShowInquiryModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        <form onSubmit={handleSubmitInquiry} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={inquiryForm.name}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={inquiryForm.email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Message</label>
                                <textarea
                                    rows="4"
                                    name="message"
                                    value={inquiryForm.message}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md"
                            >
                                Send Inquiry
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhotographerProfile;