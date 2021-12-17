import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import CommonComponents from "../../common/common";

import cnnLogo from "../../../assets/img/scraped/cnn.jpg";
import fanaMeidaLogo from "../../../assets/img/scraped/fana-media.jpg";
import bbcLogo from "../../../assets/img/scraped/bbc.webp";
import fanaLogo from "../../../assets/img/scraped/fana.jpg";
import abiyLogo from "../../../assets/img/scraped/abiy-ahmed.jpg";
import merejaLogo from "../../../assets/img/scraped/mereja-com.jpg";

import APIConstants from "../../../constants/constants";

import getAccessToken from '../../../common/GlobalsFunctions';

class Facebook extends Component {
  state = {
    currentlyScraping: 'Loading . . .',
    currentlyScrapingUser: 'Loading . . .',
    availablePages: 'Loading . . .'
  };

  componentWillMount() {
    this.fetchAndRenderData();
    this.fetchAndRenderDataUser();
    this.fetchAndRenderDataAvaialbe();
  }



  fetchAndRenderData() {
    fetch(APIConstants.REQUESTS_API_ROOT + '/scraping/facebook/page/get', {
      headers: new Headers({
        'x-access-token': getAccessToken(),
      })
    }).then((response) => {
      return response.json();
    }).then((jsonResponse) => {
      if (jsonResponse.length > 1 || jsonResponse[0] != '') {
        const list =
          React.createElement('div', {},
            React.createElement('ul', {},
              jsonResponse.map((item) => React.createElement('li', {},
                React.createElement('form', { method: 'POST', action: APIConstants.REQUESTS_API_ROOT + '/scraping/facebook/page/delete' },
                  React.createElement('a', { href: item, target: '_blank' }, item),
                  React.createElement('input', { type: 'hidden', value: item, name: 'link' }),
                  React.createElement('div', {}),
                  React.createElement('button', { type: 'submit', className: 'btn btn-sm btn-danger' }, '\u2715 Delete')),
                React.createElement('div', {})))
            )
          );
        this.setState({ currentlyScraping: list });
      } else {
        const list = React.createElement('div', {},
          React.createElement('p', { style: { color: 'grey' } }, 'No link found')
        )
        this.setState({ currentlyScraping: list })
      }
    });
  }

  fetchAndRenderDataUser() {
    fetch(APIConstants.REQUESTS_API_ROOT + '/scraping/facebook/user/get',{
      headers: new Headers({
        'x-access-token': getAccessToken(),
      })
    }).then((response) => {
      return response.json();
    }).then((jsonResponse) => {
      if (jsonResponse.length > 1 || jsonResponse[0] != '') {
        const list =
          React.createElement('div', {},
            React.createElement('ul', {},
              jsonResponse.map((item) => React.createElement('li', {},
                React.createElement('form', { method: 'POST', action: APIConstants.REQUESTS_API_ROOT + '/scraping/facebook/user/delete' },
                  React.createElement('a', { href: item, target: '_blank' }, item),
                  React.createElement('input', { type: 'hidden', value: item, name: 'link' }),
                  React.createElement('div', {}),
                  React.createElement('button', { type: 'submit', className: 'btn btn-danger btn-sm' }, '\u2715 Delete')),
                React.createElement('div', {})))
            )
          );
        this.setState({ currentlyScrapingUser: list });
      } else {
        const list = React.createElement('div', {},
          React.createElement('p', { style: { color: 'grey' } }, 'No link found')
        )
        this.setState({ currentlyScrapingUser: list })
      }
    });
  }

  fetchAndRenderDataAvaialbe() {

    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id');
    const type = queryParams.get('type');


    if (type == 'page') {
      fetch(APIConstants.FB_GROUP_API_ROOT + '/api/pages/onlygroups/' + id).then((response) => {
        return response.json();
      }).then((jsonResponse) => {

        const list = jsonResponse.map((item) => React.createElement('div', { className: 'col-sm', style: { marginBottom: '5%' } },
          React.createElement('p', {},
            React.createElement('b', {}, 'Page Name: '),
            React.createElement('span', {}, item.name),
          ),
          React.createElement('p', {},
            React.createElement('b', {}, 'About: '),
            React.createElement('span', {}, item.about),
          ),
          React.createElement('p', {},
            React.createElement('b', {}, 'Likes: '),
            React.createElement('span', {}, item.numberOfFollowers),
          ),
          React.createElement('p', {},
            React.createElement('b', {}, 'Link: '),
            React.createElement('a', { href: item.facebookLink, target: 'blank' }, item.facebookLink),
          ), React.createElement('a', { className: 'btn btn-sm btn-primary', href: '/facebook/page/' + item.name + '?doc-id=' + id + '&id=' + item._id + '&type=' + type }, 'Go To Posts \u279c'
          ),
        ));

        this.setState({ availablePages: list });

      });
    } else if (type == 'user') {
      fetch(APIConstants.FB_USER_API_ROOT + '/api/users/onlygroups/' + id).then((response) => {
        return response.json();
      }).then((jsonResponse) => {

        const list = jsonResponse.map((item) => React.createElement('div', { className: 'col-sm' },
          React.createElement('p', {},
            React.createElement('b', {}, 'Name: '),
            React.createElement('span', {}, item.name),
          ),
          React.createElement('p', {},
            React.createElement('b', {}, 'About: '),
            React.createElement('span', {}, item.about),
          ),
          React.createElement('p', {},
            React.createElement('b', {}, 'Work: '),
            React.createElement('span', {}, item.info[0] == undefined ? 'Info Not Available' : item.info[0].WORK),
          ),
          React.createElement('p', {},
            React.createElement('b', {}, 'Education: '),
            React.createElement('span', {}, item.info[1] == undefined ? 'Info Not Available' : item.info[1].EDUCATION),
          ),
          React.createElement('p', {},
            React.createElement('b', {}, 'Link: '),
            React.createElement('span', {}, item.facebookLink),
          ),
          React.createElement('a', { className: 'btn btn-sm btn-primary', href: '/facebook/page/' + item.name + '?doc-id=' + id + '&id=' + item._id + '&type=' + type }, 'Go To Posts \u279c'
          ),
        ));

        this.setState({ availablePages: list });

      });

    }


  }


