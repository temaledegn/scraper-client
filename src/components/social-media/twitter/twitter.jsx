import React, { Component } from "react";

import CommonComponents from "../../common/common";
import { Collapse } from "react-collapse";

// import realdonaldtrump from "../../../assets/img/scraped/realdonaldtrump.jpg";
// import tigraywillwin from "../../../assets/img/scraped/tigraywillwin.jpg";
// import h8oicpmj5cu21ws from "../../../assets/img/scraped/h8oicpmj5cu21ws.jpg";
// import eoap5q8gql11egl from "../../../assets/img/scraped/eoap5q8gql11egl.jpg";
// import tigraiadey from "../../../assets/img/scraped/tigraiadey.jpg";
// import shegerfm from "../../../assets/img/scraped/shegerfm.jpg";

import globalFunctions from "../../../common/GlobalsFunctions";
import APIConstants from "../../../constants/constants";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

class Twitter extends Component {
  state = {
    currentlyScraping: [],
    availablePages: 'Loading . . .',
    datesCollapseExpand: []
  };

  static data = [];
  static dateData = {};

  componentWillMount() {
    this.fetchAndRenderData();
    this.fetchAndRenderDataAvailable();
  }


  onUsernameAddHandler = (e) => {
    e.preventDefault();
    axios.post(APIConstants.REQUESTS_API_ROOT + '/scraping/twitter/add', { 'username': e.target.username.value }, {
      headers: { 'x-access-token': globalFunctions.getAccessToken() }
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
        this.fetchAndRenderData();
      });
  }

  onUsernameDeleteHandler = (item) => {
    axios.post(APIConstants.REQUESTS_API_ROOT + '/scraping/twitter/delete', { 'username': item }, {
      headers: { 'x-access-token': globalFunctions.getAccessToken() }
    })
      .then((response) => {
        if (response.data.type == 'success') {
          toast.success(response.data.message);
        } else if (response.data.type == 'warning') {
          toast.warning(response.data.message);
        } else if (response.data.type == 'error') {
          toast.error(response.data.message);
        }
        this.fetchAndRenderData();
      });
  }


  fetchAndRenderData() {
    fetch(APIConstants.REQUESTS_API_ROOT + '/scraping/twitter/get', {
      headers: new Headers({
        'x-access-token': globalFunctions.getAccessToken(),
      })
    }).then((response) => {
      return response.json();
    }).then((jsonResponse) => {

      const list = jsonResponse.map((item, index) => {
        return { 'number': index + 1, 'username_link': item, 'action_delete': <button className="btn btn-sm btn-danger" onClick={() => { this.onUsernameDeleteHandler(item) }}>Delete</button>, 'action_open': <a href={'https://www.twitter.com/@' + item} target="_blank" className="btn btn-sm btn-warning" >Open</a> };
      });
      this.setState({ currentlyScraping: list });
    });


  }


  updateShowCollapse(index) {
    for (var i = 0; i < index; i++) {
      this.state.collapseExpand[i] = false;
    }
    for (var i = index + 1; i < this.state.collapseExpand.length; i++) {
      this.state.collapseExpand[i] = false;
    }

    this.state.collapseExpand[index] = !this.state.collapseExpand[index];
    this.renderData();
  }

  fetchAndRenderDataAvailable() {
    fetch(APIConstants.TWITTER_API_ROOT + '/twitter/all-users', {
      headers: new Headers({
        'x-access-token': globalFunctions.getAccessToken(),
      })
    }).then((response) => {
      return response.json();
    }).then((jsonResponse) => {
      const emptyUsernameRemoved = jsonResponse.filter(item => (item.UserName != '' && item.UserName != null));


      var indexedUsernames = [];
      var scrapingDates = {};
      var uniqueUsernameData = [];
      // emptyUsernameRemoved.sort((a, b) => a.Date_of_Scraping < b.Date_of_Scraping ? 1 : -1);

      emptyUsernameRemoved.map((response) => {
        if (indexedUsernames.includes(response.UserName)) {
          scrapingDates[response.UserName].push({ "date": response.Date_of_Scraping, "id": response._id });
        } else {
          scrapingDates[response.UserName] = [{ "date": response.Date_of_Scraping, "id": response._id }];
          indexedUsernames.push(response.UserName);
          uniqueUsernameData.push(response);
        }
      });
      this.state.collapseExpand = [...Array(indexedUsernames.length).keys()].map((item) => false);

      for (const [key, value] of Object.entries(scrapingDates)) {
        value.sort((a, b) => a.date < b.date ? 1 : -1);
      }

      this.data = JSON.parse(JSON.stringify(uniqueUsernameData));
      this.dateData = JSON.parse(JSON.stringify(scrapingDates));
      this.renderData();

    });
  }

