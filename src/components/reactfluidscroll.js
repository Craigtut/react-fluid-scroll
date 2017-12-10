import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ReactFluidScroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentElement: null,
      bodyHeight: 0,
    };
  }

  componentDidMount() {
    const { contentElement } = this.state;
    if (!contentElement) this.setState({ contentElement: document.getElementById('fluid-scroll-content') });
    window.addEventListener('resize', this.updateHeight);
  }

  componentWillUnmount() {
    removeEventListener('resize', this.updateHeight);
  }

  updateHeight() {
    const { contentElement } = this.state;
    this.setState({ bodyHeight: contentElement.clientHeight });
  }

  render() {
    const { children } = this.props;
    const { bodyHeight } = this.state;

    const bodySpacer = {
      position: 'relative',
      height: bodyHeight,
    };

    const viewportStyle = {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
    };

    const contentStyle = {
      position: 'relative',
      width: '100%',
    };

    return (
      <div id="fluid-scroll">
        <div id="fluid-scroll-viewport" style={viewportStyle}>
          <div id="fluid-scroll-content" style={contentStyle}>
            {children}
          </div>
        </div>
        <div id="body-spacer" style={bodySpacer} />
      </div>
    );
  }
}

ReactFluidScroll.propTypes = {
  children: PropTypes.object.isRequired,
};

export default ReactFluidScroll;
