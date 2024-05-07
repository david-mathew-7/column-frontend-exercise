import React, { useState, useEffect, useMemo, useCallback } from 'react';
import NoticeItem from './NoticeItem';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import { db } from '../db';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function NoticeList() {
  const [notices, setNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [noticesPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchData = async (value) => {
    setLoading(true)
    try {
      let q = query(collection(db, 'notices'), orderBy('publicationDate', 'desc'));
      if (value) {
        q = query(q, where('title', '==', value));
      }
      const querySnapshot = await getDocs(q);
      const noticesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNotices(noticesData);
    } catch (err) {
      console.error("Error fetching notices: ", err);
      setError(err.message);
    } finally {
        setLoading(false)
    }
  };

  const handleSearch = (query) => {
    fetchData(query)

  };

  const totalNotices = notices.length;
  const totalPages = Math.ceil(totalNotices / noticesPerPage);
  const indexOfFirstNotice = (currentPage - 1) * noticesPerPage;
  const indexOfLastNotice = indexOfFirstNotice + noticesPerPage;
  const currentNotices = notices.slice(indexOfFirstNotice, indexOfLastNotice);

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 px-4">
      <div className="container w-full p-5 pt-0">
        <h1 className="text-3xl font-bold text-center mb-4">Notice Dashboard</h1>
        <div className="flex justify-between mb-4">
          <SearchBar onSearch={handleSearch} />
          <Link to="/add-notice" className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Notice
          </Link>
        </div>
         {loading ? 
          <><div className='flex flex-col justify-items'>loading...</div></>:(
          <>
              {currentNotices.length > 0 ? (
                  currentNotices.map(notice => (
                  <NoticeItem key={notice.id} notice={notice} />
                  ))
              ) : (
                  <div className="text-center text-lg text-gray-600">No results found</div>
              )}
          </>
        )}
  
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={paginate} />
      </div>
    </div>
  );
  
}

export default NoticeList;
