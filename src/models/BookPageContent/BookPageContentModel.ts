import BookPageElementModel from './BookPageElementModel';
import { IBookPageContentResponse } from '../../services/BookService';

export class BookPageContentModel {
  bookId?: String;
  pageContent: String | BookPageElementModel[];

  constructor() {
    this.pageContent = '';
  }

  public mapFromResponse(bookPageContent: IBookPageContentResponse) {
    const {
      book_id,
      page_content,
    } = bookPageContent;

    this.bookId = book_id || null;
    this.pageContent = (Array.isArray(page_content))
      ? BookPageElementModel.resolveContent(page_content)
      : page_content;
  }
}
