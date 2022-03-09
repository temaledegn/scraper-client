import React, { Component, useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";

import axios from "axios";

import APIConstants from "../../../constants/constants";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import globalFunctions from "../../../common/GlobalsFunctions";




class ReportWidget extends React.Component {

  constructor(props) {
    super(props);
    this.state = { reporting: props.reporting, tweetId: props.tweetId };
  }

  render() {
    if (this.state.reporting == 'false') {
      return React.createElement('button', { disabled: true, id: this.props._id, className: "btn btn-sm btn-warning", onClick: () => { onHandleReport(this.props._type, this.props.tweetId, this) } }, 'Report');
    } else if (this.state.reporting == 'pending') {
      return React.createElement('span', { id: this.props._id, },
        React.createElement('i', { className: 'fa fa-spinner', style: { color: 'orange' } }, ''),
        React.createElement('span', {}, ' Pending...')
      );
    } else if (this.state.reporting == 'true') {
      return React.createElement('p', { id: this.props._id, },
        React.createElement('i', { className: 'fa fa-check-circle', style: { color: 'green' } }, ''),
        React.createElement('span', {}, 'Reported')
      );
    } else {
      return 'N/A';
    }
  };
}


let onHandleReport = (_type, _id, button) => {
  axios.post(APIConstants.REQUESTS_API_ROOT + '/reporting/twitter/add', { 'reporting_data': _type + ',' + _id + ',' + globalFunctions.getUserId() }, {
    headers: { 'x-access-token': globalFunctions.getAccessToken() }
  })
    .then((response) => {
      if (response.data.type == 'success') {
        toast.success(response.data.message);
        button.setState({
          reporting: 'pending'
        });
      } else if (response.data.type == 'warning') {
        toast.warning(response.data.message);
        button.setState({
          reporting: 'pending'
        });

      } else if (response.data.type == 'error') {
        toast.error(response.data.message);
      }
    });
}

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

let data, setData;

let currentlyReporting = [];

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
        <b style={{ color: '#888' }}>Hashtags:</b>&emsp;<span>{this.props.hashtags.length == 0 ? <span style={{ color: 'grey' }}>None</span> : hashtags}</span>
        <br />
        <br />
        <b style={{ color: '#888' }}>Reporting:</b>&emsp;<ReportWidget reporting={this.props.reporting === true ? 'true' : currentlyReporting.includes(this.props.tweetId) ? 'pending' : 'false'} tweetId={this.props.tweetId} _type='reply' />
        <br />
        <br />
        <p><b style={{ color: '#888' }}>More Actions:</b></p>
        <div className="row">
          <div className="col-md-4"><i className="fa fa-comment-o" onClick={() => alert('Not Supported YET')}></i></div>
          <div className="col-md-4"><i className="fa-light fa fa-retweet" onClick={() => alert('Not Supported YET')}></i></div>
          <div className="col-md-4"><i className="fa fa-heart-o" onClick={() => alert('Not Supported YET')}></i></div>
        </div>
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


            for (let x = 0; x < data.rows.length; x++) {
              var reporting = _dat.reporting;
              if (reporting === null) {
                reporting = { is_reported: false, reported_by: null, reporting_data: null };
              }

              if (data.rows[x].tweetID === tweet_id) {
                replyList = _dat.map((_dat) => (
                  <ReplySection
                    tweetId={_dat.id}
                    reporting={reporting}
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

let tmp = [];

function TweetList(props) {

  [data, setData] = useState();

  const queryParams = new URLSearchParams(window.location.search);
  const doc_id = queryParams.get('doc-id');

  const url = APIConstants.TWITTER_API_ROOT + "/twitter/tweets/" + doc_id;

  useEffect(() => {


    axios.get(APIConstants.TWITTER_API_ROOT + "/reporting/twitter/get", {
      headers: {
        'x-access-token': globalFunctions.getAccessToken()
      }
    }).then((response) => {
      // let reporting_list = response.data;
      let reporting_tweet_ids = response.data.map((item) => {
        return item.split(',')[1];
      })
      currentlyReporting.push(...reporting_tweet_ids);

    });

    axios.get(url, {
      headers: {
        'x-access-token': globalFunctions.getAccessToken()
      }
    }).then((response) => {
      let _dat = response.data.tweets;
      tmp = [];
      let tmp_src = {};



      for (let x = 0; x < _dat.length; x++) {

        tmp_src = _dat[x];
        let reporting = tmp_src.reporting;

        tmp.push({
          tweetID: _dat[x].id,
          number: x + 1,
          content: (<div>
            <div>{tmp_src.tweet}</div>
            <br />
            <div className="row">
              <div className="col-md-4"><i className="fa fa-comment-o" onClick={() => alert('Not Supported YET')}></i></div>
              <div className="col-md-4"><i className="fa-light fa fa-retweet" onClick={() => alert('Not Supported YET')}></i></div>
              <div className="col-md-4"><i className="fa fa-heart-o" onClick={() => alert('Not Supported YET')}></i></div>
            </div>
          </div>),
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
          sentiment: tmp_src.sentiment == '' || tmp_src.sentiment == null ? 'N/A' : tmp_src.sentiment,
          reporting: (<ReportWidget reporting={reporting.is_reported === true ? 'true' : currentlyReporting.includes(_dat[x].id) ? 'pending' : 'false'} tweetId={_dat[x].id} _id={'rw_' + x.toString()} _type='tweet' />),



        });
      }

      setData({ columns: dataRep, rows: tmp });
      //   setLoading(false);
    });
  }, []);






  return <div>
    <ToastContainer
      position="bottom-center"
      className="toast-container"
      theme="colored"
    />
    <MDBDataTable striped bordered hover data={data} onPageChange={
      (_data) => {
        // setData({ columns: dataRep, rows: tmp.slice(11, 21) });
      }

    } />

  </div>;
}

export default TweetList;
