import React, { Component, PropTypes } from 'react';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/skipWhile';
import 'rxjs/add/operator/map';

import styles from './style.scss';

class HoverScrub extends Component {
  propTypes: {
    video: React.PropTypes.string,
  }

  componentDidMount() {
    const element = ReactDOM.findDOMNode(this);
    const onloadeddata = Observable.fromEvent(element, 'loadeddata');
    const mousemove = Observable.fromEvent(element, 'mousemove');

    const source = onloadeddata.flatMap((video) => {
      return Observable
        .interval(250)
        .skipWhile(() => video.readyState < 3)
        .flatMap(() => mousemove.map( (e) => e.clientX ))
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
      <video className={styles.video} src={this.props.video} />
    );
  }
}

module.exports = HoverScrub;
