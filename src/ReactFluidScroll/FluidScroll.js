export default class FluidScroll {
  constructor(params = {}) {
    this.contentElement = params.contentElement;
    this.spacerElement = (params.spacerElement) ? params.spacerElement : document.body;
    this.viewportElement = params.viewportElement;

    this.requestId = null;
    this.resizeRequested = 1;
    this.scrollRequested = 0;
    this.errorThreshold = 0.01;
    this.viscosity = (params.viscosity) ? params.viscosity : 0.2;
    this.onUpdate = (params.onUpdate) ? params.onUpdate : undefined;
    this.currentVirtualScroll = window.pageYOffset;

    this.onResize = this.onResize.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.updateLoop = this.updateLoop.bind(this);
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.onResize);

    this.onResize(); // run resize on initialization
    this.finishedLoading = this.onResize;
  }

  onResize() {
    this.resizeRequested++;
    if (!this.currentRequest) {
      this.currentRequest = requestAnimationFrame(this.updateLoop);
    }
  }

  onScroll() {
    this.scrollRequested++;
    if (!this.currentRequest) {
      this.currentRequest = requestAnimationFrame(this.updateLoop);
    }
  }

  updateLoop() {
    if (this.resizeRequested > 0 || this.contentHeight !== this.contentElement.clientHeight) {
      this.updateFromResize();
    }
    this.updateVirtualScroll();
    if (this.scrollRequested > 0) { // if more than one scroll event has fired
      this.currentRequest = requestAnimationFrame(this.updateLoop);
    } else {
      this.currentRequest = null;
    }
  }

  updateVirtualScroll() {
    const currentPageY = window.pageYOffset;

    this.currentVirtualScroll += (currentPageY - this.currentVirtualScroll) * this.viscosity;
    if (Math.abs(currentPageY - this.currentVirtualScroll) < this.errorThreshold || this.resizeRequested > 0) {
      this.currentVirtualScroll = currentPageY;
      this.scrollRequested = 0;
    }
    if (this.onUpdate) this.onUpdate({ virtual: { y: this.currentVirtualScroll } });
    this.contentElement.style.transform = `translate3d(0px, -${this.currentVirtualScroll}px, 0px)`;
  }

  updateFromResize() {
    this.contentHeight = this.contentElement.clientHeight;
    this.spacerElement.style.height = `${this.contentHeight}px`;
    this.resizeRequested = 0;  // To Do, try --
  }

  destroy() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
  }
}
