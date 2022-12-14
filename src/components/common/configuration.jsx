import React, { Component } from "react";
import "../css/user-guide.css";

class Configuration extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
                <div>
                    <br></br>
                    <div style={{textAlign:"center"}}>
                    <h4>Facebook Configuration</h4>
                    </div>
                    <b><h5>Scraping accounts</h5></b>
                    <div className="row">
                        <div className="col-md-8">
                     
                            <div style={{border:"solid #eee 2px", minHeight:"200px", overflowX:"scroll"}}></div>
                        </div>
                        <div className="col-md-4">
                        <button className="btn btn-sm btn-success"><i className="fa fa-plus"></i>&emsp;Add FB Account&emsp;</button>  
                        <br/>
                        <br/>
                        <button className="btn btn-sm btn-warning"><i className="fa fa-edit"></i>&emsp;Change Password</button>  
                        <br/>
                        <br/>
                        <button className="btn btn-sm btn-danger"><i className="fa fa-times"></i>&emsp;Remove Account&ensp;</button>
                        </div>
                    </div>
                    <br/>
                    
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Continued Scraping Interval</span>
                        </div>
                        <select class="custom-select">
                            <option selected disabled>Choose time between consecutive scraping</option>
                            <option value="1">1 Hour</option>
                            <option value="2">2 Hours</option>
                            <option value="3">4 Hours</option>
                            <option value="3">8 Hours</option>
                        </select>
                     </div>

                     <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Keyword Scraping Duration&nbsp;</span>
                        </div>
                        <select class="custom-select">
                            <option selected disabled>Choose how long to scrape live</option>
                            <option value="1">Short</option>
                            <option value="2">Medium</option>
                            <option value="3">Long</option>
                            <option value="3">Very Long</option>
                        </select>
                     </div>
                    <br/>
                     <div className="text-center"><button className="btn btn-outline-primary">Save FB Configuration</button> </div>

                   
                   

                </div>
                <br/>
                <br/>

                <br/>
                <div style={{textAlign:"center"}}>
                    <br></br>
                    <h4>Twitter Configuration</h4>
                    <br/>
                </div>

                <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Continued Scraping Interval</span>
                        </div>
                        <select class="custom-select">
                            <option selected disabled>Choose time between consecutive scraping</option>
                            <option value="1">1 Hour</option>
                            <option value="2">2 Hours</option>
                            <option value="3">4 Hours</option>
                            <option value="3">8 Hours</option>
                        </select>
                     </div>

                     <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Keyword Scraping Duration&nbsp;</span>
                        </div>
                        <select class="custom-select">
                            <option selected disabled>Choose how long to scrape live</option>
                            <option value="1">Short</option>
                            <option value="2">Medium</option>
                            <option value="3">Long</option>
                            <option value="3">Very Long</option>
                        </select>
                     </div>
                    <br/>
                     <div className="text-center"><button className="btn btn-outline-primary">Save Twitter Configuration</button> </div>

            </div>
            <div className="col-md-3"></div>
            </div>
            <br/>
            <br/>
            <br/>


      </React.Fragment>
    );
  }
}

export default Configuration;
