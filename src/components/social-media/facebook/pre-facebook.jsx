import React, { Component, useState } from "react";

import CommonComponents from "../../common/common";

import imgFbPageGroup from "../../../assets/img/fb-groups-or-pages.jpg";
import imgFbUser from "../../../assets/img/fb-user.jpg";

import APIConstants from "../../../constants/constants";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

import globalFunctions from "../../../common/GlobalsFunctions";

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { Collapse } from "react-collapse";



class PreFacebook extends Component {
  state = {
    usersDates: 'Loading . . .', groupsDates: 'Loading . . .', currentlyScraping: [], currentlyScrapingUser: [], selectionRange: {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    }, isDateRangeCollapsed: false
  };



  componentWillMount() {
    this.fetchAndRenderData();

    this.fetchAndRenderDataPages();
    this.fetchAndRenderDataUser();
  }

  onPageAddHandler = (e) => {
    e.preventDefault();
    axios.post(APIConstants.REQUESTS_API_ROOT + '/scraping/facebook/page/add', { 'link': e.target.link.value }, {
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
        this.fetchAndRenderDataPages();
      });
  }

  onPageDeleteHandler = (item) => {
    axios.post(APIConstants.REQUESTS_API_ROOT + '/scraping/facebook/page/delete', { 'link': item }, {
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
        this.fetchAndRenderDataPages();
      });
  }

  onUserAddHandler = (e) => {
    e.preventDefault();
    axios.post(APIConstants.REQUESTS_API_ROOT + '/scraping/facebook/user/add', { 'link': e.target.link.value }, {
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
        this.fetchAndRenderDataUser();
      });
  }

  onUserDeleteHandler = (item) => {
    axios.post(APIConstants.REQUESTS_API_ROOT + '/scraping/facebook/user/delete', { 'link': item }, {
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
        this.fetchAndRenderDataUser();
      });
  }

  fetchAndRenderDataPages() {
    fetch(APIConstants.REQUESTS_API_ROOT + '/scraping/facebook/page/get', {
      headers: new Headers({
        'x-access-token': globalFunctions.getAccessToken(),
      })
    }).then((response) => {
      return response.json();
    }).then((jsonResponse) => {
      if (jsonResponse.length > 1 || jsonResponse[0] != '') {
        // const list =
        //   React.createElement('div', { textAlign: 'start' },
        //     React.createElement('ul', {},
        //       jsonResponse.map((item) => React.createElement('li', {},
        //         React.createElement('form', { method: 'POST', onSubmit: this.onPageDeleteHandler },
        //           React.createElement('a', { href: item, target: '_blank' }, item),
        //           React.createElement('input', { type: 'hidden', value: item, name: 'link' }),
        //           React.createElement('div', {}),
        //           React.createElement('button', { type: 'submit', className: 'btn btn-sm btn-danger' }, '\u2715 Delete')),
        //         React.createElement('div', {})))
        //     )
        //   );


        const list = jsonResponse.map((item, index) => {
          return { 'number': index + 1, 'username_link': item, 'action_delete': <button className="btn btn-sm btn-danger" onClick={() => { this.onPageDeleteHandler(item) }}>Delete</button>, 'action_open': <a href={item} target="_blank" className="btn btn-sm btn-warning" >Open</a> };
        });



        this.setState({ currentlyScraping: list });
      } else {
        // const list = React.createElement('div', {},
        //   React.createElement('p', { style: { color: 'grey' } }, 'No link found')
        // )
        this.setState({ currentlyScraping: [] })
      }
    });
  }

