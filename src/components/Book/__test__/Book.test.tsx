import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Book from '../Book';
import { mockGetBookContentResponse } from './GetBookContentResponse.mock';

jest.mock('../../../services/BookService.ts', () => {
  return {
    getBookContent: jest.fn().mockImplementation(() => {
      return Promise.resolve(mockGetBookContentResponse);
    })
  };
});

describe('<Book>', () => {
  it('should be equal to snapshot', async () => {
    let wrapper;
    await act(async () => {
      wrapper = render(<Book idBook="4b900a74-e2d9-4837-b9a4-9e828752716e" />);
    });
    expect(wrapper.container).toMatchSnapshot();
  });
});
