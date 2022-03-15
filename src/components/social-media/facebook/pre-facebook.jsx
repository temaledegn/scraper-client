import React, { Component } from "react";

import CommonComponents from "../../common/common";

import imgFbPageGroup from "../../../assets/img/fb-groups-or-pages.jpg";
import imgFbUser from "../../../assets/img/fb-user.jpg";

import APIConstants from "../../../constants/constants";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

import globalFunctions from "../../../common/GlobalsFunctions";

class PreFacebook extends Component {
  state = {
    usersDates: 'Loading . . .', groupsDates: 'Loading . . .', currentlyScraping: [], currentlyScrapingUser: [],
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

      var structured = {};
      jsonResponse.forEach((item) => {
        var fbLink = item.facebookLink;
        if (fbLink in structured) {
          structured[fbLink].dates.push({
            "date": item.date,
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
                "date": item.date,
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

        structured[key].dates.forEach(element => {
          if (parseInt(element.post_length) > 0) {
            datesWidget.push(React.createElement('p', { padding: "0%" },
              React.createElement('a', { href: '/facebook/page/' + structured[key].name + '?doc-id=' + element.collection_id + '&id=' + element.document_id + '&type=user' }, element.date)
            ));
          }

        });

        widgetsList.push(
          React.createElement('div', { className: "col-md-4", textAlign: "left" },
            React.createElement('h4', {}, structured[key].name),
            React.createElement('p', {}, structured[key].about),
            React.createElement('a', { 'href': key, target: '?' }, key),
            React.createElement('div', { style: { overflowY: "scroll", maxHeight: '25vh', border: "1px solid brown", marginTop: "10px", padding: "15px" } }, datesWidget)
          )
        );

      }

      this.setState({ usersDates: widgetsList })

      // const list = jsonResponse.sort((a, b) => a.date < b.date ? 1 : -1).map((item) => React.createElement('div', {},
      //   React.createElement('a', { href: '/facebook?id=' + item['_id'] + '&type=user' }, item['date'])
      // ));
      // this.setState({ usersDates: list });

    });

    fetch(APIConstants.FB_GROUP_API_ROOT + '/api/pages/datesandgroups', {
      headers: new Headers({
        'x-access-token': globalFunctions.getAccessToken(),
      })
    }).then((response) => {
      return response.json();
    }).then((jsonResponse) => {

      var structured = {};
      jsonResponse.forEach((item) => {
        var fbLink = item.facebookLink;
        if (fbLink in structured) {
          structured[fbLink].dates.push({
            "date": item.date,
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
                "date": item.date,
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

        structured[key].dates.forEach(element => {
          if (parseInt(element.post_length) > 0) {
            datesWidget.push(React.createElement('p', { padding: "0%" },
              React.createElement('a', { href: '/facebook/page/' + structured[key].name + '?doc-id=' + element.collection_id + '&id=' + element.document_id + '&type=user' }, element.date)
            ));
          }

        });

        widgetsList.push(
          React.createElement('div', { className: "col-md-4", textAlign: "left" },
            React.createElement('h4', {}, structured[key].name),
            React.createElement('p', {}, structured[key].about),
            React.createElement('a', { 'href': key, target: '?' }, key),
            React.createElement('div', { style: { overflowY: "scroll", maxHeight: '25vh', border: "1px solid brown", marginTop: "10px", padding: "15px" } }, datesWidget)
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
          <h4>Click on a scraping date to continue!</h4>
        </div>

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
