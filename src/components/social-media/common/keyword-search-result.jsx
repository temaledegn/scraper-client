import React, { useEffect } from "react";
import { MDBDataTable } from "mdbreact";

import axios from "axios";
import { useState } from "react";
import globalFunctions from "../../../common/GlobalsFunctions";
import APIConstants from "../../../constants/constants";

function UserLink(props) {
  const linkString = "/twitter/page/" + props.username;
  const linkStringx = "https://www.twitter.com/" + props.username;
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

function KeywordSearchResult(props) {
  const datetimeString = (
    <span>&nbsp;&nbsp;&nbsp;Date&nbsp;&amp;&nbsp;Time&nbsp;&nbsp;&nbsp;</span>
  );
  const actionString = <span>&nbsp;&nbsp;&nbsp;Actions&nbsp;&nbsp;&nbsp;</span>;
  const byString = <span>&nbsp;&nbsp;&nbsp;Posted&nbsp;By&nbsp;&nbsp;</span>;

  const dataRep = [
    {
      label: "#",
      field: "number",
      sort: "asc",
      width: 20,
    },
    {
      label: "Post/Tweet Content",
      field: "content",
      sort: "disabled",
      maxWidth: 100,
      width: 100,
    },
    {
      label: byString,
      field: "by",
      sort: "asc",
      width: 50,
    },
    {
      label: "Likes",
      field: "likes",
      sort: "asc",
      width: 50,
    },
    {
      label: "Shares",
      field: "retweets",
      sort: "asc",
      width: 50,
    },
    // {
    //   label: datetimeString,
    //   field: "datetime",
    //   sort: "asc",
    //   width: 100,
    // },
    {
        label: 'DateTime',
        field: "datetime",
        sort: "asc",
        width: 100,
      },   
      {
        label: 'Data Source',
        field: "datasource",
        sort: "asc",
        width: 50,
      },
 
  ];

  //   const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [resultCount, setResultCount] = useState();
  let searchQuery = props.searchQuery;
  const url = APIConstants.COMMON_API_ROOT + "/twitter/search?q=" + searchQuery;

  useEffect(() => {
    axios.get(url, {
      headers: {
        'x-access-token': globalFunctions.getAccessToken()
      }
    }).then((response) => {
      let _dat = response.data;
      console.log(_dat);
      if (_dat.length == 0 || _dat[0] == null) {
        setData({ columns: dataRep, rows: [] });
        return;
      }

      let tmp = [];
      let currentCount = 1;
      for (let y = 0; y < _dat.length; y++) {

        let __dat = _dat[y].tweets;
        for (let x = 0; x < __dat.length; x++) {
          let tmp_src = __dat[x];
          tmp.push({
            number: currentCount,
            content: tmp_src.tweet,
            likes: parseInt(tmp_src.likes_count),
            by: <UserLink username={tmp_src.username} name={tmp_src.name} />,
            retweets: parseInt(tmp_src.retweets_count),
            datetime: 'N/A',
   
          });
          currentCount++;
        }
      }


      setData({ columns: dataRep, rows: tmp });
      setResultCount(currentCount);
      
    });
  }, []);

  return <React.Fragment>
            <br/>
            <h4><b>Found {resultCount} Results</b></h4>
            <MDBDataTable striped bordered hover data={data} />
        </React.Fragment>;
}

export default KeywordSearchResult;
