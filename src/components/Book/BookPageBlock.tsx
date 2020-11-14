import React, {
  FC,
  useEffect,
  useRef,
  useState
} from 'react'
import PropTypes from 'prop-types';
import BookPageElementModel from '../../models/BookPageContent/BookPageElementModel';
import { isBlockExcludedComment } from '../../utils/CommentBlockTypeValidator';
import { ButtonCommentContext } from '../PageWrapperView/PageWrapperView';

interface IBookPageBlockProps {
  blockData?: BookPageElementModel;
  children: React.ReactNode;
}

const BookPageBlock: FC<IBookPageBlockProps> = ({ blockData, children }) => {
  let [isHover, setIsHover] = useState<boolean>(false);
  let elementRef = useRef<HTMLHeadingElement>(null);
  let buttonCommentRef = useRef<HTMLHeadingElement>(null);

  const contentProp = (Array.isArray(blockData?.content)) ? '' : blockData?.content;
  const dataContainer = Array.isArray(blockData?.content) || null;

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

  const _validCommentBlock = () => blockData && !isBlockExcludedComment(blockData.blockType);

  const _showCommentButton = () => _validCommentBlock() && isHover;

  const _getButtonCommentPosition = () => {
    return buttonCommentRef.current?.getBoundingClientRect();
  }

  const _resolveComponentClass = (): string => {
    let baseClass = 'document-block-item';
    if (blockData?.themeColor) {
      baseClass += ` ${blockData.themeColor}`
    }
    if (_validCommentBlock()) {
      baseClass += ' comment-available';
    }
    return baseClass;
  }

  const _resolveButtonCommentContext = ({ commentEditorState, resolveCommentEditorParams }) => {
    const isLast = blockData?.themeColor === 'last-element-row';
    const wasSelected = commentEditorState.show && commentEditorState.id === blockData?.id;
    return (
      (_showCommentButton() || wasSelected) &&
      <span
        ref={buttonCommentRef}
        className="document-block-comment"
        onClick={() => resolveCommentEditorParams(_getButtonCommentPosition(), blockData?.id, isLast)}
      />
    )
  }

  return (
    <div
      key={blockData?.id}
      className={_resolveComponentClass()}
      data-uuid={blockData?.id}
      data-position={blockData?.position}
      data-block-type={blockData?.blockType}
      data-text={contentProp}
      data-container={dataContainer}
      ref={elementRef}>
      {
        <ButtonCommentContext.Consumer>
          {_resolveButtonCommentContext}
        </ButtonCommentContext.Consumer>
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
