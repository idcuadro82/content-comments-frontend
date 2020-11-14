import React, { FC, useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { COMMENT_BLOCK_TYPES, INLINE_STYLES } from '../../configs/CommentUtils';
import { ICommentEditorParams } from '../../models/BookPageContent/BookCommentPopUpModel';
import 'draft-js/dist/Draft.css';
import './BookCommentPopUp.scss';

interface IBookCommentPopUpProps {
  id?: string;
  renderParams: ICommentEditorParams
}

const BookCommentPopUp: FC<IBookCommentPopUpProps> = ({ id, renderParams }) => {
  const editor = React.useRef<HTMLHeadingElement>(null);
  const style = {
    height: renderParams.height,
    left: renderParams.positionX,
    top: renderParams.positionY,
    width: renderParams.width
  };

  let sideClass = renderParams.isRightRendered ? 'right-side' : 'left-side';
  sideClass = `${sideClass}${renderParams.isUpRendered ? 'up-side' : 'down-side'}`;

  let [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const _focusEditor = () => {
    editor.current?.focus();
  }

  const _handleKeyCommand = (command, editorStateParam) => {
    const newState = RichUtils.handleKeyCommand(editorStateParam, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  const _resolveClass = () => {
    let sideClass = renderParams.isRightRendered ? 'right-side' : 'left-side';
    return `${sideClass} ${renderParams.isUpRendered ? 'up-side' : 'down-side'}`;
  }

  const _toggleBlockType = (blockType) => {
    setEditorState(
      RichUtils.toggleBlockType(
        editorState,
        blockType
      )
    );
  }

  const _toggleInlineStyle = (inlineStyle) => {
    setEditorState(
      RichUtils.toggleInlineStyle(
        editorState,
        inlineStyle
      )
    );
  }

  return (
    <div
      id={id}
      style={style}
      className={_resolveClass()}
      onClick={_focusEditor}>
      <BlockStyleControls
        editorState={editorState}
        onToggle={_toggleBlockType}
      />
      <InlineStyleControls
        editorState={editorState}
        onToggle={_toggleInlineStyle}
      />
      <Editor
        ref={editor}
        handleKeyCommand={_handleKeyCommand}
        editorState={editorState}
        onChange={setEditorState}
      />
    </div>
  )
}

const StyleButton = (props) => {
  const {
    active,
    label,
    onToggle,
    style
  } = props;

  const _resolveClass = (): string => {
    let className = 'RichEditor-styleButton';
    if (active) {
      className += ' RichEditor-activeButton';
    }
    return className;
  }

  const _onMouseDownHandler = () => {
    onToggle(style);
  }

  return (
    <span className={_resolveClass()} onMouseDown={_onMouseDownHandler}>
      {label}
    </span>
  )
}

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {COMMENT_BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

export default BookCommentPopUp;
