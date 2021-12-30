import React, { Component, useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";

import axios from "axios";
import getAccessToken from "../../../common/GlobalsFunctions";
import APIConstants from "../../../constants/constants";

const datetimeString = (
  <span>&nbsp;&nbsp;&nbsp;Date&nbsp;&amp;&nbsp;Time&nbsp;&nbsp;&nbsp;</span>
);
const actionString = <span>&nbsp;&nbsp;&nbsp;Actions&nbsp;&nbsp;&nbsp;</span>;

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
    label: "Likes",
    field: "likes",
    sort: "asc",
    width: 50,
  },
  {
    label: "Hashtags",
    field: "hashtags",
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
let data, setData;
// let userName = props.userName;


class ReplySection extends Component {
  state = {};
  render() {
    let hashtags = this.props.hashtags.map((ht) => <a href={"https://twitter.com/hashtag/" + ht + "?src=hashtag_click"}>#{ht} </a>)
    return (
      <div style={{ textAlign: "left" }}>
        <h6>
          <a
            href={'https://www.twitter.com/' + this.props.username}
            target="?"
          >
            {this.props.name}&ensp;
            <i
              className="fa fa-external-link"
              style={{ fontSize: "small" }}
            ></i>
          </a>
        </h6>

        <p>{this.props.content}</p>
        <b style={{ color: '#888' }}>Likes:</b>&emsp;<span>{this.props.like_count}</span>&emsp;&emsp;
        <b style={{ color: '#888' }}>Retweets:</b>&emsp;<span>{this.props.retweet_count}</span>&emsp;&emsp;
        <b style={{ color: '#888' }}>Replies:</b>&emsp;<span>{this.props.reply_count}</span>&emsp;&emsp;
        <b style={{ color: '#888' }}>Hashtags:</b>&emsp;<span>{this.props.hashtags.length == 0 ? <span style={{ color: 'grey' }}>None</span> :hashtags}</span>
        <hr />
      </div>
    );
  }
}


function ReplyButton(props) {
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    return (
      <b>
        <br />
        <button
          className="btn btn-sm btn-outline-primary"
          style={{ margin: "5% 0 0 0" }}
          onClick={() => {
            let tweet_id = props.tweet_id;

            let _dat = props.reply_list;
            let replyList;
            // console.log(_dat);

            for (let x = 0; x < data.rows.length; x++) {
              if (data.rows[x].tweetID === tweet_id) {
                replyList = _dat.map((_dat) => (
                  <ReplySection
                    name={_dat.name}
                    username={_dat.username}
                    content={_dat.reply}
                    reply_count={parseInt(_dat.replies_count)}
                    retweet_count={parseInt(_dat.retweets_count)}
                    like_count={parseInt(_dat.likes_count)}
                    hashtags={JSON.parse(_dat.hashtags.replaceAll('\'', '"'))}
                  />
                ));
                let _tmp = [
                  data.rows[x].content,
                  <div style={{ margin: "5%" }}>
                    <hr />
                    <h4>Replies</h4>
                    <hr />
                  </div>,
                ];
                const __tmp = _tmp.concat(replyList);
                // const __tmp = _tmp.concat(<div style={{overflowX:"scroll", maxWidth:"40vw"}}>{replyList}</div>);


                replyList.splice(0, 0, data.rows[x].content);

                data.rows[x].content = __tmp;
                break;
              }
            }

            setData({ columns: dataRep, rows: data.rows });



            setLoaded(true);
          }}
        >
          <i className="fa fa-reply"></i>&nbsp;Replies
        </button>
      </b>
    );
  } else {
    return (
      <b>
        <br />
        <br />
        <button
          className="btn btn-warning btn-sm"
          onClick={() => {
            for (let x = 0; x < data.rows.length; x++) {
              if (data.rows[x].tweetID === props.tweet_id) {
                data.rows[x].content = data.rows[x].content[0];
                break;
              }
            }
            setData({ columns: dataRep, rows: data.rows });
            setLoaded(false);
          }}
        >
          Hide Replies
        </button>
      </b>
    );
  }
}

function TweetList(props) {

  [data, setData] = useState();

  const queryParams = new URLSearchParams(window.location.search);
  const doc_id = queryParams.get('doc-id');

  const url = APIConstants.TWITTER_API_ROOT + "/twitter/tweets/" + doc_id;

  useEffect(() => {
    axios.get(url, {
      headers: {
        'x-access-token': getAccessToken()
      }
    }).then((response) => {
      //   console.log(response);
      let _dat = response.data.tweets;
      let tmp = [];
      let tmp_src = {};
      for (let x = 0; x < _dat.length; x++) {
        tmp_src = _dat[x];
        tmp.push({
          tweetID: _dat[x].id,
          number: x + 1,
          content: tmp_src.tweet,
          likes: parseInt(tmp_src.likes_count),
          hashtags: JSON.parse(tmp_src.hashtags.replaceAll('\'', '"')).map((item) => React.createElement('div', {},
            React.createElement('a', { href: 'https://twitter.com/hashtag/' + item + '?src=hashtag_click', target: '_blank' }, '#' + item))),
          retweets: parseInt(tmp_src.retweets_count),
          // datetime: tmp_src.created_at,
          actions: (
            <div>
              <a href={'https://www.twitter.com/' + tmp_src.username + '/' + 'status/' + tmp_src.conversation_id} target="?">
                &nbsp;View&nbsp;on Twitter&nbsp;
                <i className="fa fa-external-link"></i>
              </a>
              <br />
              <ReplyButton reply_list={tmp_src.replies} tweet_id={_dat[x].id} />
            </div>

          ),
          sentiment: React.createElement('p', {color:'grey'}, 'N/A'),
          reporting:React.createElement('button', {className:"btn btn-sm btn-warning", disabled:true}, 'Report')
        });
      }
      setData({ columns: dataRep, rows: tmp });
      //   setLoading(false);
    });
  }, []);

  return <MDBDataTable striped bordered hover data={data} />;
}

export default TweetList;
