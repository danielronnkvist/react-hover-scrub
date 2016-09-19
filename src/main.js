require('./style.scss');

import React, { Component, PropTypes } from 'react';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

class HoverScrub extends Component {
  propTypes: {
    video: React.PropTypes.string,
  }

  componentDidMount() {
    const element = ReactDOM.findDOMNode(this);
    const source = Observable.fromEvent(element, 'mousemove');

    source.subscribe((e) => {
      let width = getComputedStyle(element).width.split('px')[0];
      let elementX = element.getBoundingClientRect().left;
      let percentage = (e.clientX - elementX) / width;
      let newTime = percentage * element.duration;

      element.currentTime = newTime;
    });
  }

  render() {
    return (
      <video className="video-preview" src={this.props.video} />
    );
  }
}

module.exports = HoverScrub;
