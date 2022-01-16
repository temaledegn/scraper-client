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

function TweetSearchResult(props) {
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
    // {
    //   label: datetimeString,
    //   field: "datetime",
    //   sort: "asc",
    //   width: 100,
    // },
    {
      label: actionString,
      field: "actions",
      sort: "disabled",
      width: 100,
    },

    {
      label: 'Sentiment',
      field: "sentiment",
      sort: "asc",
      width: 50,
    },
    {
      label: 'Reporting',
      field: "reporting",
      sort: "disabled",
      width: 50,
    },
  ];

  //   const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  let searchQuery = props.searchQuery;
  const url = APIConstants.TWITTER_API_ROOT + "/twitter/search?q=" + searchQuery;

  useEffect(() => {
    axios.get(url, {
      headers: {
        'x-access-token': globalFunctions.getAccessToken()
      }
    }).then((response) => {
      console.log(response);
      let _dat = response.data;
      if (_dat.length == 0 || _dat[0] == null) {
        setData({ columns: dataRep, rows: [] });
        return;
      }

      let tmp = [];
      for (let y = 0; y < _dat.length; y++) {

        let __dat = _dat[y].tweets;
        for (let x = 0; x < __dat.length; x++) {
          let tmp_src = __dat[x];
          tmp.push({
            tweetID: tmp_src.id,
            number: y * (_dat.length - 1) + x + 1,
            content: tmp_src.tweet,
            likes: parseInt(tmp_src.likes_count),
            by: <UserLink username={tmp_src.username} name={tmp_src.name} />,
            retweets: parseInt(tmp_src.retweets_count),
            // datetime: parseInt(tmp_src.created_at),
            actions: (
              <a href={'https://www.twitter.com/' + tmp_src.username + '/' + 'status/' + tmp_src.conversation_id} target="?">
                &nbsp;View&nbsp;on Twitter&nbsp;
                <i className="fa fa-external-link"></i>
              </a>
            ),
          });
        }
      }


      setData({ columns: dataRep, rows: tmp });
      //   setLoading(false);
    });
  }, []);

  return <MDBDataTable striped bordered hover data={data} />;
}

export default TweetSearchResult;
