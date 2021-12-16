import React, { Component } from "react";

class FacebookPageInfo extends Component {
  state = {};
  render() {
    return (
      <div style={{ textAlign: "center", margin: "2%" }}>
        <h1>
          <b>{this.props.pageName}</b>
        </h1>
        {/* <h4>{this.props.about}</h4>
        <h4>{this.props.numberOfLikes}</h4>
        <h4>
          <a href={this.props.fbLink.replace('m.facebook', 'www.facebook')} target="?">
            Go To Page&ensp;<i className="fa fa-external-link"></i>
          </a>
        </h4> */}
      </div>
    );
  }
}

class TwitterPageInfo extends Component {
  state = {};
  render() {
    let listInfo;
    if (!this.props.linkHidden) {
      listInfo = (
        <div>
          <h1>
            <b>{this.props._name}</b>
          </h1>

          <h4>@{this.props.userName}</h4>
          <h4>
            <a
              href={"https://www.twitter.com/" + this.props.userName}
              target="?"
            >
              Go To Page&ensp;<i className="fa fa-external-link"></i>
            </a>
          </h4>
        </div>
      );
    } else {
      listInfo = (
        <div>
          <h3>
            <span style={{ color: "grey" }}>Search results for: </span>
            <b>{this.props._name}</b>
          </h3>
        </div>
      );
    }
    return <div style={{ textAlign: "center", margin: "2%" }}>{listInfo}</div>;
  }
}


class TelegramPageInfo extends Component {
  state = {};
  render() {
    return (
      <div style={{ textAlign: "center", margin: "2%" }}>
        <h1>
          <b>{this.props.cgName}</b>
        </h1>
        <h4>@{this.props.userName}</h4>
        <h4>
          <a href={"https://t.me/"+this.props.userName} target="?">
            See On Telegram&ensp;<i className="fa fa-external-link"></i>
          </a>
        </h4>
      </div>
    );
  }
}


export default TwitterPageInfo;

export { FacebookPageInfo, TwitterPageInfo, TelegramPageInfo };
