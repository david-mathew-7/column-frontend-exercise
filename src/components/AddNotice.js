import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../db'; 
import { collection, addDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddNotice() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const noticeData = { 
      title, 
      content, 
      publicationDate: new Date(date)
    };    
    try {
      await addDoc(collection(db, 'notices'), noticeData);
      toast.success('Notice added successfully!');
      setTitle('');
      setContent('');
      setDate('');
    } catch (error) {
      console.error("Error adding notice: ", error);
      toast.error('Failed to add notice!');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg max-w-md w-full">
         <h2 className="text-2xl font-bold mb-6 text-center">Add a New Notice</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input mt-1 block w-full border py-2 px-3 shadow rounded-lg"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-textarea mt-1 block w-full border py-2 px-3 shadow rounded-lg"
          />
          <input
            type="date"
            placeholder='Date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="form-input mt-1 block w-full border py-2 px-3 shadow rounded-lg"
          />
          <div className="flex justify-between">
            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Submit
            </button>
            <Link to="/" className="inline-block align-middle text-center select-none border font-bold whitespace-no-wrap py-2 px-4 rounded text-base leading-normal no-underline text-blue-100 bg-blue-500 hover:bg-blue-700">
              View Notices
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default AddNotice;
