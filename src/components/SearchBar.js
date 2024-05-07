import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { debounce } from 'lodash';
import { useSearchParams } from 'react-router-dom';


function SearchBar({ onSearch }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search")||'');

  const debouncedSearch=useCallback(debounce((q) => {
    onSearch(q)
  }, 500),[])

  useEffect(() => {
    onSearch(searchTerm);
  }, []);


  const handleChange = (event) => {
    const value = event.target.value
    setSearchTerm(value)
    setSearchParams({search: value})       
    debouncedSearch(value)
  };

  return (
    <input
      type="text"
      placeholder="Search notices..."
      value={searchTerm}
      onChange={handleChange}
      autoFocus
      className="form-input mt-1 block w-full max-w-lg border py-2 px-3 shadow rounded-lg"
    />
  );
}

export default SearchBar;
