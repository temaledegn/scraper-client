import React, { Component } from "react";

// import CommonComponents from "./common";

// import tikvah_ethiopia from "../assets/img/scraped/tikvah-ethiopia.jpg";
// import tikvah_ethiopia_bw from "../assets/img/scraped/tikvah-ethiopia-bw.jpg";
// import tron from "../assets/img/scraped/tron.jpg";
import TelegramPostList from "./telegram-posts";

import APIConstants from "../../../constants/constants";

class Telegram extends Component {

  state = { currentlyScrapingChannel: 'Loading . . .', currentlyScrapingGroup: 'Loading . . .' };


  componentWillMount() {
    // this.fetchAndRenderData();
  }


  fetchAndRenderData() {
    fetch(APIConstants.REQUESTS_API_ROOT+'/scraping/telegram/get').then((response) => {
      return response.json();/////////////
    }).then((jr) => {
      const jsonResponse = JSON.parse(jr);
      const listChannel =
        React.createElement('div', {},
          React.createElement('ul', {},
            jsonResponse['channel_username'].map((item) => React.createElement('li', {},
              React.createElement('form', { method: 'POST', action: APIConstants.REQUESTS_API_ROOT+'/scraping/telegram/channel/delete' },
                React.createElement('a', { href: 'https://t.me/' + item, target: '_blank' }, item),
                React.createElement('input', { type: 'hidden', value: item, name: 'username' }),
                React.createElement('div', {}),
                React.createElement('button', { type: 'submit', className: 'btn btn-sm btn-danger' }, '\u2715 Delete')),
              React.createElement('div', {})))
          )
        );

      const listGroup =
        React.createElement('div', {},
          React.createElement('ul', {},
            jsonResponse['group_username'].map((item) => React.createElement('li', {},
              React.createElement('form', { method: 'POST', action: APIConstants.REQUESTS_API_ROOT+'/scraping/telegram/group/delete' },
                React.createElement('a', { href: 'https://t.me/' + item, target: '_blank' }, item),
                React.createElement('input', { type: 'hidden', value: item, name: 'username' }),
                React.createElement('div', {}),
                React.createElement('button', { type: 'submit', className: 'btn btn-sm btn-danger' }, '\u2715 Delete')),
              React.createElement('div', {})))
          )
        );

      this.setState({ currentlyScrapingChannel: listChannel, currentlyScrapingGroup: listGroup });


      // const list = React.createElement('div', {},
      //   React.createElement('p', { style: { color: 'grey' } }, 'No link found')
      // )
      // this.setState({ currentlyScraping: list })
    });
  }




  render() {
    return (
      <div className="container" style={{ textAlign: 'center' }}>
        <TelegramPostList />
      </div>
    );
  }
}

export default Telegram;
