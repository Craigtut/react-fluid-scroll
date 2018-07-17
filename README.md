# React Fluid Scroll

React fluid scroll sets up and manages a virtualized scroll element that allows for a smooth scroll animation. 

See [Craigtut.com](https://www.Craigtut.com) to see the scroll smoothing in effect.

## Installation

```
npm install react-fluid-scroll -save
```

... or yarn


## Usage


Basic Usage
```javascript
import ReactFluidScroll from 'react-fluid-scroll';

<ReactFluidScroll viscosity={0.2}>
    /* your page or content */
</ReactFluidScroll>

```

Optional Props:

*scrollHook: callback function that is call on scroll events. This allows you to tap into the virtualScrolls current position rather than the window's current scroll location.

*callback parameter structure: { virtual: { y: this.currentVirtualScroll } }

Example callback
```javascript
    this.scrollMagicBridge = (scroll) => {
      this.props.controller.scrollPos(() => scroll.virtual.y);
      this.props.controller.update();
    };
```