  fetchAndRenderDataUser() {
    fetch(APIConstants.REQUESTS_API_ROOT + '/scraping/facebook/user/get', {
      headers: new Headers({
        'x-access-token': globalFunctions.getAccessToken(),
      })
    }).then((response) => {
      return response.json();
    }).then((jsonResponse) => {
      if (jsonResponse.length > 1 || jsonResponse[0] != '') {
        // const list =
        //   React.createElement('div', { textAlign: 'left' },
        //     React.createElement('ul', {},
        //       jsonResponse.map((item) => React.createElement('li', {},
        //         React.createElement('form', { method: 'POST', onSubmit: this.onUserDeleteHandler },
        //           React.createElement('a', { href: item, target: '_blank' }, item),
        //           React.createElement('input', { type: 'hidden', value: item, name: 'link' }),
        //           React.createElement('div', {}),
        //           React.createElement('button', { type: 'submit', className: 'btn btn-danger btn-sm' }, '\u2715 Delete')),
        //         React.createElement('div', {})))
        //     )
        //   );


        const list = jsonResponse.map((item, index) => {
          return { 'number': index + 1, 'username_link': item, 'action_delete': <button className="btn btn-sm btn-danger" onClick={() => { this.onUserDeleteHandler(item) }}>Delete</button>, 'action_open': <a href={item} target="_blank" className="btn btn-sm btn-warning" >Open</a> };
        });



        this.setState({ currentlyScrapingUser: list });
      } else {
        // const list = React.createElement('div', {},
        //   React.createElement('p', { style: { color: 'grey' } }, 'No link found')
        // )
        this.setState({ currentlyScrapingUser: [] })
      }
    });
  }

  getDateObject(stringDate) {
    var dateData = stringDate.split(', ')[0].split('/');
    var timeData = stringDate.split(', ')[1].split(' ')[0].split(':');
    var amPmData = stringDate.split(', ')[1].split(' ')[1];
    var year = ('000' + dateData[2]).slice(-4);
    var month = ('000' + dateData[0]).slice(-2);
    var date = ('000' + dateData[1]).slice(-2);

    var hour = parseInt(timeData[0]);
    if (amPmData.toLowerCase() === "pm") {
      hour += 12;
    }
    if (hour == 12 || hour == 24) {
      hour -= 12;
    }
    var minute = ('000' + timeData[1]).slice(-2);
    var second = ('000' + timeData[2]).slice(-2);
    var hour = ('000' + hour.toString()).slice(-2);
    var tzFormat = year + '-' + month + '-' + date + 'T' + hour + ':' + minute + ':' + second + 'Z';
    return new Date(tzFormat);

  }

  // *********************** USERS ***********************