  render() {

    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id');
    const type = queryParams.get('type');
    var actionUrl = APIConstants.FB_GROUP_API_ROOT + '/api/pages/search/' + id + '/search'
    if (type == 'user') {
      actionUrl = APIConstants.FB_USER_API_ROOT + '/api/users/search/' + id + '/search'
    }
    return (
      <div style={{ margin: "1% 4% 0 4%" }}>
        <CommonComponents.SearchBox action={'/facebook/search'} doc_id={id} type={type} />


        <div style={{ textAlign: "center", margin: "5% 0 2% 0" }}>
          <h2 style={{ color: "#555555" }}>
            <b>AVAILABLE PAGES</b>
          </h2>
        </div>
        <div className="row">
          {this.state.availablePages}
        </div>



        <div style={{ textAlign: "center", margin: "5% 0 2% 0" }}>
          <h2 style={{ color: "#555555" }}>
            <b>MOST POPULAR</b>
          </h2>
        </div>
        <div className="row">
          <CommonComponents.FreqCard
            link="/facebook/page/BBC"
            btn_text="Go To Posts"
            title="BBC"
            image={bbcLogo}
          />
          <CommonComponents.FreqCard
            link="/facebook/page/fanabc"
            btn_text="Go To Posts"
            title="Fana BC"
            image={fanaLogo}
            type="nodata"
          />
          <CommonComponents.FreqCard
            link="/facebook/page/abiy-ahmed"
            btn_text="Go To Posts"
            title="Abiy Ahmed Ali"
            image={abiyLogo}
            type="nodata"
          />
          <CommonComponents.FreqCard
            link="/facebook/page/CNN"
            btn_text="Go To Posts"
            title="CNN"
            image={cnnLogo}
          />
          <CommonComponents.FreqCard
            link="/facebook/page/mereja-com"
            btn_text="Go To Posts"
            title="Mereja.com"
            image={merejaLogo}
            type="nodata"
          />
          <CommonComponents.FreqCard
            link="/facebook/page/Fana Media"
            btn_text="Go To Posts"
            title="Fana Media"
            image={fanaMeidaLogo}
          />
        </div>
        {/* <div style={{ textAlign: "center", margin: "5% 0 2% 0" }} id="scraping-requests-div">
          <h2 style={{ color: "#555555" }}>
            <b>SCRAPING REQUESTS</b>
          </h2>
        </div>

        <div id="currently-scraping-user">
          <h4 style={{ color: "#444444" }}><b>Users</b></h4>
          <p>The facebook scraper is currently working on the following <b>USERS</b></p>
          {this.state.currentlyScrapingUser}
        </div>
        <div style={{ margin: "8%" }}></div>

        <div style={{ textAlign: 'center' }} id="add-requests-div">
          <h5 style={{ color: "#444444" }}>ADD NEW REQUEST</h5>
          <p>Enter link to a page or group to start scraping</p>
          <CommonComponents.AddRequestField hint="Enter link here" action="http://localhost:5000/facebook/user/create" name='link' />
        </div>

        <div style={{ margin: "10%" }}></div>


        <div id="currently-scraping-group">
          <h4 style={{ color: "#444444" }}><b>Groups and Pages</b></h4>
          <p>The facebook scraper is currently working on the following <b>GROUPS</b></p>
          {this.state.currentlyScraping}
        </div>
        <div style={{ margin: "8%" }}></div>


        <div style={{ textAlign: 'center' }} id="add-requests-div">
          <h5 style={{ color: "#444444" }}>ADD NEW REQUEST</h5>
          <p>Enter link to a page or group to start scraping</p>
          <CommonComponents.AddRequestField hint="Enter link here" action="http://localhost:5000/facebook/create" name='link' />
        </div> */}

        <div style={{ margin: "5%" }}></div>

      </div>
    );
  }
}

export default Facebook;

