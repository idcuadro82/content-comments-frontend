import React, { FC } from 'react';
import PropTypes from 'prop-types';
import './PageWrapperView.scss';

const PageWrapperView: FC = ({ children }) => {
  return (
    <div className="document">
      <div className="document-content">
        <div className="document-block-list">{children}</div>
      </div>
    </div>
  );
};

PageWrapperView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default PageWrapperView;
