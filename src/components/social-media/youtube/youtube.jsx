import React, { Component } from "react";
import { Collapse } from 'react-collapse';

import getAccessToken from "../../../common/GlobalsFunctions";
import APIConstants from "../../../constants/constants";

import CommonComponents from "../../common/common";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";

class Youtube extends Component {

  state = { availablePages: 'Loading . . .', collapseExpand: [] };

  static data = [];

  state = {
    currentlyScraping: [],
    availablePages: 'Loading . . .'
  };

  componentWillMount() {
    this.fetchAndRenderData();
    this.fetchAndRenderDataAvailable();
  }


  onlinkAddHandler = (e) => {
    e.preventDefault();
    axios.post(APIConstants.REQUESTS_API_ROOT + '/scraping/youtube/add', { 'link': e.target.link.value }, {
      headers: { 'x-access-token': getAccessToken() }
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

  // onlinkDeleteHandler = (e) => {
  //   e.preventDefault();

  // }

  onlinkDeleteHandler = (link) => {
    axios.post(APIConstants.REQUESTS_API_ROOT + '/scraping/linkedin/delete', { 'link': link }, {
      headers: { 'x-access-token': getAccessToken() }
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
    fetch(APIConstants.REQUESTS_API_ROOT + '/scraping/linkedin/get', {
      headers: new Headers({
        'x-access-token': getAccessToken(),
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
    this.state.collapseExpand[index] = !this.state.collapseExpand[index];
    this.renderData();
  }


  fetchAndRenderDataAvailable() {
    fetch(APIConstants.LINKEDIN_API_ROOT + '/linkedin/all-scraped', {
      headers: new Headers({
        'x-access-token': getAccessToken(),
      })
    }).then((response) => {
      return response.json();
    }).then((jsonResponse) => {
      this.data = jsonResponse;
      console.log(this.data);
      this.state.collapseExpand = [...Array(jsonResponse.length).keys()].map((item) => false);
      // alert(this.state.collapseExpand.toString())
      this.renderData();

    });
  }

  renderData() {


    fetch(APIConstants.TWITTER_API_ROOT + '/youtube/all-videos', {
      headers: new Headers({
        'x-access-token': getAccessToken(),
      })
    }).then((response) => {
      console.log(response);
      return response.json();
    }).then((jsonResponse) => {

      const list = jsonResponse.map((item) => React.createElement('div', { className: 'col-md-4', },
      React.createElement('h4', {}, item.post[0]['title']),

      React.createElement('a', {href:item.url}, item.url),

      React.createElement('p', {}, 
        React.createElement('b', {}, 'Number of Views:  '),
        React.createElement('span', {}, item.post[0].numberofViews),
      ),
      React.createElement('p', {}, 
      React.createElement('b', {}, 'Number of Likes:  '),
        React.createElement('span', {}, item.post[0].numberoflikes),
      ),
      
      React.createElement('p', {}, 
        React.createElement('b', {}, 'Channel Name:  '),
        React.createElement('a', {href:item.post[0].channel[0].channel_url}, item.post[0].channel[0].channel_name),
      ),
      
     
      React.createElement('a', { className: 'btn btn-sm btn-primary', href: '/youtube/comments/?doc-id=' +item._id }, 'Go To Comments \u279c'
      ),
      

      React.createElement('hr', {})
      ));





      this.setState({ availablePages: list });

    });



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


        {/* <div>
          <h4 style={{ color: "#444444" }}>CURRENTLY SCRAPING</h4>
          <p>The linkedin scraper is currently working on the following links</p>
          {this.state.currentlyScraping}
        </div> */}
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
