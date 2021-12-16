import React, { Component, useState } from "react";

import CommonComponents from "../../common/common";
import axios from "axios";
import imgTgGroup from "../../../assets/img/telegramGroup.png";
import imgTgChannel from "../../../assets/img/telegramChannel.jpg";


import getAccessToken from "../../../common/GlobalsFunctions";
import APIConstants from "../../../constants/constants";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



class PreTelegram extends Component {
  state = {
    channelsScraped: 'Loading . . .',
    groupsScraped: 'Loading . . .',
    currentlyScrapingChannel: 'Loading . . .',
    currentlyScrapingGroup: 'Loading . . .',
    channelUsername: "",
    groupUsername: "",
  };

  componentWillMount() {
    this.fetchAndRenderDataScraping();
    this.fetchAndRenderDataAvailable();
  }

  onChannelAddHandler = (e) => {
    e.preventDefault();
    axios.post(APIConstants.REQUESTS_API_ROOT + '/scraping/telegram/channel/add', { 'username': e.target.username.value }, {
      headers: {
        'x-access-token': getAccessToken()
      }
    })
      .then((response) => {
        if (response.data.type == 'success') {
          toast.success(response.data.message);
        } else if (response.data.type == 'warning') {
          toast.warning(response.data.message);
        } else if (response.data.type == 'error') {
          toast.error(response.data.message);
        }
        e.target.username.value = '';
        this.fetchAndRenderDataScraping();
      });
  }

  onChannelDeleteHandler = (e) => {
    e.preventDefault();
    axios.post(APIConstants.REQUESTS_API_ROOT + '/scraping/telegram/channel/delete', { 'username': e.target.username.value }, {
      headers: {
        'x-access-token': getAccessToken()
      }
    })
      .then((response) => {
        if (response.data.type == 'success') {
          toast.success(response.data.message);
        } else if (response.data.type == 'warning') {
          toast.warning(response.data.message);
        } else if (response.data.type == 'error') {
          toast.error(response.data.message);
        }
        this.fetchAndRenderDataScraping();
      });
  }



  onGroupAddHandler = (e) => {
    e.preventDefault();
    axios.post(APIConstants.REQUESTS_API_ROOT + '/scraping/telegram/group/add', { 'username': e.target.username.value }, {
      headers: {
        'x-access-token': getAccessToken()
      }
    })
      .then((response) => {
        if (response.data.type == 'success') {
          toast.success(response.data.message);
        } else if (response.data.type == 'warning') {
          toast.warning(response.data.message);
        } else if (response.data.type == 'error') {
          toast.error(response.data.message);
        }
        e.target.username.value = '';
        this.fetchAndRenderDataScraping();
      });
  }

