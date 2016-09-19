require('./style.scss');

import React, { Component, PropTypes } from 'react';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

class HoverScrub extends Component {
  propTypes: {
    video: React.PropTypes.string,
  }

  componentDidMount() {
    const element = ReactDOM.findDOMNode(this);
    const onloadeddata = Observable.fromEvent(element, 'loadeddata');
    const mousemove = Observable.fromEvent(element, 'mousemove');

    const source = onloadeddata.flatMap((x) => {
      return mousemove.map( (e) => e.clientX );
    });

    source.subscribe((x) => {
      let width = getComputedStyle(element).width.split('px')[0];
      let elementX = element.getBoundingClientRect().left;
      let percentage = (x - elementX) / width;
      let newTime = percentage * element.duration;

      element.currentTime = newTime;
    });

    element.load();
  }

  render() {
    return (
      <video className="video-preview" src={this.props.video} />
    );
  }
}

module.exports = HoverScrub;
