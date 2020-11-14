import React, { FC, createContext, useState } from 'react';
import PropTypes from 'prop-types';
import BookCommentPopUp from '../BookCommentPopUp/BookCommentPopUp';
import BookCommentPopUpModel, { ICommentEditorParams } from '../../models/BookPageContent/BookCommentPopUpModel';
import IPoint from '../../models/utils/IPoint';
import './PageWrapperView.scss';

const defaultCommentEditorParams: ICommentEditorParams = new BookCommentPopUpModel();

const PageWrapperView: FC = ({ children }) => {
  let [commentEditorParams, setShowCommentEditor] = useState<ICommentEditorParams>(defaultCommentEditorParams);
  let [currentBlock, setCurrentBlock] = useState<string>('');

  const resolveCommentEditorParams = (params: IPoint, blockId: string, isLast: boolean) => {
    const newPopUp = new BookCommentPopUpModel();
    newPopUp.resolvePositionRender(params, isLast);
    newPopUp.show = (blockId === currentBlock) ? !commentEditorParams.show : true;
    newPopUp.id = blockId;
    setCurrentBlock(blockId);
    setShowCommentEditor(newPopUp);
  }

  return (
    <ButtonCommentContext.Provider value={{
      commentEditorState: commentEditorParams,
      resolveCommentEditorParams
    }}>
      <div className="document">
        <div className="document-content">
          <div className="document-block-list">{children}</div>
        </div>
        {
          commentEditorParams.show &&
          <BookCommentPopUp id="comment-text-editor" renderParams={commentEditorParams} />
        }
      </div>
    </ButtonCommentContext.Provider>
  );
};

PageWrapperView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

interface IButtonCommentContext {
  commentEditorState: ICommentEditorParams;
  resolveCommentEditorParams: (params: IPoint, blockId: string, isLast: boolean) => void;
}

export const ButtonCommentContext = createContext<IButtonCommentContext>({} as IButtonCommentContext);

export default PageWrapperView;
