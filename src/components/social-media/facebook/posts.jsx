import React, { Component, useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";

import axios from "axios";
import APIConstants from '../../../constants/constants';

let data, setData;
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
    label: "Post Content",
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
    label: "Shares",
    field: "shares",
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

function print(content) {
  console.log(content);
}

class CommentSection extends Component {
  state = {};
  render() {
    return (
      <div style={{ textAlign: "left" }}>
        <h6>
          <a
            href={this.props.commenter_profile.replace(
              "m.facebook",
              "www.facebook"
            )}
            target="?"
          >
            {this.props.commenter}&ensp;
            <i
              className="fa fa-external-link"
              style={{ fontSize: "small" }}
            ></i>
          </a>
        </h6>
        <p>{(typeof this.props.content === 'string' || this.props.content instanceof String) ? this.props.content.replace(this.props.commenter, ""):this.props.content}</p>
        <hr />
      </div>
    );
  }
}

function CommentButton(props) {
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    return (
      <b>
        <br />
        <button
          className="btn btn-sm btn-outline-primary"
          style={{ margin: "5% 0 0 0" }}
          onClick={() => {
            var url =
              APIConstants.FB_GROUP_API_ROOT+"/api/pages/comments/" +
              props.doc_id +
              "/" +
              props.page_id +
              "/" +
              props.post_id;
            if (props.type == 'user') {
              url =
                APIConstants.FB_USER_API_ROOT+"/api/users/comments/" +
                props.doc_id +
                "/" +
                props.page_id +
                "/" +
                props.post_id;
            }

            let post_id = props.post_id;
            
            axios.get(url).then((response) => {
              let _dat = response.data;
              let commentList;

              for (let x = 0; x < data.rows.length; x++) {
                if (data.rows[x].postId === post_id) {
                  commentList = _dat.map((_dat) => (
                    <CommentSection
                      content={_dat.commentContent === undefined ? React.createElement('h4', { style: { color: 'grey' } }, '[Media Content]'): _dat.commentContent }
                      commenter={_dat.commenterName}
                      commenter_profile={_dat.commentorId}
                    />
                  ));
                  let _tmp = [
                    data.rows[x].content,
                    <div style={{ margin: "5%" }}>
                      <hr />
                      <h4>Comments</h4>
                      <hr />
                    </div>,
                  ];
                  const __tmp = _tmp.concat(commentList);

                  commentList.splice(0, 0, data.rows[x].content);

                  data.rows[x].content = __tmp;
                  break;
                }
              }

              setData({ columns: dataRep, rows: data.rows });
            });
            setLoaded(true);
          }}
        >
          <i className="fa fa-comment-o"></i>&nbsp;Comments
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
              if (data.rows[x].postId === props.post_id) {
                data.rows[x].content = data.rows[x].content[0];
                break;
              }
            }
            setData({ columns: dataRep, rows: data.rows });
            setLoaded(false);
          }}
        >
          Hide Comments
        </button>
      </b>
    );
  }
}

function PostList(props) {
  const [loading, setLoading] = useState(true);
  [data, setData] = useState();
  let pageName = props.pageName;

  const queryParams = new URLSearchParams(window.location.search);
  const page_id = queryParams.get('id');
  const doc_id = queryParams.get('doc-id');
  const type = queryParams.get('type');


  var url = APIConstants.FB_GROUP_API_ROOT+"/api/pages/posts/" + doc_id + '/' + page_id;
  if (type == 'user') {
    url = APIConstants.FB_USER_API_ROOT+"/api/users/posts/" + doc_id + '/' + page_id;
  }

  useEffect(() => {
    axios.get(url).then((response) => {
      let _dat = response.data;
      let tmp = [];
      for (let x = 0; x < _dat.length; x++) {
        tmp.push({
          postId: _dat[x]._id,
          number: x + 1,
          content: _dat[x].postContent == '' ? React.createElement('h4', { style: { color: 'grey' } }, '[Media Content]') : _dat[x].postContent,

          likes: parseInt(_dat[x].numberOfLikes),
          shares: parseInt(_dat[x].numberOfShares.slice(0, -6)),
          datetime: _dat[x].timeOfPost,
          actions: (
            <div>
              <a
                style={{ fontSize: "small" }}
                href={_dat[x].postId.replace("m.facebook", "www.facebook")}
                target="?"
              >
                View on Facebook <i className="fa fa-external-link"></i>
              </a>
              <CommentButton doc_id={doc_id} page_id={page_id} post_id={_dat[x]._id} type={type} />
            </div>
          ),
        });
      }
      setData({ columns: dataRep, rows: tmp });
      setLoading(false);
    });
  }, []);

  return <MDBDataTable striped bordered hover data={data} />;
}

export default PostList;
