import React, { useEffect } from "react";
import { MDBDataTable } from "mdbreact";

import axios from "axios";
import { useState } from "react";

import getAccessToken from "../../../common/GlobalsFunctions";
import APIConstants from "../../../constants/constants";

function TelegramPostList(props) {
  let [_username, setUsername] = useState('');

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
      label: "Message Content",
      field: "content",
      sort: "disabled",
      maxWidth: 100,
      width: 100,
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


  const queryParams = new URLSearchParams(window.location.search);
  const doc_id = queryParams.get('id');
  const type = queryParams.get('type');

  //   const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  // let userName = props.userName;
  const url = APIConstants.TELEGRAM_API_ROOT + "/telegram/telegram-posts/" + type + '/' + doc_id;
  // let _username = '';
  let __username = '';
  useEffect(() => {
    axios.get(url, {
      headers: {
        'x-access-token': getAccessToken()
      }
    }).then((response) => {
      let _dat = [];
      let ___username = '';
      if (type == 'group') {
        _dat = response.data.group_data;
        ___username = response.data.group_username;
        setUsername(response.data.group_username);
      } else {
        _dat = response.data.data;
        ___username = response.data.channel_username;

        setUsername(response.data.channel_username);
      }
      if (_dat == undefined) {
        setData({ columns: dataRep, rows: [] });
        return;
      }
      let tmp = [];
      let tmp_src = {};
      for (let x = 0; x < _dat.length; x++) {
        tmp_src = _dat[x];
        tmp.push({
          post_id: _dat[x].Message_id,
          number: x + 1,
          content: tmp_src.Message,
          sender_id: tmp_src.Sender_id,
          datetime: tmp_src.Time,
          actions: (
            <a href={"https://t.me/" + ___username + "/" + _dat[x].Message_id} target="?">
              &nbsp;View&nbsp;on Telegram&nbsp;
              <i className="fa fa-external-link"></i>
            </a>
          ),
        });
      }
      setData({ columns: dataRep, rows: tmp });
      //   setLoading(false);
    });
  }, []);

  return <div><br /><br /><h2>{_username}</h2><h4><a href={"https://t.me/" + _username} target="?">Open On Telegram  <i className="fa fa-external-link"></i></a></h4><MDBDataTable striped bordered hover data={data} /></div>;
}

export default TelegramPostList;
