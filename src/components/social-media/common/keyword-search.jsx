import React, { Component } from "react";

import CommonComponents from "../../common/common";

import globalFunctions from "../../../common/GlobalsFunctions";
import APIConstants from "../../../constants/constants";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

class KeywordSearch extends Component {
  state = {
    searchResults: '',
    fbIncluded:true,
    twitterIncluded:true,
    telegramIncluded:true
  };

  componentWillMount() {
    
  }

 
 
  handleIncludeFbChanged = (e) => {
    const value = e.target.checked;
    this.setState({ fbIncluded: value });
  }
 
  handleIncludeTwitterChanged = (e) => {
    const value = e.target.checked;
    this.setState({ twitterIncluded: value });
  }

  handleIncludeTelegramChanged = (e) => {
    const value = e.target.checked;
    this.setState({ telegramIncluded: value });
  }
 
 
 
  render() {
    return (
      <div style={{ margin: "1% 4% 0 4%" }}>
        <ToastContainer
          position="bottom-center"
          className="toast-container"
          theme="colored"
        />


        <div style={{ textAlign: "center", marginTop: "15%" }}> <h3><b>KEYWORD SEARCH</b></h3></div>
        <CommonComponents.SearchBox action="/common/keyword/search" />
       <div className="text-center" style={{marginTop:"2%"}}>
        <label>
        <input
            name="facebok"
            type="checkbox"
            checked={this.state.fbIncluded} 
            onChange={this.handleIncludeFbChanged} />
            &ensp;Include Facebook
        </label>&emsp;&emsp;

        <label>
        <input
            name="twitter"
            type="checkbox"
            checked={this.state.twitterIncluded} 
            onChange={this.handleIncludeTwitterChanged} />
            &ensp;Include Twitter
        </label>&emsp;&emsp;

        <label>
        <input
            name="telegram"
            type="checkbox"
            checked={this.state.telegramIncluded} 
            onChange={this.handleIncludeTelegramChanged} />
            &ensp;Include Telegram
        </label>

        </div>
      
      </div>
    );
  }
}

export default KeywordSearch;
