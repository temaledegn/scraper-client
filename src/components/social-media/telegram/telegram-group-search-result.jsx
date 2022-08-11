import React, { useEffect } from "react";
import { MDBDataTable } from "mdbreact";

import axios from "axios";
import { useState } from "react";
import APIConstants from "../../../constants/constants";

import globalFunctions from "../../../common/GlobalsFunctions";

function UserLink(props) {
  const linkString = "/telegram/page/" + props.username;
  const linkStringx = "https://t.me/" + props.username;
  return (
    <React.Fragment>
      <a target="?" style={{ color: "darkblue" }} href={linkString}>
        {props.name}
      </a>
      <br />
      <a target="?" href={linkStringx}>
        @{props.username}
      </a>
    </React.Fragment>
  );
}

function TelegramGroupSearchResult(props) {
  const datetimeString = (
    <span>&nbsp;&nbsp;&nbsp;Date&nbsp;&amp;&nbsp;Time&nbsp;&nbsp;&nbsp;</span>
  ); 

  const dataRep = [
    {
      label: "#",
      field: "number",
      sort: "asc",
      width: 20,
    },
    {
      label: "Post Content",
      field: "content",
      sort: "disabled",
      width: 100,
    },
    {
      label: datetimeString,
      field: "datetime",
      sort: "asc",
      width: 50,
    },
  ];

  //   const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [resultCount, setResultCount] = useState();
  let searchQuery = props.searchQuery;
  const url = APIConstants.TELEGRAM_API_ROOT+"/telegram/group/search/?q=" + searchQuery;
  console.log(url);
  useEffect(() => {
    axios.get(url, {
      headers: {
        'x-access-token': globalFunctions.getAccessToken()
      }
    }).then((response) => {
      let _dat = response.data;
      let tmp = [];
      let currentCount = 0;
      for (let y = 0; y < _dat.length; y++) {

        let __dat = _dat[y].data;
        for (let x = 0; x < __dat.length; x++) {
          let tmp_src = __dat[x];
          tmp.push({
            number: currentCount+1,
            content: tmp_src.Message,
            datetime: tmp_src.Time,
          });
          currentCount++;
        }
      }



      setData({ columns: dataRep, rows: tmp });
      setResultCount(currentCount);
      //   setLoading(false);
    });
  }, []);

  return  <React.Fragment>
            <br/>
            <h4>Found <b>{resultCount} Results</b>  for query <b>{props.searchQuery}</b></h4>
            <MDBDataTable striped bordered hover data={data} />
          </React.Fragment>;
}

export default TelegramGroupSearchResult;
