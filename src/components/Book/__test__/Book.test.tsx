import React from 'react';
import Book from '../Book';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

const mockGetBookContentResponse = {
  result: {
    book_id: '4b900a74-e2d9-4837-b9a4-9e828752716e',
    page_content: [
      {
        block_type: 'title',
        id: '0d11b5e2-55ba-4852-98ad-d8f89117852c',
        position: '0',
        content: '01. BUILDING&nbsp;',
        theme_color: null
      }, {
        block_type: 'title',
        id: 'a06da79a-4f07-483f-b86e-11ea26cd60c4',
        position: '1',
        content: '&nbsp; &nbsp; &nbsp; YOUR IDENTITY',
        theme_color: null

      }, {
        block_type: 'divider',
        id: '678e180e-cb3e-486d-8ab3-690e05641063',
        position: '3',
        content: '',
        theme_color: null
      }, {
        block_type: 'bordered_container',
        id: '5c8bd374-0ee2-421d-bb3e-7a50989fc977',
        position: '4',
        theme_color: 'color-5',
        content: [
          {
            block_type: 'title_medium',
            id: '62333c8d-5a2b-4e23-83a0-358dc0d94292',
            parent_id: '5c8bd374-0ee2-421d-bb3e-7a50989fc977',
            position: '1',
            content: 'CAN DO',
            theme_color: null
          }, {
            block_type: 'title_small',
            id: '92d68729-922b-4d63-9516-6f7df6c4e7dc',
            parent_id: '5c8bd374-0ee2-421d-bb3e-7a50989fc977',
            position: '2',
            content: 'At the end of the unit you can:'
          }
        ]
      }
    ]
  }
}

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
