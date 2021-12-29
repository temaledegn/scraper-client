import React, { Component } from "react";
import "../css/common.css";

import { MDBDataTable } from "mdbreact";

class SearchBox extends Component {
  render() {
    return (
      <div className="container">
        <br />
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <form
              method="GET"
              action={this.props.action}
              className="card card-sm"
            >
              <div className="card-body row no-gutters align-items-center">
                <div className="col">
                  <input
                    className="form-control form-control-lg borderless"
                    type="search"
                    name="q"
                    placeholder="&#xF002;&emsp; Enter Keyword  "
                    style={{ fontFamily: "Arial, FontAwesome" }}
                  />
                  <input type="hidden" name="doc-id" value={this.props.doc_id} />
                  <input type="hidden" name="type" value={this.props.type} />
                </div>
                <div className="col-auto">
                  <button className="btn btn-lg btn-warning" type="submit">
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

class SearchBoxSmall extends Component {
  render() {
    return (
      <div className="container">
        <br />
        <div className="row justify-content-center">
          <div className="col-10 col-md-8 col-lg-6">
            <form
              method="GET"
              action={this.props.action}
              className="card card-sm"
            >
              <div
                className="row no-gutters align-items-center"
                style={{ padding: "1%" }}
              >
                <div className="col">
                  <input
                    className="form-control form-control-sm borderless"
                    type="search"
                    name="q"
                    placeholder="&#xF002;&emsp; Enter Keyword or Username"
                    style={{ fontFamily: "Arial, FontAwesome" }}
                  />
                  <input type="hidden" name="doc-id" value={this.props.doc_id} />
                  <input type="hidden" name="type" value={this.props.type} />
                </div>
                <div className="col-auto">
                  <button className="btn btn-sm btn-warning" type="submit">
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

class AddRequestField extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-0 col-md-1 col-lg-2"></div>
        <div className="col-12 col-md-10 col-lg-8">
          <form
            onSubmit={this.props.on_submit}
            // method="POST"
            // action={this.props.action}
            className="card card-sm"
          >
            <div
              className="row no-gutters align-items-center"
              style={{ padding: "1%" }}
            >
              <div className="col">
                <input
                  className="form-control form-control-sm borderless"
                  type="text"
                  name={this.props.name}
                  placeholder={this.props.hint}
                  required
                  style={{ fontFamily: "Arial, FontAwesome" }}
                />
              </div>
              <div className="col-auto">
                <button className="btn btn-sm btn-success" type="submit">
                  Add Request
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-0 col-md-1 col-lg-2"></div>
      </div>
    );
  }
}

class Image extends Component {
  render() {
    // const imgClass = "card-img-top " + this.props.imageClass;
    return (
      <img className={this.props.imageClass} src={this.props.src} alt="card" />
    );
  }
}

class FrequentCards extends Component {
  render() {
    let btnClass = "btn btn-primary";
    if (this.props.type === "nodata") {
      btnClass = "btn btn-secondary disabled";
    }
    let borderClass = "card ";
    let imageClass = "";
    let btnStyle = {};
    if (this.props.sm === "twitter") {
      borderClass += "borderless";
      imageClass += "twitter-image";
      btnStyle = { background: "#00acee", borderColor: "#00acee" };
    }
    return (
      <div className="col-md-2" style={{ textAlign: "center" }}>
        <div className={borderClass}>
          <Image imageClass={imageClass} src={this.props.image} alt="card" />
          <div
            className="card-body"
            style={{
              marginLeft: 0,
              marginRight: 0,
              paddingLeft: 0,
              paddingRight: 0,
            }}
          >
            <h5 className="card-title">{this.props.title}</h5>

            <a href={this.props.link} className={btnClass} style={btnStyle}>
              {this.props.btn_text}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

class ScrapingCards extends Component {
  render() {
    return (
      <div className="col-md-2" style={{ textAlign: "center" }}>
        <div>
          <Image src={this.props.image} alt="card" />
          <div
            className="card-body"
            style={{
              marginLeft: 0,
              marginRight: 0,
              paddingLeft: 0,
              paddingRight: 0,
            }}
          >
            <h5 className="card-title">{this.props.title}</h5>

            <a href={this.props.link} className="btn btn-sm btn-warning">
              Open
            </a>

            <a href={this.props.link} className="btn btn-sm btn-danger">
              Delete
            </a>

          </div>
        </div>
      </div>
    );
  }
}



class ScrapingTable extends Component {
  render() {
    const dataRep = [
      {
        label: "#",
        field: "number",
        sort: "asc",
        width: 10,
      },
      {
        label: "Username OR Link",
        field: "username_link",
        sort: "asc",
        maxWidth: 100,
        width: 50,
      },
      {
        label: "Delete",
        field: "likes",
        sort: "disabled",
        width: 20,
      },
      {
        label: "Open",
        field: "open",
        sort: "disabled",
        width: 20,
      }
    ];
    let data = { columns: dataRep, rows: this.props.tableData }
    return <MDBDataTable striped bordered hover data={data} />;
  }
}


const CommonComponents = {
  SearchBox: SearchBox,
  FreqCard: FrequentCards,
  SearchBoxSmall: SearchBoxSmall,
  AddRequestField: AddRequestField,
  ScrapingCards: ScrapingCards,
  ScrapingTable: ScrapingTable,
};

export default CommonComponents;
