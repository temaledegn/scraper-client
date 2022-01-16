import React, { Component } from "react";
import { Collapse } from 'react-collapse';

import globalFunctions from "../../../common/GlobalsFunctions";
import APIConstants from "../../../constants/constants";

import CommonComponents from "../../common/common";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";

class Linkedin extends Component {

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
    axios.post(APIConstants.REQUESTS_API_ROOT + '/scraping/linkedin/add', { 'link': e.target.link.value }, {
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

  // onlinkDeleteHandler = (e) => {
  //   e.preventDefault();

  // }

  onlinkDeleteHandler = (link) => {
    axios.post(APIConstants.REQUESTS_API_ROOT + '/scraping/linkedin/delete', { 'link': link }, {
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
    fetch(APIConstants.REQUESTS_API_ROOT + '/scraping/linkedin/get', {
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
    this.state.collapseExpand[index] = !this.state.collapseExpand[index];
    this.renderData();
  }


  fetchAndRenderDataAvailable() {
    fetch(APIConstants.LINKEDIN_API_ROOT + '/linkedin/all-scraped', {
      headers: new Headers({
        'x-access-token': globalFunctions.getAccessToken(),
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
    const list = (this.data == undefined ? [] : this.data).map((item, i) =>
      React.createElement('div', { className: 'col-md-4' },
        React.createElement('div', { className: '' },
          React.createElement('h4', {},
            React.createElement('a', { onClick: () => this.updateShowCollapse(i), href: "#?" }, item.Full_Name)),
          React.createElement('p', {}, item.Position),
          React.createElement('p', {},
            React.createElement('b', {}, 'Country: '),
            item.Country == 'NULL' ? React.createElement('b', { color: '#eee' }, 'Not Available') : item.Country),
          React.createElement('p', {},
            React.createElement('b', {}, 'Connection : '), item.Connection == 'NULL' ? React.createElement('span', { style: { color: 'grey' } }, 'Not Available') : item.Connection),
          React.createElement('p', {},
            React.createElement('b', {}, 'Company: '), item.company == 'NULL' ? React.createElement('span', { style: { color: 'grey' } }, 'Not Available') : item.company),
          React.createElement('p', {},
            React.createElement('b', {}, 'University: '), item.University == 'NULL' ? React.createElement('span', { style: { color: 'grey' } }, 'Not Available') : item.University),

          React.createElement('p', {},
            React.createElement('b', {}, 'Followers: '), item.Followers == 'NULL' ? React.createElement('span', { style: { color: 'grey' } }, 'Not Available') : item.Followers),
          React.createElement('div', this.state.collapseExpand[i] ? { style: { overflowY: 'scroll', maxHeight: '500px', border: 'solid 2px #ddd', padding: '2% 5% 2% 5%' } } : { style: { overflowY: 'scroll', maxHeight: '500px' } },
            React.createElement(Collapse, { isOpened: this.state.collapseExpand[i] },
              // React.createElement('p', {},
              //   React.createElement('b', {}, 'Country: '),
              //   item.Country == 'NULL' ? React.createElement('b', { color: '#eee' }, 'Not Available') : item.Country),
              // React.createElement('p', {},
              //   React.createElement('b', {}, 'Connection : '), item.Connection == 'NULL' ? React.createElement('span', { style: { color: 'grey' } }, 'Not Available') : item.Connection),
              // React.createElement('p', {},
              //   React.createElement('b', {}, 'Company: '), item.company == 'NULL' ? React.createElement('span', { style: { color: 'grey' } }, 'Not Available') : item.company),
              // React.createElement('p', {},
              //   React.createElement('b', {}, 'University: '), item.University == 'NULL' ? React.createElement('span', { style: { color: 'grey' } }, 'Not Available') : item.University),

              // React.createElement('p', {},
              //   React.createElement('b', {}, 'Followers: '), item.Followers == 'NULL' ? React.createElement('span', { style: { color: 'grey' } }, 'Not Available') : item.Followers),

              React.createElement('b', {}, 'About '),
              React.createElement('p', {}, item.About == 'NULL' ? React.createElement('span', { style: { color: 'grey' } }, 'Not Available') : item.About),

              React.createElement('b', {}, 'Activity: '),
              React.createElement('p', {}, item.Activity == 'NULL' ? React.createElement('span', { style: { color: 'grey' } }, 'Not Available') : item.Activity),

              React.createElement('p', {},
                React.createElement('b', {}, 'Experience: '), (item.Experience).map((item) => React.createElement('div', { className: 'container' },
                  React.createElement('p', {}, 'Position: ' + item.positionE),
                  React.createElement('p', {}, 'Company: ' + item.Company_Name),
                  React.createElement('p', {}, 'Duration: ' + item.date_exprince.replace('Dates Employed', '')),
                  React.createElement('p', {}, 'Experience: ' + item.Employment_Duration),
                  React.createElement('p', {}, 'Location: ', React.createElement('span', {}, (item.location == null || item.location == 'null') ? React.createElement('span', { style: { color: 'grey' } }, 'Not Available') : item.location.replace('Location', ''))),
                  React.createElement('hr')
                ))),

              React.createElement('b', {}, 'Education: '),

              React.createElement('div', { className: 'container' },
                React.createElement('ul', {},
                  item.Edication.map((item) => React.createElement('li', {}, React.createElement('p', {}, React.createElement('b', {}, 'University: '), item.University,), React.createElement('p', {}, React.createElement('b', {}, 'Level: '), item.Degree_Name,), React.createElement('p', {}, React.createElement('b', {}, 'Dates attended or expected graduation: '), item.Expected_graduation == null ? React.createElement('span', { style: { color: 'grey' } }, 'Not Available') : item.Expected_graduation.replace('Dates attended or expected graduation', ''),)))
                )
              ),

              React.createElement('p', {},
                React.createElement('b', {}, 'Licenses & certifications: '), item['Licenses & certifications']),

              React.createElement('b', {}, 'Skills & endorsements: '),
              React.createElement('div', { className: 'container' },
                React.createElement('ul', {},
                  item['Skills & endorsements'].map((item) => React.createElement('li', {}, React.createElement('p', {}, React.createElement('b', {}, 'Skill: '), item.Skill,), React.createElement('p', {}, React.createElement('b', {}, 'Endorsement: '), item.Endorsements,)))
                )
              ),
              React.createElement('hr', {})), React.createElement('div', { style: { margin: '2%' } }))
        )
      )
    );

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


        <div style={{ textAlign: "center", marginTop: "2%" }}> <h3><b>LINKEDIN</b></h3></div>


        <CommonComponents.SearchBox action="#" />
        {/* <div style={{ textAlign: "center", marginTop: "3%" }}>
          <h3><b>SCRAPED PROFILES</b></h3>
        </div> */}
        <div className="row" style={{ marginTop: "3%", marginBottom: "5%", textAlign: "start" }}>
          {this.state.availablePages}
        </div>

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

export default Linkedin;
