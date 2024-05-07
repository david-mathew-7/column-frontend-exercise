import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../db';
import { doc, getDoc } from 'firebase/firestore';

function NoticeDetail() {
  const [notice, setNotice] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchNotice = async () => {
      const docRef = doc(db, "notices", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setNotice(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchNotice();
  }, [id]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xl p-8 bg-white shadow-lg rounded-md">
        {notice ? (
          <div className="space-y-4">
            <div>
              <p className="text-lg font-semibold">Title:</p>
              <p>{notice.title}</p>
            </div>
            <div>
              <p className="text-lg font-semibold">Content:</p>
              <p>{notice.content}</p>
            </div>
            <div>
              <p className="text-lg font-semibold">Published on:</p>
              <p>{new Date(notice.publicationDate).toDateString()}</p>
            </div>
            <div className="text-center">
              <Link to="/" className="inline-block px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md">
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default NoticeDetail;
