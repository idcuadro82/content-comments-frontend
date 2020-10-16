import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Book from '../Book';
import { MOCK_GET_BOOK_CONTTENT_RESPONSE } from './GetBookContentResponse.mock';

jest.mock('../../../services/BookService.ts', () => {
  return {
    getBookContent: jest.fn().mockImplementation(() => {
      return Promise.resolve(MOCK_GET_BOOK_CONTTENT_RESPONSE);
    })
  };
});

describe('<Book>', () => {
  let container;

  beforeEach(async () => {
    let wrapper;
    await act(async () => {
      wrapper = render(<Book idBook="4b900a74-e2d9-4837-b9a4-9e828752716e" />);
    });
    container = wrapper.container;
  })

  afterEach(cleanup);

  it('should be equal to snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('should have rendered content', () => {
    const borderedContainerBlock = container.querySelector(`[data-uuid="5c8bd374-0ee2-421d-bb3e-7a50989fc977"]`);
    expect(borderedContainerBlock).toBeTruthy();

    const borderedContainerContent = borderedContainerBlock.querySelector('.bordered-container');
    expect(borderedContainerContent).toBeTruthy();

  })
});
