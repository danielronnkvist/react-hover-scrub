import React, { Component, PropTypes } from 'react';
require('./style.scss');

class VideoPreview extends Component {
  propTypes: {
    video: React.PropTypes.string,
  }

  render() {
    return (
      <div className="video-preview">
        <video src={this.props.video} autoPlay loop />
      </div>
    );
  }
}

module.exports = VideoPreview;
