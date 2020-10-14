import React from 'react';
import PageWrapperView from '../PageWrapperView';
import { render, cleanup } from '@testing-library/react';

describe('<PageWrapperView>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <PageWrapperView>
        <h1 data-testid="page-wrapper">Book 1</h1>
      </PageWrapperView>
    );
  });

  afterEach(cleanup);

  it('should render a child element', () => {
    const childElement = wrapper.queryByTestId('page-wrapper');
    expect(childElement).toBeTruthy();
    expect(childElement.textContent).toContain('Book 1');
  });

  it('should be equal to snapshot', () => {
    expect(wrapper.container).toMatchSnapshot();
  });
});
