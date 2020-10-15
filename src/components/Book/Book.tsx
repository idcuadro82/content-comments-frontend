import React, { FunctionComponent, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PageWrapperView from '../PageWrapperView/PageWrapperView';
import BookService, { IBookPageContentResponse } from '../../services/BookService';
import { BookPageContentModel } from '../../models/BookPageContent/BookPageContentModel';
import BookTemplate from './BookTemplate';
import useDataApi from '../../hooks/useDataApi';

type BooksProps = {
  idBook: string;
};

const Book: FunctionComponent<BooksProps> = ({ idBook }): any => {
  const [bookContent, setBookContent] = useState<BookPageContentModel>(new BookPageContentModel());

  useEffect(() => {
    BookService.getBookContent(idBook)
      .then((bookContentResponse: IBookPageContentResponse) => {
        let newbookContent = new BookPageContentModel();
        newbookContent.mapFromResponse(bookContentResponse);
        setBookContent(newbookContent);
      })
      .catch(error => console.error(error.message));
  }, []);

  return (
    <PageWrapperView>
      <BookTemplate content={bookContent.pageContent} />
    </PageWrapperView>
  );
};

Book.propTypes = {
  idBook: PropTypes.string.isRequired
};

export default Book;
