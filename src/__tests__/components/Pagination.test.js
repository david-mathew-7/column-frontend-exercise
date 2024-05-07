import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Pagination from '../../components/Pagination';

describe('Pagination', () => {
  it('enables buttons correctly based on current page and total pages', () => {
    const onPageChange = jest.fn();
    const { getByText } = render(
      <Pagination currentPage={2} totalPages={3} onPageChange={onPageChange} />
    );

    const nextButton = getByText('Next');
    const previousButton = getByText('Previous');
    
    expect(previousButton).not.toBeDisabled();
    expect(nextButton).not.toBeDisabled();

    fireEvent.click(previousButton);
    expect(onPageChange).toHaveBeenCalledWith(1);

    fireEvent.click(nextButton);
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('disables next button on last page', () => {
    const onPageChange = jest.fn();
    const { getByText } = render(
      <Pagination currentPage={3} totalPages={3} onPageChange={onPageChange} />
    );

    const nextButton = getByText('Next');
    expect(nextButton).toBeDisabled();
  });
});
