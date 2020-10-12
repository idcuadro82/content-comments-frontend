import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import './PageWrapperView.scss';

const PageWrapperView: FunctionComponent = ({ children }) => {
  return (
    <div className="document">
      <div className="document-content">{children}</div>
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
