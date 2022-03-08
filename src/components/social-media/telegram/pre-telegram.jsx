import React, { Component, useState } from "react";

import { Collapse } from "react-collapse";

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
    collapseExpandChannel: [],
    collapseExpandGroup: []
  };

  static channelData = [];
  static channelDateData = {};
  static groupData = [];
  static groupDateData = {};

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

  updateShowCollapse(index, type) {
    if (type == 'channel') {
      for (var i = 0; i < index; i++) {
        this.state.collapseExpandChannel[i] = false;
      }
      for (var i = index + 1; i < this.state.collapseExpandChannel.length; i++) {
        this.state.collapseExpandChannel[i] = false;
      }

      this.state.collapseExpandChannel[index] = !this.state.collapseExpandChannel[index];
      this.renderChannelData();
    } else if (type == 'group') {

      for (var i = 0; i < index; i++) {
        this.state.collapseExpandGroup[i] = false;
      }
      for (var i = index + 1; i < this.state.collapseExpandGroup.length; i++) {
        this.state.collapseExpandGroup[i] = false;
      }

      this.state.collapseExpandGroup[index] = !this.state.collapseExpandGroup[index];
      this.renderGroupData();
    }
  }

  renderChannelData() {

    var widgets = {};

    // [...dateJobMap.keys()].map(jobsForDate =>
    //   jobsForDate.map(job => (
    //     <TruckJobComp job={job} />
    //   ))
    // )

    // this.channelDateData.sort((a, b) => a.date_of_scrapting < b.date_of_scrapting ? 1 : -1);

    for (const [key, value] of Object.entries(this.channelDateData)) {
      var tmpWidget = [];
      value.map((item) => tmpWidget.push(React.createElement('p', {}, React.createElement('a', { href: '/telegram?id=' + item['id'] + '&type=channel' }, (item.date == null || item.date == undefined) ? 'Unknown Date' : new Date(item.date).toDateString() + ',  ' + new Date(item.date).toLocaleTimeString()))));
      widgets[key] = React.createElement('div', { style: { overflowY: "scroll", maxHeight: '25vh', border: "1px solid brown", marginTop: "10px", padding: "15px" } }, tmpWidget);
    }



    const list = this.channelData.sort((a, b) => a.date_of_scrapting < b.date_of_scrapting ? 1 : -1).map((item, i) => {
      var itemDateData = this.channelDateData[item.channel_username];
      return React.createElement('div', { className: "col-md-3", textAlign: "center" },
        React.createElement('img', { src: imgTgChannel, width: "150px", style: { borderRadius: "50%" } }),
        React.createElement('br'),
        React.createElement('h4', {}, item['channel_username']),


        itemDateData.length > 1 ? React.createElement('p', {}, 'Scraped ' + itemDateData.length
          + ' times from ',
          React.createElement('a', { href: '/telegram?id=' + itemDateData[itemDateData.length - 1]['id'] + '&type=channel' }, new Date(itemDateData[itemDateData.length - 1]['date']).toDateString()),
          React.createElement('span', {}, ' to '),
          React.createElement('a', { href: '/telegram?id=' + itemDateData[0]['id'] + '&type=channel' }, new Date(itemDateData[0]['date']).toDateString())) : React.createElement('span', {}, ''),



        React.createElement('a', { onClick: () => this.updateShowCollapse(i, 'channel'), href: "#?" }, this.state.collapseExpandChannel[i] ? 'Hide Scraping Dates \u25b2' : 'Show All Scraping Dates \u25bc'),

        React.createElement(Collapse, { isOpened: this.state.collapseExpandChannel[i] },
          widgets[item.channel_username]
        ),
      )
    });
    this.setState({ channelsScraped: list });
  }

  renderGroupData() {


    var widgets = {};

    for (const [key, value] of Object.entries(this.groupDateData)) {
      var tmpWidget = [];
      value.map((item) => tmpWidget.push(React.createElement('p', {}, React.createElement('a', { href: '/telegram?id=' + item['id'] + '&type=group' }, (item.date == null || item.date == undefined) ? 'Unknown Date' : new Date(item.date).toDateString() + ',  ' + new Date(item.date).toLocaleTimeString()))));
      widgets[key] = React.createElement('div', { style: { overflowY: "scroll", maxHeight: '25vh', border: "1px solid brown", marginTop: "10px", padding: "15px" } }, tmpWidget);
    }



    const list = this.groupData.sort((a, b) => a.date_of_scrapting < b.date_of_scrapting ? 1 : -1).map((item, i) => {
      var itemDateData = this.groupDateData[item.group_username];
      return React.createElement('div', { className: "col-md-3", textAlign: "center" },
        React.createElement('img', { src: imgTgGroup, width: "150px", style: { borderRadius: "50%" } }),
        React.createElement('br'),
        React.createElement('h4', {}, item['group_username']),


        itemDateData.length > 1 ? React.createElement('p', {}, 'Scraped ' + itemDateData.length
          + ' times from ',
          React.createElement('a', { href: '/telegram?id=' + itemDateData[itemDateData.length - 1]['id'] + '&type=group' }, new Date(itemDateData[itemDateData.length - 1]['date']).toDateString()),
          React.createElement('span', {}, ' to '),
          React.createElement('a', { href: '/telegram?id=' + itemDateData[0]['id'] + '&type=group' }, new Date(itemDateData[0]['date']).toDateString())) : React.createElement('span', {}, ''),




        React.createElement('a', { onClick: () => this.updateShowCollapse(i, 'group'), href: "#?" }, this.state.collapseExpandGroup[i] ? 'Hide Scraping Dates \u25b2' : 'Show All Scraping Dates \u25bc'),

        React.createElement(Collapse, { isOpened: this.state.collapseExpandGroup[i] },
          widgets[item.group_username]
        ),
      );
    });
    this.setState({ groupsScraped: list });
  }

  fetchAndRenderDataAvailable() {
    fetch(APIConstants.TELEGRAM_API_ROOT + '/telegram/channel/all-scraped', {
      headers: new Headers({
        'x-access-token': globalFunctions.getAccessToken(),
      })
    }).then((response) => {
      return response.json();
    }).then((jsonResponse) => {



      var indexedUsernames = [];
      var scrapingDates = {};
      var uniqueUsernameData = [];

      jsonResponse.sort((a, b) => a.date_of_scrapting < b.date_of_scrapting ? 1 : -1);
      jsonResponse.map((response) => {
        if (indexedUsernames.includes(response.channel_username)) {
          scrapingDates[response.channel_username].push({ "date": response.date_of_scrapting, "id": response._id });
        } else {
          scrapingDates[response.channel_username] = [{ "date": response.date_of_scrapting, "id": response._id }];
          indexedUsernames.push(response.channel_username);
          uniqueUsernameData.push(response);
        }
      });

      this.state.collapseExpandChannel = [...Array(indexedUsernames.length).keys()].map((item) => false);

      this.channelData = JSON.parse(JSON.stringify(uniqueUsernameData));
      this.channelDateData = JSON.parse(JSON.stringify(scrapingDates));
      this.renderChannelData();


    });







    fetch(APIConstants.TELEGRAM_API_ROOT + '/telegram/group/all-scraped', {
      headers: new Headers({
        'x-access-token': globalFunctions.getAccessToken(),
      })
    }).then((response) => {
      return response.json();
    }).then((jsonResponse) => {


      var indexedUsernames = [];
      var scrapingDates = {};
      var uniqueUsernameData = [];

      jsonResponse.sort((a, b) => a.date_of_scrapting < b.date_of_scrapting ? 1 : -1);
      jsonResponse.map((response) => {
        if (indexedUsernames.includes(response.group_username)) {
          scrapingDates[response.group_username].push({ "date": response.date_of_scrapting, "id": response._id });
        } else {
          scrapingDates[response.group_username] = [{ "date": response.date_of_scrapting, "id": response._id }];
          indexedUsernames.push(response.group_username);
          uniqueUsernameData.push(response);
        }
      });

      this.state.collapseExpandGroup = [...Array(indexedUsernames.length).keys()].map((item) => false);

      this.groupData = JSON.parse(JSON.stringify(uniqueUsernameData));
      this.groupDateData = JSON.parse(JSON.stringify(scrapingDates));
      this.renderGroupData();


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