  renderData() {
    var widgets = {};

    for (const [key, value] of Object.entries(this.dateData)) {
      var tmpWidget = [];
      value.map((item) => tmpWidget.push(React.createElement('p', {}, React.createElement('a', { href: '/twitter/page/' + key.substring(1) + '?doc-id=' + item.id }, (item.date == null || item.date == undefined) ? 'Unknown Date' : new Date(item.date).toDateString() + ',  ' + new Date(item.date).toLocaleTimeString()))));
      widgets[key] = React.createElement('div', { style: { overflowY: "scroll", maxHeight: '25vh', border: "1px solid #eeee33", marginTop: "10px", padding: "15px" } }, tmpWidget);
    }





    const list = this.data.map((item, i) => React.createElement('div', { className: 'col-md-3', },
      React.createElement('h5', {}, React.createElement('b', {}, item.Fullname)),
      React.createElement('p', {},
        React.createElement('b', {}, 'Username: '),
        React.createElement('a', { href: 'https://www.twitter.com/' + item.UserName, target: 'blank' }, item.UserName),
      ),
      React.createElement('p', {},
        React.createElement('b', {}, 'About: '),
        React.createElement('span', {}, item.Description),
      ),
      React.createElement('p', {},
        React.createElement('b', {}, 'Tweets: '),
        React.createElement('span', {}, item.Tweets),
      ),
      React.createElement('p', {},
        React.createElement('b', {}, 'Followers: '),
        React.createElement('span', {}, item['Number of Followers']),
      ),
      React.createElement('p', {},
        React.createElement('b', {}, 'Following: '),
        React.createElement('span', {}, item['Number of Followings']),
      ),
      React.createElement('p', {},
        React.createElement('b', {}, 'Joined Date: '),
        React.createElement('span', {}, item.Joined_date.replace('Joined ', '')),
      ),
      React.createElement('a', { onClick: () => this.updateShowCollapse(i), href: "#?" }, this.state.collapseExpand[i] ? 'Hide Scraping Dates \u25b2' : 'Show Scraping Dates \u25bc'),

      React.createElement(Collapse, { isOpened: this.state.collapseExpand[i] },
        widgets[item.UserName]
      ),

      React.createElement('div', { style: { marginTop: "15%" } })
    ));
    this.setState({ availablePages: list });
  }

  render() {
    return (
      <div style={{ margin: "1% 4% 0 4%" }}>
        <ToastContainer
          position="bottom-center"
          className="toast-container"
          theme="colored"
        />


        <div style={{ textAlign: "center", marginTop: "2%" }}> <h3><b>TWITTER</b></h3><a href={APIConstants.STATISTICS_API_ROOT + "/app/dashboards#/view/3ea81100-63f2-11ec-b6bf-37cf416580cd?_a=(viewMode:edit)&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now))"} target="_blank">GET STATISTICS</a></div>
        <CommonComponents.SearchBox action="/twitter/search" />
        <div style={{ textAlign: "center", margin: "5% 0 2% 0" }}>
          <h2 style={{ color: "#555555" }}>
            <b>AVAILABLE PAGES</b>
          </h2>
        </div>
        <div className='row' style={{ maxHeight: "100vh", overflowY: "scroll" }}> {this.state.availablePages}</div>
        {/* 
        <div style={{ textAlign: "center", margin: "5% 0 2% 0" }}>
          <h2 style={{ color: "#555555" }}>
            <b>MOST POPULAR</b>
          </h2>
        </div>
        <div className="row">
          <CommonComponents.FreqCard
            link="/twitter/page/realdonaldtrump"
            btn_text="Go To Tweets"
            title="Donald J. Trump"
            image={realdonaldtrump}
            sm="twitter"
            type='nodata'
          />
          <CommonComponents.FreqCard
            link="/twitter/page/tigraywillwin"
            btn_text="Go To Tweets"
            title="ስሑል ኣብርሃ"
            image={tigraywillwin}
            sm="twitter"
            type='nodata'
          />
          <CommonComponents.FreqCard
            link="/twitter/page/h8oicpmj5cu21ws"
            btn_text="Go To Tweets"
            title="ሪም ትግራይ"
            image={h8oicpmj5cu21ws}
            sm="twitter"
            type='nodata'
          />
          <CommonComponents.FreqCard
            link="/twitter/page/eoap5q8gql11egl"
            btn_text="Go To Tweets"
            title="ምፅላል ተፈሪ"
            image={eoap5q8gql11egl}
            sm="twitter"
            type='nodata'
          />
          <CommonComponents.FreqCard
            link="/twitter/page/tigraiadey"
            btn_text="Go To Tweets"
            title="ትግራይ ዓደይ"
            image={tigraiadey}
            sm="twitter"
            type='nodata'
          />
          <CommonComponents.FreqCard
            link="/twitter/page/shegerfm"
            btn_text="Go To Tweets"
            title="ሸገር 102.1"
            image={shegerfm}
            sm="twitter"
            type='nodata'
          />
        </div> */}



        <div style={{ textAlign: "center", marginTop: "3%" }}>
          <h3><b>SCRAPING REQUESTS</b></h3>
        </div>


        <div className="container">
          <CommonComponents.ScrapingTable tableData={this.state.currentlyScraping} />
        </div>

        <div style={{ margin: "5%" }}></div>

        <div style={{ textAlign: 'center' }} id="add-requests-div">
          <h4 style={{ color: "#444444" }}><b>ADD NEW REQUEST</b></h4>
          <br />

          <CommonComponents.AddRequestField hint="Enter link here" on_submit={this.onUsernameAddHandler} name='username' />

        </div>




        <div style={{ margin: "5%" }}></div>

      </div>
    );
  }
}

export default Twitter;
