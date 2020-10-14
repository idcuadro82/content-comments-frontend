import BookPageElementModel from './BookPageElementModel';
import { IBookPageContentResponse } from '../../services/BookService';

export class BookPageContentModel {
  bookId?: string;
  pageContent: string | BookPageElementModel[];

  constructor() {
    this.pageContent = '';
  }

  public mapFromResponse(bookPageContent: IBookPageContentResponse) {
    const {
      book_id,
      page_content,
    } = bookPageContent;

    this.bookId = book_id;
    this.pageContent = (Array.isArray(page_content))
      ? BookPageElementModel.resolveContent(page_content)
      : page_content || '';
  }
}
