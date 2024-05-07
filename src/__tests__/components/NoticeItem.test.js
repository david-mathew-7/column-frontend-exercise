import React from 'react';
import { render } from '@testing-library/react';
import NoticeItem from '../../components/NoticeItem';
import { BrowserRouter } from 'react-router-dom';

describe('NoticeItem', () => {
  const notice = {
    id: '1',
    title: 'Test Notice',
    content: 'This is a test notice.'
  };

  it('renders notice information', () => {
    const { getByText } = render(
      <BrowserRouter>
        <NoticeItem notice={notice} />
      </BrowserRouter>
    );

    expect(getByText(notice.title)).toBeInTheDocument();
    expect(getByText(notice.content)).toBeInTheDocument();
    expect(getByText('View Detail').closest('a')).toHaveAttribute('href', `/notice/${notice.id}`);
  });
});
