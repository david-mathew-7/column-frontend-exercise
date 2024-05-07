import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchBar from '../../components/SearchBar';

describe('SearchBar', () => {
  it('handles input correctly', () => {
    const onSearch = jest.fn();
    const { getByPlaceholderText } = render(<BrowserRouter><SearchBar onSearch={onSearch} /></BrowserRouter>);
    const input = getByPlaceholderText('Search notices...');
    fireEvent.change(input, { target: { value: 'Test' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(input.value).toBe('Test');
  });
});
