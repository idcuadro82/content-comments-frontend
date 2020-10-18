import React, { FC, useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import BookPageElementModel from '../../models/BookPageContent/BookPageElementModel';
import { isBlockExcludedComment } from '../../utils/CommentBlockTypeValidator';

interface BookPageBlockProps {
  blockData?: BookPageElementModel;
  children: React.ReactNode;
}

const BookPageBlock: FC<BookPageBlockProps> = ({ blockData, children }) => {
  let [isHover, setIsHover] = useState<boolean>(false);
  let elementRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    elementRef.current?.addEventListener('mouseover', e => {
      e.preventDefault();
      setIsHover(true);
    })

    elementRef.current?.addEventListener('mouseleave', e => {
      e.preventDefault();
      setIsHover(false);
    })

    return () => {
      elementRef.current?.removeEventListener('mouseover', () => { });
      elementRef.current?.removeEventListener('mouseleave', () => { });
    }
  }, []);

  const validCommentBlock = () => blockData && !isBlockExcludedComment(blockData.blockType);
  const showCommentButton = () => validCommentBlock() && isHover;
  const resolveComponentClass = (): string => {
    let baseClass = 'document-block-item';
    if (blockData?.themeColor) {
      baseClass += ` ${blockData.themeColor}`
    }
    if (validCommentBlock()) {
      baseClass += ' comment-available';
    }
    return `document-block-item ${baseClass}`;
  }

  const contentProp = (Array.isArray(blockData?.content)) ? '' : blockData?.content;
  const dataContainer = Array.isArray(blockData?.content) || null;

  return (
    <div
      key={blockData?.id}
      className={resolveComponentClass()}
      data-uuid={blockData?.id}
      data-position={blockData?.position}
      data-block-type={blockData?.blockType}
      data-text={contentProp}
      data-container={dataContainer}
      ref={elementRef}>
      {
        showCommentButton() && <span className="document-block-comment" />
      }
      <div className="document-block-item-container">
        <div className="document-block-item-content">
          {children}
        </div>
      </div>
    </div>
  );
}

BookPageBlock.propTypes = {
  blockData: PropTypes.instanceOf(BookPageElementModel),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default BookPageBlock;
