import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AddNotice from '../../components/AddNotice';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../db';

jest.mock('../../db', () => ({ db: {} }));
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  addDoc: jest.fn(() => Promise.resolve({ id: 'abc123' })),
}));

describe('AddNotice', () => {
  it('renders correctly', async () => {
    const { asFragment } = render(<BrowserRouter><AddNotice /></BrowserRouter>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('submits data correctly', async () => {
    const { getByPlaceholderText, getByText } = render(<BrowserRouter><AddNotice /></BrowserRouter>);
    const titleInput = getByPlaceholderText('Title');
    const contentInput = getByPlaceholderText('Content');
    const dateInput = getByPlaceholderText('Date');

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(contentInput, { target: { value: 'Test Content' } });
    fireEvent.change(dateInput, { target: { value: '2022-01-01' } });
    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(addDoc).toHaveBeenCalledWith(collection(db, 'notices'), {
        title: 'Test Title',
        content: 'Test Content',
        publicationDate: expect.any(Date)
      });
    });
  });
});
