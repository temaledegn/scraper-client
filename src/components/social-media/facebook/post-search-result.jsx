import React, { Component, useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";

import axios from "axios";
import APIConstants from "../../../constants/constants";

function UserLink(props) {
  const linkString = "/facebook/page/" + props.username;
  const linkStringx = props.pageLink;
  return (
    <React.Fragment>
      <a target="?" style={{ color: "darkblue" }} href={linkString}>
        {props.name}
      </a>
      <br />
      <a target="?" href={linkStringx}>
        View Page
      </a>
    </React.Fragment>
  );
}

let data, setData;
const datetimeString = (
  <span>&nbsp;&nbsp;&nbsp;Date&nbsp;&amp;&nbsp;Time&nbsp;&nbsp;&nbsp;</span>
);
const actionString = <span>&nbsp;&nbsp;&nbsp;Actions&nbsp;&nbsp;&nbsp;</span>;
const byString = <span>&nbsp;&nbsp;&nbsp;Post&nbsp;By&nbsp;&nbsp;</span>;
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
    label: byString,
    field: "by",
    sort: "disabled",
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
        <p>{(typeof this.props.content === 'string' || this.props.content instanceof String) ? this.props.content.replace(this.props.commenter, "") : this.props.content}</p>
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
              APIConstants.FB_GROUP_API_ROOT + "/api/pages/comments/" +
              props.doc_id +
              "/" +
              props.page_id +
              "/" +
              props.post_id;
            if (props.type == 'user') {
              url =
                APIConstants.FB_USER_API_ROOT + "/api/users/comments/" +
                props.doc_id +
                "/" +
                props.page_id +
                "/" +
                props.post_id;
            }

            let post_id = props.post_id;

            axios.get(url, {
              headers: { 'x-access-token': globalFunctions.getAccessToken() }
            }).then((response) => {
              let _dat = response.data;
              let commentList;

              for (let x = 0; x < data.rows.length; x++) {
                if (data.rows[x].postId === post_id) {
                  commentList = _dat.map((_dat) => (
                    <CommentSection
                      content={_dat.commentContent === undefined ? React.createElement('h4', { style: { color: 'grey' } }, '[Media Content]') : _dat.commentContent}
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

function PostSearchResult(props) {
  const [loading, setLoading] = useState(true);
  [data, setData] = useState();
  let keyword = props.searchQuery;
  var url = APIConstants.FB_GROUP_API_ROOT + '/api/pages/search/' + props.doc_id + '/search?q=' + keyword;
  if (props.type == 'user') {
    url = APIConstants.FB_USER_API_ROOT + '/api/users/search/' + props.doc_id + '/search?q=' + keyword;
  }

  useEffect(() => {
    axios.get(url, {
      headers: { 'x-access-token': globalFunctions.getAccessToken() }
    }).then((response) => {
      let _dat = response.data;
      let __dat;
      let tmp = [];
      // This is done coz of empty posts from a page
      let postCount = 0;

      // console.log(_dat);
      for (let x = 0; x < _dat.length; x++) {
        __dat = _dat[x];
        let name = __dat.groupName;
        let nameLink = "/facebook/page/" + name + "/";
        let fbLink = __dat.facebookLink;
        try {
          fbLink = __dat.groupLink.replace("m.facebook", "www.facebook");
        } catch (e) {
          name = __dat.userName;
          fbLink = __dat.userLink.replace("m.facebook", "www.facebook");
        }

        tmp.push({
          postId: __dat._id,
          number: ++postCount,
          content: __dat.postContent,
          by: (
            <div>
              <a style={{ color: "darkblue" }} href='#'>
                {name}
              </a>
              <br />
              <a href={fbLink} target="?">
                <small>
                  View Page<i className="fa fa-external-link"></i>
                </small>
              </a>
            </div>
          ),
          likes: parseInt(__dat.numberOfLikes),
          shares: parseInt(__dat.numberOfShares.slice(0, -6)),
          datetime: __dat.timeOfPost,
          actions: (
            <div>
              <a
                style={{ fontSize: "small" }}
                href={__dat.postLink.replace("m.facebook", "www.facebook")}
                target="?"
              >
                View on Facebook <i className="fa fa-external-link"></i>
              </a>
              <CommentButton doc_id={props.doc_id} page_id={__dat.group_id} post_id={__dat._id} type={props.type} />
            </div>
          ),
        });


        // for (let y = 0; y < __dat.length; y++) {
        //   tmp.push({
        //     postId: __dat[y]._id,
        //     number: ++postCount,
        //     content: __dat[y].postContent,
        //     by: (
        //       <div>
        //         <a style={{ color: "darkblue" }} href={nameLink} target="?">
        //           {name}
        //         </a>
        //         <br />
        //         <a href={fbLink} target="?">
        //           <small>
        //             View Page<i className="fa fa-external-link"></i>
        //           </small>
        //         </a>
        //       </div>
        //     ),
        //     likes: parseInt(__dat[y].numberOfLikes),
        //     shares: parseInt(__dat[y].numberOfShares.slice(0, -6)),
        //     datetime: __dat[y].timeOfPost,
        //     actions: (
        //       <div>
        //         <a
        //           style={{ fontSize: "small" }}
        //           href={__dat[y].postId.replace("m.facebook", "www.facebook")}
        //           target="?"
        //         >
        //           View on Facebook <i className="fa fa-external-link"></i>
        //         </a>
        //         <CommentButton page_name={name} post_id={__dat[y]._id} />
        //       </div>
        //     ),
        //   });
        // }
      }
      setData({ columns: dataRep, rows: tmp });
      setLoading(false);
    });
  }, []);

  return <MDBDataTable striped bordered hover data={data} />;
}

export default PostSearchResult;
