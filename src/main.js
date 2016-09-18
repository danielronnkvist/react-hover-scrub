import React, { Component, PropTypes } from 'react';

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
