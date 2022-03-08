import React, { Component } from "react";
import { Collapse } from 'react-collapse';

import globalFunctions from "../../../common/GlobalsFunctions";
import APIConstants from "../../../constants/constants";

import CommonComponents from "../../common/common";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";


class ReportWidget extends React.Component {

  constructor(props) {
    super(props);
    this.state = { reporting: props.reporting, contentId: props.contentId };
  }


  render() {
    if (this.state.reporting == 'false') {
      return React.createElement('button', { disabled: true, id: this.props._id, className: "btn btn-sm btn-warning", onClick: () => { onHandleReport(this.props._type, this.props.contentId, this) } }, 'Report');
    } else if (this.state.reporting == 'pending') {
      return React.createElement('span', { id: this.props._id, },
        React.createElement('i', { className: 'fa fa-spinner', style: { color: 'orange' } }, ''),
        React.createElement('span', {}, ' Pending...')
      );
    } else if (this.state.reporting == 'true') {
      return React.createElement('span', { id: this.props._id, },
        React.createElement('i', { className: 'fa fa-check-circle', style: { color: 'green' } }, ''),
        React.createElement('span', {}, 'Reported')
      );
    } else {
      return 'N/A';
    }
  };
}


let onHandleReport = (_type, _id, button) => {
  axios.post(APIConstants.REQUESTS_API_ROOT + '/reporting/youtube/add', { 'reporting_data': _type + ',' + _id + ',' + globalFunctions.getUserId() }, {
    headers: { 'x-access-token': globalFunctions.getAccessToken() }
  })
    .then((response) => {
      if (response.data.type == 'success') {
        toast.success(response.data.message);
        button.setState({
          reporting: 'pending'
        });
      } else if (response.data.type == 'warning') {
        toast.warning(response.data.message);
        button.setState({
          reporting: 'pending'
        });

      } else if (response.data.type == 'error') {
        toast.error(response.data.message);
      }
    });
}


let currentlyReporting = [];

class Youtube extends Component {

  static data = [];
  static dateData = [];

  state = {
    currentlyScraping: [],
    availablePages: 'Loading . . .',
    datesCollapseExpand: [],
  };

  componentWillMount() {
    this.fetchAndRenderData();
    this.fetchAndRenderDataAvailable();
  }


  onlinkAddHandler = (e) => {
    e.preventDefault();
    axios.post(APIConstants.REQUESTS_API_ROOT + '/scraping/youtube/add', { 'link': e.target.link.value }, {
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
        e.target.link.value = '';
        this.fetchAndRenderData();
      });
  }


