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
  const [stillLoading, setStillLoading] = useState();
  let searchQuery = props.searchQuery;
  const urlTwt = APIConstants.TWITTER_API_ROOT + "/twitter/search?q=" + searchQuery;
  let rowsData = [];
  let twitterCount = 0;
  let telegramChannelCount = 0;
  let telegramGroupCount = 0;

    useEffect(() => {

  if (props.itw == 'true'){
      axios.get(urlTwt, {
        headers: {
          'x-access-token': globalFunctions.getAccessToken()
        }
      }).then((response) => {
        let _dat = response.data;
        if (_dat.length == 0 || _dat[0] == null) {
          setData({ columns: dataRep, rows: [] });
          return;
        }
  
        for (let y = 0; y < _dat.length; y++) {

          let __dat = _dat[y].tweets;
          for (let x = 0; x < __dat.length; x++) {
            let tmp_src = __dat[x];
            rowsData.push({
              number: twitterCount+1,
              content: tmp_src.tweet,
              likes: parseInt(tmp_src.likes_count),
              by: <UserLink username={tmp_src.username} name={tmp_src.name} />,
              retweets: parseInt(tmp_src.retweets_count),
              datetime: 'N/A',
              datasource:'_Twitter_'
    
            });
            twitterCount++;
          }
        }


        setData({ columns: dataRep, rows: rowsData });
        setResultCount(twitterCount+telegramChannelCount+telegramGroupCount)
        
      });
    }
    }, []);
  
  const urlTgCh = APIConstants.TELEGRAM_API_ROOT + "/telegram/channel/search?q=" + searchQuery;
  useEffect(() => {

    setStillLoading(<div className="spinner-border"></div>);
    if (props.itgc == 'true'){
      axios.get(urlTgCh, {
        headers: {
          'x-access-token': globalFunctions.getAccessToken()
        }
      }).then((response) => {
        let _dat = response.data;
        
        if (_dat.length == 0 || _dat[0] == null) {
          setData({ columns: dataRep, rows: [] });
          return;
        }
  
        for (let y = 0; y < _dat.length; y++) {

          let __dat = _dat[y].data;
          for (let x = 0; x < __dat.length; x++) {
            let tmp_src = __dat[x];
            rowsData.push({
              number: telegramChannelCount+1,
              content: tmp_src.Message,
              likes: '-',
              by: '-',
              retweets: '-',
              datetime: tmp_src.Time,
              datasource:'Telegram Channels'
    
            });
            telegramChannelCount++;
          }
        }


        setData({ columns: dataRep, rows: rowsData });
        setResultCount(twitterCount+telegramChannelCount+telegramGroupCount);
        
    setStillLoading(<div></div>);
      });
  }
  }, []);



  const urlTgGp = APIConstants.TELEGRAM_API_ROOT + "/telegram/group/search?q=" + searchQuery;
  useEffect(() => {
    if (props.itgg == 'true'){
    setStillLoading(<div className="spinner-border"></div>);
    axios.get(urlTgGp, {
      headers: {
        'x-access-token': globalFunctions.getAccessToken()
      }
    }).then((response) => {
      let _dat = response.data;
      
      if (_dat.length == 0 || _dat[0] == null) {
        setData({ columns: dataRep, rows: [] });
        return;
      }
 
      for (let y = 0; y < _dat.length; y++) {

        let __dat = _dat[y].data;
        for (let x = 0; x < __dat.length; x++) {
          let tmp_src = __dat[x];
          rowsData.push({
            number: telegramGroupCount+1,
            content: tmp_src.Message,
            likes: '-',
            by: '-',
            retweets: '-',
            datetime: tmp_src.Time,
            datasource:'Telegram Groups'
   
          });
          telegramGroupCount++;
        }
      }


      setData({ columns: dataRep, rows: rowsData });
      setResultCount(twitterCount+telegramChannelCount+telegramGroupCount);
      
      setStillLoading(<div></div>);
    });
  }
  }, []);

  return <React.Fragment>
            <br/>
            <h4><b>Found {resultCount} Results&emsp;{stillLoading}</b></h4>
            <MDBDataTable striped bordered hover data={data} />
        </React.Fragment>;
}

export default KeywordSearchResult;