  fetchAndRenderData() {
    fetch(APIConstants.FB_USER_API_ROOT + '/api/users/datesandgroups', {
      headers: new Headers({
        'x-access-token': globalFunctions.getAccessToken(),
      })
    }).then((response) => {
      return response.json();
    }).then((jsonResponse) => {
      //New Data Structure
      // {
      //   fb_link:{
      //   about:"",
      //   name:"",
      //   collection_id:""
      //   dates:[ 
      //           {"date":"date", "post_lenght":"post_length", "document_id":"id"}, 
      //           {"date":"date", "post_lenght":"post_length", "document_id":"id"}, 
      //         ]
      //  }
      // }
      jsonResponse = jsonResponse.reverse();

      var structured = {};
      jsonResponse.forEach((item) => {

        var fbLink = item.facebookLink;
        var dateObject = this.getDateObject(item.date);


        if (fbLink in structured) {
          if (structured[fbLink].name == "empty") {
            structured[fbLink].name = item.name;
          }

          if (structured[fbLink].about == "empty") {
            structured[fbLink].about = item.about;
          }

          structured[fbLink].dates.push({
            "date": dateObject,
            "post_length": item.postLength,
            "document_id": item.groupId,
            "collection_id": item.collectionId,
          })
        } else {
          structured[fbLink] =
          {
            "name": item.name,
            "about": item.about,
            "dates": [
              {
                "date": dateObject,
                "post_length": item.postLength,
                "document_id": item.groupId,
                "collection_id": item.collectionId,
              }
            ]
          }
        }
      });

      var widgetsList = [];
      var keys = Object.keys(structured);


      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var datesWidget = [];

        structured[key].dates.sort(function (b, a) {
          return a.date - b.date;
        });

        structured[key].dates.forEach(element => {
          if (parseInt(element.post_length) > 0) {
            datesWidget.push(React.createElement('p', { padding: "0%" },
              React.createElement('a', { href: '/facebook/page/' + structured[key].name + '?doc-id=' + element.collection_id + '&id=' + element.document_id + '&type=user' }, element.date.toDateString() + ', ' + element.date.toLocaleTimeString())
            ));
          }

          // console.log(element.date);
          // var dateData = element.date.split(', ')[0].split('/');
          // var timeData = element.date.split(', ')[1].split(' ')[0].split(':');
          // var amPmData = element.date.split(', ')[1].split(' ')[1];
          // var year = (dateData[2]);
          // var month = (dateData[1]);
          // var date = (dateData[0]);

          // var hour = parseInt(timeData[0]);
          // if (amPmData.toLowerCase() === "pm") {
          //   hour += 12;
          // }
          // if (hour == 12 || hour == 24) {
          //   hour -= 12;
          // }
          // var minute = (timeData[1]);
          // var second = (timeData[2]);
          // var hour = hour.toString();
          // var tzFormat = year + '-' + month + '-' + date + 'T' + hour + ':' + minute + ':' + second + 'Z';
          // var dateObject = new Date(tzFormat);



          // 'DD/MM/YYYY, HH:mm:SS AM/PM'


        });

        widgetsList.push(
          React.createElement('div', { className: "col-md-4", textAlign: "left" },
            React.createElement('h4', {}, structured[key].name),
            React.createElement('p', {}, structured[key].about),
            React.createElement('a', { 'href': key, target: '?' }, key),
            React.createElement('div', { style: { overflowY: "scroll", maxHeight: '25vh', border: "1px solid #eeee33", marginTop: "10px", padding: "15px" } }, datesWidget)
          )
        );

      }

      this.setState({ usersDates: widgetsList })

      // const list = jsonResponse.sort((a, b) => a.date < b.date ? 1 : -1).map((item) => React.createElement('div', {},
      //   React.createElement('a', { href: '/facebook?id=' + item['_id'] + '&type=user' }, item['date'])
      // ));
      // this.setState({ usersDates: list });

    });



    // *********************** GROUPS AND PAGES ***********************
    // *********************** GROUPS AND PAGES ***********************
    // *********************** GROUPS AND PAGES ***********************


