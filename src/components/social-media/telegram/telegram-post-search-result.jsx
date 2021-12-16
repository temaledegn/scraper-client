import React, { useEffect } from "react";
import { MDBDataTable } from "mdbreact";

import axios from "axios";
import { useState } from "react";
import APIConstants from "../../../constants/constants";

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

function TelegramPostSearchResult(props) {
  const datetimeString = (
    <span>&nbsp;&nbsp;&nbsp;Date&nbsp;&amp;&nbsp;Time&nbsp;&nbsp;&nbsp;</span>
  );
  const actionString = <span>&nbsp;&nbsp;&nbsp;Actions&nbsp;&nbsp;&nbsp;</span>;
  const byString = <span>&nbsp;&nbsp;&nbsp;Tweet&nbsp;By&nbsp;&nbsp;</span>;

  const dataRep = [
    {
      label: "#",
      field: "number",
      sort: "asc",
      width: 20,
    },
    {
      label: "Tweet Content",
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
      label: "Reteweets",
      field: "retweets",
      sort: "asc",
      width: 50,
    },
    {
      label: datetimeString,
      field: "datetime",
      sort: "asc",
      width: 100,
    },
    {
      label: actionString,
      field: "actions",
      sort: "disabled",
      width: 100,
    },
  ];

  //   const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  let searchQuery = props.searchQuery;
  const url = APIConstants.TELEGRAM_API_ROOT+"/telegram/search?q=" + searchQuery;

  useEffect(() => {
    axios.get(url).then((response) => {
      //   console.log(response);
      let _dat = response.data;
      let tmp = [];
      let tmp_src = {};
      for (let x = 0; x < _dat.length; x++) {
        tmp_src = _dat[x]._source;
        tmp.push({
          tweetID: _dat[x]._id,
          number: x + 1,
          content: tmp_src.tweet,
          likes: tmp_src.likes_count,
          by: <UserLink username={tmp_src.username} name={tmp_src.name} />,
          retweets: tmp_src.retweets_count,
          datetime: tmp_src.created_at,
          actions: (
            <a href={tmp_src.link} target="?">
              &nbsp;View&nbsp;on Twitter&nbsp;
              <i className="fa fa-external-link"></i>
            </a>
          ),
        });
      }
      setData({ columns: dataRep, rows: tmp });
      //   setLoading(false);
    });
  }, []);

  return <MDBDataTable striped bordered hover data={data} />;
}

export default TelegramPostSearchResult;
