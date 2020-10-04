import React from 'react';
import PageWrapperView from '../PageWrapperView';
import { render } from '@testing-library/react';


describe('<PageWrapperView>', () => {

  it('Render <PageWrapperView>', () => {
    const { container, queryByTestId } = render(
      <PageWrapperView>
        <h1 data-testid="page-wrapper">Book 1</h1>
      </PageWrapperView>
    );

    expect(queryByTestId('page-wrapper')).toBeTruthy();
    expect(container).toMatchSnapshot();
  })
});