    fetch(APIConstants.FB_GROUP_API_ROOT + '/api/pages/datesandgroups', {
      headers: new Headers({
        'x-access-token': globalFunctions.getAccessToken(),
      })
    }).then((response) => {
      return response.json();
    }).then((jsonResponse) => {

      jsonResponse = jsonResponse.reverse();

      var structured = {};
      jsonResponse.forEach((item) => {
        var fbLink = item.facebookLink;

        var dateObject = this.getDateObject(item.date);

        if (fbLink in structured) {
          if (structured[fbLink].name == "empty") {
            structured[fbLink].name = item.name;
          }
          if (structured[fbLink].about == "empty") {
            structured[fbLink].about = item.about;
          }

          structured[fbLink].dates.push({
            "date": dateObject,
            "post_length": item.postLength,
            "document_id": item.groupId,
            "collection_id": item.collectionId,
          })
        } else {
          structured[fbLink] =
          {
            "name": item.name,
            "about": item.about,
            "dates": [
              {
                "date": dateObject,
                "post_length": item.postLength,
                "document_id": item.groupId,
                "collection_id": item.collectionId,
              }
            ]
          }
        }
      });


      var widgetsList = [];
      var keys = Object.keys(structured);

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var datesWidget = [];

        structured[key].dates.sort(function (b, a) {
          return a.date - b.date;
        });

        structured[key].dates.forEach(element => {
          if (parseInt(element.post_length) > 0) {
            datesWidget.push(React.createElement('p', { padding: "0%" },
              React.createElement('a', { href: '/facebook/page/' + structured[key].name + '?doc-id=' + element.collection_id + '&id=' + element.document_id + '&type=page' }, element.date.toDateString() + ', ' + element.date.toLocaleTimeString())
            ));
          }

        });

        widgetsList.push(
          React.createElement('div', { className: "col-md-4", textAlign: "left" },
            React.createElement('h4', {}, structured[key].name),
            React.createElement('p', {}, structured[key].about),
            React.createElement('a', { 'href': key, target: '?' }, key),
            React.createElement('div', { style: { overflowY: "scroll", maxHeight: '25vh', border: "1px solid #eeee33", marginTop: "10px", padding: "15px" } }, datesWidget)
          )
        );

      }

      this.setState({ groupsDates: widgetsList });

      // console.log(structured);

      // console.log(jsonResponse);
      // const list = jsonResponse.sort((a, b) => a.date < b.date ? 1 : -1).map((item) => React.createElement('div', {},
      //   React.createElement('a', { href: '/facebook?id=' + item._id + '&type=page' }, item['date'])
      // ));
      // this.setState({ groupsDates: list });

    });
  }


  handleDateRangeSelect = (date) => {
    var newRange = {
      key: "selection",
      endDate: date.selection.endDate,
      startDate: date.selection.startDate,
    }

    this.setState({ selectionRange: newRange });
  }

  toggleDateRangeCollapse = () => {
    this.setState({ isDateRangeCollapsed: !this.state.isDateRangeCollapsed });
  }

  render() {

    return (
      <React.Fragment>
        <ToastContainer
          position="bottom-center"
          className="toast-container"
          theme="colored"
        />


        <div style={{ textAlign: "center", marginTop: "2%" }}><h3><b>USERS PROFILE</b></h3></div>
        <CommonComponents.SearchBox action="#" />
        <div style={{ textAlign: "center", margin: "2%" }}>
          <h4>Click on a scraping date to continue or <a onClick={this.toggleDateRangeCollapse} href="#?">choose date range!</a></h4>
        </div>
        <Collapse isOpened={this.state.isDateRangeCollapsed}>
          <div style={{ textAlign: "center" }}>
            <DateRangePicker
              ranges={[this.state.selectionRange]}
              onChange={this.handleDateRangeSelect}
              scroll={{ 'enabled': true }}
              minDate={new Date(2021, 1, 1)}
              maxDate={new Date()}

            />
          </div>
        </Collapse>


        <div className="row" style={{ margin: "3% 5% 5% 5%" }}>{this.state.usersDates}</div>

        <div style={{ textAlign: "center", marginTop: "3%" }}>
          <h4><b>SCRAPING REQUESTS</b></h4>
        </div>


        <div className="container">
          <CommonComponents.ScrapingTable tableData={this.state.currentlyScrapingUser} />
        </div>

        <div style={{ margin: "5%" }}></div>

        <div className="container" style={{ textAlign: 'center' }} id="add-requests-div">
          <h4 style={{ color: "#444444" }}><b>ADD NEW REQUEST</b></h4>
          <br />

          <CommonComponents.AddRequestField hint="Enter link here" on_submit={this.onUserAddHandler} name='link' />

        </div>




        <div style={{ textAlign: "center", marginTop: "10%" }}><h3><b>GROUPS AND PAGES</b></h3></div>
        <CommonComponents.SearchBox action="#" />
        <div style={{ textAlign: "center", marginTop: "2%" }}>
          <h4>Click on a scraping date to continue!</h4>
        </div>

        <div className="row" style={{ margin: "3% 5% 5% 5%" }}>{this.state.groupsDates}</div>

        <div style={{ textAlign: "center", marginTop: "3%" }}>
          <h4><b>SCRAPING REQUESTS</b></h4>
        </div>


        <div className="container">
          <CommonComponents.ScrapingTable tableData={this.state.currentlyScraping} />
        </div>

        <div style={{ margin: "5%" }}></div>

        <div className="container" style={{ textAlign: 'center', marginBottom: "5%" }} id="add-requests-div">
          <h4 style={{ color: "#444444" }}><b>ADD NEW REQUEST</b></h4>
          <br />

          <CommonComponents.AddRequestField hint="Enter link here" on_submit={this.onPageAddHandler} name='link' />

        </div>


      </React.Fragment>
    );
  }
}

export default PreFacebook;
