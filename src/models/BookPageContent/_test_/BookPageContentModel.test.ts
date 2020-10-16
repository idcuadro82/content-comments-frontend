import { BookPageContentModel } from '../BookPageContentModel';
import { IBookPageContentResponse } from '../../../services/BookService';
import BookPageElementModel from '../BookPageElementModel';

describe('BookPageContentModel', () => {

  it('calls constructor', () => {
    const bookPageContent = new BookPageContentModel();
    expect(bookPageContent).toBeTruthy();
  });

  it('sets calling mapFromResponse method with string content', () => {
    const bookPageContent = new BookPageContentModel();

    const bookPageResponse: IBookPageContentResponse = {
      book_id: '4b900a74-e2d9-4837-b9a4-9e828752716e',
      page_content: 'Book Content'
    }

    bookPageContent.mapFromResponse(bookPageResponse);
    expect(bookPageContent.bookId).toEqual('4b900a74-e2d9-4837-b9a4-9e828752716e');
    expect(bookPageContent.pageContent).toEqual('Book Content');
  });

  it('sets calling mapFromResponse method with Array content', () => {
    const bookPageContent = new BookPageContentModel();

    const bookPageResponse: IBookPageContentResponse = {
      book_id: '4b900a74-e2d9-4837-b9a4-9e828752716e',
      page_content: [{
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
            theme_color: 'red-6'
          }, {
            block_type: 'title_small',
            id: '92d68729-922b-4d63-9516-6f7df6c4e7dc',
            parent_id: '5c8bd374-0ee2-421d-bb3e-7a50989fc977',
            position: '2',
            content: 'At the end of the unit you can:'
          }
        ]
      }]
    };

    bookPageContent.mapFromResponse(bookPageResponse);
    const { pageContent } = bookPageContent;
    expect(pageContent).toBeTruthy();
    expect(pageContent.length).toBe(1);

    const [parentContentElement] = <BookPageElementModel[]>pageContent;
    expect(parentContentElement.id).toEqual('5c8bd374-0ee2-421d-bb3e-7a50989fc977');
    expect(parentContentElement.parentId).toBeNull();
    expect(parentContentElement.blockType).toEqual('Content::Block::BorderedContainer');
    expect(parentContentElement.position).toEqual('4');
    expect(parentContentElement.themeColor).toEqual('color-5');
    expect(parentContentElement.content.length).toBe(2);

    const [firstChildElement, secondChildElement] = <BookPageElementModel[]>parentContentElement.content;
    expect(firstChildElement.id).toEqual('62333c8d-5a2b-4e23-83a0-358dc0d94292');
    expect(firstChildElement.parentId).toEqual('5c8bd374-0ee2-421d-bb3e-7a50989fc977');
    expect(firstChildElement.blockType).toBe('Content::Block::TitleMedium');
    expect(firstChildElement.position).toEqual('1');
    expect(firstChildElement.themeColor).toEqual('red-6');
    expect(firstChildElement.content).toEqual('CAN DO');

    expect(secondChildElement.id).toEqual('92d68729-922b-4d63-9516-6f7df6c4e7dc');
    expect(secondChildElement.parentId).toEqual('5c8bd374-0ee2-421d-bb3e-7a50989fc977');
    expect(secondChildElement.blockType).toEqual('Content::Block::TitleSmall');
    expect(secondChildElement.position).toEqual('2');
    expect(secondChildElement.themeColor).toEqual('');
    expect(secondChildElement.content).toEqual('At the end of the unit you can:');
  });
});