  onlinkDeleteHandler = (link) => {
    axios.post(APIConstants.REQUESTS_API_ROOT + '/scraping/youtube/delete', { 'link': link }, {
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
    fetch(APIConstants.REQUESTS_API_ROOT + '/scraping/youtube/get', {
      headers: new Headers({
        'x-access-token': globalFunctions.getAccessToken(),
      })
    }).then((response) => {
      return response.json();
    }).then((jsonResponse) => {
      let list = [];

      list = jsonResponse.map((item, index) => {
        return { 'number': index + 1, 'username_link': item, 'action_delete': <button className="btn btn-sm btn-danger" onClick={() => { this.onlinkDeleteHandler(item) }}>Delete</button>, 'action_open': <a href={item} target="_blank" className="btn btn-sm btn-warning" >Open</a> };
      });


      this.setState({ currentlyScraping: list });
    });
  }

  updateShowCollapse(index) {
    this.state.datesCollapseExpand[index] = !this.state.datesCollapseExpand[index];
    this.renderData();
  }


  fetchAndRenderDataAvailable() {
    fetch(APIConstants.YOUTUBE_API_ROOT + '/youtube/all-videos', {
      headers: new Headers({
        'x-access-token': globalFunctions.getAccessToken(),
      })
    }).then((response) => {
      return response.json();
    }).then((jsonResponse) => {

      var indexedUrls = [];
      var scrapingDates = {};
      var uniqueUrlData = [];

      jsonResponse.map((response) => {
        if (indexedUrls.includes(response.url)) {
          scrapingDates[response.url].push({ "date": response.date_of_scraping, "id": response._id });
        } else {
          scrapingDates[response.url] = [{ "date": response.date_of_scraping, "id": response._id }];
          indexedUrls.push(response.url);
          uniqueUrlData.push(response);
        }
      });
      this.state.datesCollapseExpand = [...Array(indexedUrls.length).keys()].map((item) => false);

      this.data = JSON.parse(JSON.stringify(uniqueUrlData));
      this.dateData = JSON.parse(JSON.stringify(scrapingDates));


      this.renderData();

    });
  }

  renderData() {

    var widgets = {};

    for (const [key, value] of Object.entries(this.dateData)) {
      var tmpWidget = [];
      value.map((item) => tmpWidget.push(React.createElement('p', {}, React.createElement('a', { href: '/youtube/comments/?doc-id=' + item.id }, (item.date == null || item.date == undefined) ? 'Unknown Date' : item.date))));
      widgets[key] = React.createElement('div', { style: { overflowY: "scroll", maxHeight: '25vh', border: "1px solid brown", marginTop: "10px", padding: "15px" } }, tmpWidget);
    }





    const list = this.data.map((item, i) => React.createElement('div', { className: 'col-md-4', },
      React.createElement('h4', {}, item.title),

      React.createElement('a', { href: item.url }, item.url),
      <br />,
      <br />,
      React.createElement('p', {},
        React.createElement('b', {}, 'Number of Views:  '),
        React.createElement('span', {}, item.views),
      ),
      React.createElement('p', {},
        React.createElement('b', {}, 'Number of Likes:  '),
        React.createElement('span', {}, item.likes),
      ),

      React.createElement('p', {},
        React.createElement('b', {}, 'Channel Name:  '),
        React.createElement('a', { href: item.channel.channel_url, target: '?' }, item.channel.channel_name),
      ),
      React.createElement('p', {},
        React.createElement('b', {}, 'Number of Subscribers:  '),
        React.createElement('span', {}, item.channel.subscribers.replaceAll('subscribers', '')),
      ),


      React.createElement('p', {},
        React.createElement('b', {}, 'Reporting:  '),
        <ReportWidget reporting={item.reporting.is_reported === true ? 'true' : currentlyReporting.includes(item.url) ? 'pending' : 'false'} contentId={item.url} _type='video' />
      ),



      React.createElement('a', { onClick: () => this.updateShowCollapse(i), href: "#?" }, this.state.datesCollapseExpand[i] ? 'Hide Scraping Dates \u25b2' : 'Show Scraping Dates \u25bc'),

      React.createElement(Collapse, { isOpened: this.state.datesCollapseExpand[i] },
        widgets[item.url]
      ),


      React.createElement('hr', {})
    ));





    this.setState({ availablePages: list });





  }

  render() {
    return (
      <div style={{ textAlign: 'left', margin: "0% 5% 5% 5%" }}>

        <ToastContainer
          position="bottom-center"
          className="toast-container"
          theme="colored"
        />


        <div style={{ textAlign: "center", marginTop: "2%" }}> <h3><b>YOUTUBE</b></h3></div>


        <CommonComponents.SearchBox action="#" />

        <div style={{ textAlign: "center", margin: "5% 0 2% 0" }}>
          <h2 style={{ color: "#555555" }}>
            <b>AVAILABLE VIDEO COMMENTS</b>
          </h2>
        </div>
        <div className='row' style={{ maxHeight: "100vh", overflowY: "scroll" }}> {this.state.availablePages}</div>



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

          <CommonComponents.AddRequestField hint="Enter link here" on_submit={this.onlinkAddHandler} name='link' />

        </div>
      </div>
    );
  }
}

export default Youtube;
