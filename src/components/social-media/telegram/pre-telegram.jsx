import React, { Component, useState } from "react";

import CommonComponents from "../../common/common";
import axios from "axios";
import imgTgGroup from "../../../assets/img/telegramGroup.png";
import imgTgChannel from "../../../assets/img/telegramChannel.jpg";


import globalFunctions from "../../../common/GlobalsFunctions";
import APIConstants from "../../../constants/constants";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



class PreTelegram extends Component {
  state = {
    channelsScraped: 'Loading . . .',
    groupsScraped: 'Loading . . .',
    currentlyScrapingChannel: [],
    currentlyScrapingGroup: [],
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
        'x-access-token': globalFunctions.getAccessToken()
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

  onChannelDeleteHandler = (item) => {
    axios.post(APIConstants.REQUESTS_API_ROOT + '/scraping/telegram/channel/delete', { 'username': item }, {
      headers: {
        'x-access-token': globalFunctions.getAccessToken()
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
        'x-access-token': globalFunctions.getAccessToken()
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

  onGroupDeleteHandler = (item) => {
    axios.post(APIConstants.REQUESTS_API_ROOT + '/scraping/telegram/group/delete', { 'username': item }, {
      headers: {
        'x-access-token': globalFunctions.getAccessToken()
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
        'x-access-token': globalFunctions.getAccessToken(),
      })
    }).then((response) => {
      return response.json();/////////////
    }).then((jr) => {
      const jsonResponse = jr;
      // const listChannel =
      //   React.createElement('div', {},
      //     React.createElement('ul', {},
      //       jsonResponse['channel_username'].map((item) => React.createElement('li', {},
      //         // React.createElement('form', { method: 'POST', action: APIConstants.REQUESTS_API_ROOT + '/scraping/telegram/channel/delete' },
      //         React.createElement('form', { onSubmit: this.onChannelDeleteHandler },
      //           React.createElement('a', { href: 'https://t.me/' + item, target: '_blank' }, item),
      //           React.createElement('input', { type: 'hidden', value: item, name: 'username' }),
      //           React.createElement('div', {}),
      //           React.createElement('button', { type: 'submit', className: 'btn btn-sm btn-danger' }, '\u2715 Delete')),
      //         React.createElement('div', {})))
      //     )
      //   );

      const listChannel = jsonResponse['channel_username'].map((item, index) => {
        return { 'number': index + 1, 'username_link': item, 'action_delete': <button className="btn btn-sm btn-danger" onClick={() => { this.onChannelDeleteHandler(item) }}>Delete</button>, 'action_open': <a href={'https://t.me/' + item} target="_blank" className="btn btn-sm btn-warning" >Open</a> };
      });

      // const listGroup =
      //   React.createElement('div', {},
      //     React.createElement('ul', {},
      //       jsonResponse['group_username'].map((item) => React.createElement('li', {},
      //         // React.createElement('form', { method: 'POST', action: APIConstants.REQUESTS_API_ROOT + '/scraping/telegram/group/delete' },
      //         React.createElement('form', { onSubmit: this.onGroupDeleteHandler },

      //           React.createElement('a', { href: 'https://t.me/' + item, target: '_blank' }, item),
      //           React.createElement('input', { type: 'hidden', value: item, name: 'username' }),
      //           React.createElement('div', {}),
      //           React.createElement('button', { type: 'submit', className: 'btn btn-sm btn-danger' }, '\u2715 Delete')),
      //         React.createElement('div', {})))
      //     )
      //   );

      const listGroup = jsonResponse['group_username'].map((item, index) => {
        return { 'number': index + 1, 'username_link': item, 'action_delete': <button className="btn btn-sm btn-danger" onClick={() => { this.onGroupDeleteHandler(item) }}>Delete</button>, 'action_open': <a href={'https://t.me/' + item} target="_blank" className="btn btn-sm btn-warning" >Open</a> };
      });


      this.setState({ currentlyScrapingChannel: listChannel, currentlyScrapingGroup: listGroup });

    });
  }

  fetchAndRenderDataAvailable() {
    fetch(APIConstants.TELEGRAM_API_ROOT + '/telegram/channel/all-scraped', {
      headers: new Headers({
        'x-access-token': globalFunctions.getAccessToken(),
      })
    }).then((response) => {
      return response.json();
    }).then((jsonResponse) => {
      const list = jsonResponse.sort((a, b) => a.date_of_scrapting < b.date_of_scrapting ? 1 : -1).map((item) => React.createElement('div', { className: "col-md-2" },
        React.createElement('img', { src: imgTgChannel, width: "100px", style: { borderRadius: "50%" } }),
        React.createElement('a', { href: '/telegram?id=' + item['_id'] + '&type=channel' }, item['channel_username']), React.createElement('p', {}, new Date(item['date_of_scrapting']).toDateString())
      ));
      this.setState({ channelsScraped: list });

    });

    fetch(APIConstants.TELEGRAM_API_ROOT + '/telegram/group/all-scraped', {
      headers: new Headers({
        'x-access-token': globalFunctions.getAccessToken(),
      })
    }).then((response) => {
      return response.json();
    }).then((jsonResponse) => {
      const list = jsonResponse.sort((a, b) => a.date_of_scrapting < b.date_of_scrapting ? 1 : -1).map((item) => React.createElement('div', { className: "col-md-2" },
        React.createElement('img', { src: imgTgGroup, width: "100px", style: { borderRadius: "50%" } }),
        React.createElement('a', { href: '/telegram?id=' + item._id + '&type=group' }, item['group_username']), React.createElement('p', {}, new Date(item['date_of_scrapting']).toDateString())
      ));
      this.setState({ groupsScraped: list });

    });
  }


  render() {
    return (
      <React.Fragment>

        <ToastContainer
          position="bottom-center"
          className="toast-container"
          theme="colored"
        />

        <div style={{ textAlign: "center", marginTop: "2%" }}> <h3><b>TELEGRAM CHANNELS</b></h3></div>
        <CommonComponents.SearchBox action="#" />
        <br />
        <br />
        <br />
        <div className="container">
          <div className="row" style={{ maxHeight: "100vh", overflowY: "scroll" }}>
            {this.state.channelsScraped}

          </div>

          <div style={{ textAlign: "center", marginTop: "10%" }}>
            <h3><b>SCRAPING REQUESTS</b></h3>
          </div>

          <div className="container">
            <CommonComponents.ScrapingTable tableData={this.state.currentlyScrapingChannel} />
          </div>

          <div style={{ textAlign: 'center', margin: "3%" }} id="add-requests-div">
            <h5 style={{ color: "#444444" }}><b>ADD NEW REQUEST</b></h5>
            <p>Enter username to start scraping</p>
            {/* <CommonComponents.AddRequestField hint="Enter link here" action={APIConstants.REQUESTS_API_ROOT + "/scraping/telegram/channel/add"} name='username' /> */}
            <CommonComponents.AddRequestField hint="Enter link here" on_submit={this.onChannelAddHandler} name='username' />
          </div>


          <hr />
          <hr />


          <div style={{ textAlign: "center", marginTop: "10%" }}> <h3><b>TELEGRAM GROUPS</b></h3></div>
          <CommonComponents.SearchBox action="#" />
          <br />
          <br />
          <br />
          <div className="container">
            <div className="row" style={{ maxHeight: "100vh", overflowY: "scroll" }}>
              {this.state.groupsScraped}
            </div>

          </div>

          <div style={{ textAlign: "center", marginTop: "10%" }}>
            <h3><b>SCRAPING REQUESTS</b></h3>
          </div>

          <div className="container">
            <CommonComponents.ScrapingTable tableData={this.state.currentlyScrapingGroup} />
          </div>
          <div style={{ textAlign: 'center', marginTop: "3%", marginBottom: "5%" }} id="add-requests-div">
            <h5 style={{ color: "#444444" }}><b>ADD NEW REQUEST</b></h5>
            <p>Enter username to start scraping</p>
            {/* <CommonComponents.AddRequestField hint="Enter link here" action={APIConstants.REQUESTS_API_ROOT + "/scraping/telegram/channel/add"} name='username' /> */}
            <CommonComponents.AddRequestField hint="Enter link here" on_submit={this.onGroupAddHandler} name='username' />
          </div>

          <hr />
          <hr />

        </div>


      </React.Fragment>
    );
  }
}

export default PreTelegram;
