import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import CommentsComponent from './CommentsComponent';

describe('DwvComponent', () => {
  // Inspect the component instance on mount
  it('renders the component', () => {
    const div = document.createElement('div');
    const component = ReactDOM.render(<CommentsComponent />, div);
    expect(component).toBeDefined();
    expect(component).not.toBeNull();
  });

  // Mount an instance and inspect the render output
  it('renders the beginning of the legend', () => {
    const component = ReactTestUtils.renderIntoDocument(<CommentsComponent />);
    const legend = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'legend');
    expect(legend.textContent).toContain('Powered by');
  })
})