  onGroupDeleteHandler = (e) => {
    e.preventDefault();
    axios.post(APIConstants.REQUESTS_API_ROOT + '/scraping/telegram/group/delete', { 'username': e.target.username.value }, {
      headers: {
        'x-access-token': getAccessToken()
      }
    })
      .then((response) => {
        if (response.data.type == 'success') {
          toast.success(response.data.message);
        } else if (response.data.type == 'warning') {
          toast.warning(response.data.message);
        } else if (response.data.type == 'error') {
          toast.error(response.data.message);
        }
        this.fetchAndRenderDataScraping();
      });
  }
  fetchAndRenderDataScraping() {
    fetch(APIConstants.REQUESTS_API_ROOT + '/scraping/telegram/get', {
      headers: new Headers({
        'x-access-token': getAccessToken(),
      })
    }).then((response) => {
      return response.json();/////////////
    }).then((jr) => {
      const jsonResponse = jr;
      const listChannel =
        React.createElement('div', {},
          React.createElement('ul', {},
            jsonResponse['channel_username'].map((item) => React.createElement('li', {},
              // React.createElement('form', { method: 'POST', action: APIConstants.REQUESTS_API_ROOT + '/scraping/telegram/channel/delete' },
              React.createElement('form', { onSubmit: this.onChannelDeleteHandler },
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
              // React.createElement('form', { method: 'POST', action: APIConstants.REQUESTS_API_ROOT + '/scraping/telegram/group/delete' },
              React.createElement('form', { onSubmit: this.onGroupDeleteHandler },

                React.createElement('a', { href: 'https://t.me/' + item, target: '_blank' }, item),
                React.createElement('input', { type: 'hidden', value: item, name: 'username' }),
                React.createElement('div', {}),
                React.createElement('button', { type: 'submit', className: 'btn btn-sm btn-danger' }, '\u2715 Delete')),
              React.createElement('div', {})))
          )
        );

      this.setState({ currentlyScrapingChannel: listChannel, currentlyScrapingGroup: listGroup });

    });
  }

  fetchAndRenderDataAvailable() {
    fetch(APIConstants.TELEGRAM_API_ROOT + '/telegram/channel/all-scraped', {
      headers: new Headers({
        'x-access-token': getAccessToken(),
      })
    }).then((response) => {
      return response.json();
    }).then((jsonResponse) => {
      const list = jsonResponse.sort((a, b) => a.date_of_scrapting < b.date_of_scrapting ? 1 : -1).map((item) => React.createElement('div', {},
        React.createElement('a', { href: '/telegram?id=' + item['_id'] + '&type=channel' }, item['channel_username']), React.createElement('p', {}, new Date(item['date_of_scrapting']).toDateString())
      ));
      this.setState({ channelsScraped: list });

    });

    fetch(APIConstants.TELEGRAM_API_ROOT + '/telegram/group/all-scraped', {
      headers: new Headers({
        'x-access-token': getAccessToken(),
      })
    }).then((response) => {
      return response.json();
    }).then((jsonResponse) => {
      const list = jsonResponse.sort((a, b) => a.date_of_scrapting < b.date_of_scrapting ? 1 : -1).map((item) => React.createElement('div', {},
        React.createElement('a', { href: '/telegram?id=' + item._id + '&type=group' }, item['group_username']), React.createElement('p', {}, new Date(item['date_of_scrapting']).toDateString())
      ));
      this.setState({ groupsScraped: list });

    });
  }


  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <div className="row">
          <div className="col-md-6" style={{ padding: '5%', textAlign: 'center' }}>
            <img src={imgTgChannel} alt="card" height="300" style={{ borderRadius: '50%' }} />
            <br />
            <br />
            <br />
            <div style={{ textAlign: "center", marginBottom: '10%' }}>
              <h3><b>CHANNELS</b></h3>
              {/* <p>Content for the requested users were scrapped in the following dates!</p> */}
              <p>Click on a username to continue!</p>
              <br />
              <div style={{ height: '350px', overflowY: 'scroll', border: 'solid 1px #eee' }}>{this.state.channelsScraped}</div>
            </div>



            <div id="currently-scraping-user">
              <p>The telegram scraper is currently working on the following <b>CHANNELS</b></p>
              {this.state.currentlyScrapingChannel}
            </div>
            <div style={{ margin: "8%" }}></div>

            <div style={{ textAlign: 'center' }} id="add-requests-div">
              <h5 style={{ color: "#444444" }}>ADD NEW REQUEST</h5>
              <p>Enter username to start scraping</p>
              {/* <CommonComponents.AddRequestField hint="Enter link here" action={APIConstants.REQUESTS_API_ROOT + "/scraping/telegram/channel/add"} name='username' /> */}
              <CommonComponents.AddRequestField hint="Enter link here" on_submit={this.onChannelAddHandler} name='username' />
            </div>



          </div>
          <div className="col-md-6" style={{ padding: '5%', textAlign: 'center' }}>
            <img src={imgTgGroup} alt="card" height="300" />
            <br />
            <br />
            <br />
            <div style={{ textAlign: "center", marginBottom: '10%' }}>

              <h3><b>GROUPS</b></h3>
              {/* <p>Content for the requested pages or groups were scrapped in the following dates!</p> */}
              <p>Click on username to continue!</p>
              <br />
              <div style={{ height: '350px', overflowY: 'scroll', border: 'solid 1px #eee' }}>{this.state.groupsScraped}</div>
            </div>

            <div id="currently-scraping-group">
              <p>The telegram scraper is currently working on the following <b>GROUPS</b></p>
              {this.state.currentlyScrapingGroup}
            </div>
            <div style={{ margin: "8%" }}></div>


            <div style={{ textAlign: 'center' }} id="add-requests-div">
              <h5 style={{ color: "#444444" }}>ADD NEW REQUEST</h5>
              <p>Enter username to start scraping</p>
              {/* <CommonComponents.AddRequestField hint="Enter link here" action={APIConstants.REQUESTS_API_ROOT + "/scraping/telegram/group/add"} name='username' /> */}
              <CommonComponents.AddRequestField hint="Enter link here" on_submit={this.onGroupAddHandler} name='username' />
            </div>
          </div>


        </div>
      </React.Fragment>
    );
  }
}

export default PreTelegram;
