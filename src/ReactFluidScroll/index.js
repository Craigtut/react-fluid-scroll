import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FluidScroll from './FluidScroll';

class ReactFluidScroll extends Component {
  componentDidMount() {
    const { viscosity, scrollHook } = this.props;
    this.fluidScroll = new FluidScroll({
      contentElement: document.getElementById('fluid-scroll-content'),
      spacerElement: document.getElementById('body-spacer'),
      viewportElement: document.getElementById('fluid-scroll-viewport'),
      viscosity,
      onUpdate: scrollHook,
    });
  }

  componentDidUpdate(nextProps) {
    this.fluidScroll.finishedLoading();
  }

  componentWillUnmount() {
    this.fluidScroll.destroy();
  }

  render() {
    const { children } = this.props;

    const bodySpacer = {
      position: 'relative',
      zIndex: 0,
    };

    const viewportStyle = {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      zIndex: 1,
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
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  scrollHook: PropTypes.func,
  viscosity: PropTypes.number,
};

ReactFluidScroll.defaultProps = {
  scrollHook: () => {},
  viscosity: 0.2,
};

export default ReactFluidScroll;
