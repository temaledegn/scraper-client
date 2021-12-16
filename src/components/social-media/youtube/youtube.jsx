import React, { Component } from "react";
import { Collapse } from 'react-collapse';

import getAccessToken from "../../../common/GlobalsFunctions";
import APIConstants from "../../../constants/constants";

class Youtube extends Component {

  state = { availablePages: 'Loading . . .', collapseExpand: [] };

  static data = [];

  componentWillMount() {
    this.fetchAndRenderData();
  }

  updateShowCollapse(index) {
    this.state.collapseExpand[index] = !this.state.collapseExpand[index];
    this.renderData();
  }


  fetchAndRenderData() {
    fetch( APIConstants.LINKEDIN_API_ROOT+'/linkedin/all-scraped', {
      headers: new Headers({
        'x-access-token': getAccessToken(),
      })
    }).then((response) => {
      return response.json();
    }).then((jsonResponse) => {
      console.log(jsonResponse);
      this.data = jsonResponse;
      this.state.collapseExpand = [...Array(jsonResponse.length).keys()].map((item) => false);
      // alert(this.state.collapseExpand.toString())
      this.renderData();

    });
  }

  renderData() {
    const list = (this.data == undefined ? [] : this.data).map((item, i) =>
      React.createElement('div', { className: '' },
        React.createElement('div', { className: '' },
          React.createElement('h4', {},
            React.createElement('a', { onClick: () => this.updateShowCollapse(i), href: "#?" }, item.Full_Name)),
          React.createElement('p', {}, item.Position),
          React.createElement('div', this.state.collapseExpand[i] ? { style: { overflowY: 'scroll', maxHeight: '500px', border: 'solid 2px #ddd', padding: '2% 5% 2% 5%' } } : { style: { overflowY: 'scroll', maxHeight: '500px' } },
            React.createElement(Collapse, { isOpened: this.state.collapseExpand[i] },
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
      <div className="container" style={{ textAlign: 'left' }}>
        <br />
        <h2>Scraped Profiles</h2>
        <br />
        {this.state.availablePages}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default Youtube;
