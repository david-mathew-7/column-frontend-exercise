import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import NoticeList from '../../components/NoticeList';
import { db } from '../../db';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../db', () => ({
  db: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  orderBy: jest.fn(),
  getDocs: jest.fn(),
}));

describe('NoticeList', () => {
  beforeEach(() => {
    getDocs.mockResolvedValueOnce({
      docs: [
        {
          id: '1',
          data: () => ({
            title: 'Notice 1',
            content: 'Content 1',
            publicationDate: new Date('2022-01-01').toISOString(),
          }),
        },
      ],
    });
  });

  it('renders and displays notices', async () => {
    const { getByText } = render(<BrowserRouter><NoticeList /></BrowserRouter>);
    await waitFor(() => {
      expect(getByText('Notice 1')).toBeInTheDocument();
      expect(getByText('Content 1')).toBeInTheDocument();
    });
  });

  it('handles pagination correctly', async () => {
    const { getByText } = render(<BrowserRouter><NoticeList /></BrowserRouter>);
    fireEvent.click(getByText('Next'));
    fireEvent.click(getByText('Previous'));
    await waitFor(() => {
      expect(getByText('Notice 1')).toBeInTheDocument();
    });
  });

  it('allows searching and filters results', async () => {
    const { getByPlaceholderText, getByText } = render(<BrowserRouter><NoticeList /></BrowserRouter>);
    const searchBar = getByPlaceholderText('Search notices...');
    fireEvent.change(searchBar, { target: { value: 'Notice 1' } });
    await waitFor(() => {
      expect(getByText('Notice 1')).toBeInTheDocument();
    });
  });
});
