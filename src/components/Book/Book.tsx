import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import PageWrapperView from '../PageWrapperView/PageWrapperView';

type BooksProps = {
  volume: string;
};

const Book: FunctionComponent<BooksProps> = ({ volume }): any => {
  return <PageWrapperView>Book {volume}</PageWrapperView>;
};

Book.propTypes = {
  volume: PropTypes.string.isRequired
};

export default Book;
