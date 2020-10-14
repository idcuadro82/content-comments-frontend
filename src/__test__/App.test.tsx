import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import { render } from '@testing-library/react';

jest.mock('../components/Book/Book', () => {
  return {
    __esModule: true,
    default: () => {
      return <div>Book 1</div>;
    },
  };
});

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, { wrapper: BrowserRouter })
}

describe('<App>', () => {
  it('should be equal to snapshot with route /book1', () => {
    let { container } = renderWithRouter(<App />, { route: '/book1' });
    expect(window.location.pathname).toEqual('/book1');
    expect(container).toMatchSnapshot();
  });

  it('should be equal to snapshot with redirect to /book1', () => {
    let { container } = renderWithRouter(<App />, { route: '/' });
    expect(window.location.pathname).toEqual('/book1');
    expect(container).toMatchSnapshot();
  });

  it('should be equal to snapshot with invalid route', () => {
    let { container } = renderWithRouter(<App />, { route: '/12345' });
    expect(window.location.pathname).toEqual('/12345');
    expect(container.querySelector('div')).toBeNull();
    expect(container).toMatchSnapshot();
  });
});
