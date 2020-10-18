import React, { FC } from 'react';
import PropTypes from 'prop-types';
import BookPageElementModel from '../../models/BookPageContent/BookPageElementModel';
import PageElementTypeMap, { BlockTypes } from '../../models/utils/PageElementTypesMap';
import parse from 'html-react-parser';
import './Book.scss';
import BookPageBlock from './BookPageBlock';

type BookPageProps = {
  content: String | BookPageElementModel[];
};

const BookPage: FC<BookPageProps> = ({ content }) => {
  if ((Array.isArray(content))) {
    return (
      <>
        {
          content.map((block) => {
            return (
              <BookPageBlock key={block.id} blockData={block}>
                {renderBlockContent(block)}
              </BookPageBlock>
            );
          })
        }
      </>
    );
  }

  return (
    <BookPageBlock>
      {content}
    </BookPageBlock>
  );
}

const renderBlockContent = ({
  content,
  blockType,
  themeColor
}: BookPageElementModel): JSX.Element | null => {
  switch (blockType) {

    case PageElementTypeMap.get(BlockTypes.BORDERED_CONTAINER):
      return (
        <div className={`block-type-container bordered-container ${themeColor}`}>
          <BookPage content={content} />
        </div>
      );

    case PageElementTypeMap.get(BlockTypes.BULLET):
      return (
        <div className="block-type-bullet">
          <div className="block-type-bullet-text">
            <p contentEditable={false}>
              {content}
            </p>
          </div>
        </div>
      );

    case PageElementTypeMap.get(BlockTypes.DIVIDER):
      return (
        <hr className="block-type-divider" />
      );

    case PageElementTypeMap.get(BlockTypes.IMAGE):
      return (
        <img src={content as string} alt="" />
      );

    case PageElementTypeMap.get(BlockTypes.TEXT):
      return (
        <p contentEditable={false}>
          {parse(content as string)}
        </p>
      );

    case PageElementTypeMap.get(BlockTypes.TITLE):
      return (
        <h1 contentEditable={false}>
          {parse(content as string)}
        </h1>
      );

    case PageElementTypeMap.get(BlockTypes.TITLE_MEDIUM):
      return (
        <h2 contentEditable={false}>
          {parse(content as string)}
        </h2>
      );

    case PageElementTypeMap.get(BlockTypes.TITLE_SMALL):
      return (
        <h3 contentEditable={false}>
          {parse(content as string)}
        </h3>
      );
    default:
      return null;
  }
}

BookPage.propTypes = {
  content: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.instanceOf(BookPageElementModel).isRequired
    ),
    PropTypes.string
  ]).isRequired
}

export default BookPage;
