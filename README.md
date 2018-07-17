# React Fluid Scroll

The goal of this project is to create an easy to use wrapper that will create a virtualized scrolling effect to control the ways in which a page is scrolled.

## Installation

```
npm install react-fluid-scroll -save
```

... or yarn


## Usage


Basic Usage
```javascript
import { renderProject } from 'behance-react';

class Project extends Component {
  /* ... something more ... */
  render() {
    const { project } = this.state; // Get behance project data from somewhere
    const projectRender = renderProject(project);
    return (
      <div>
        {projectRender}
      </div>
    );
  }
}

```