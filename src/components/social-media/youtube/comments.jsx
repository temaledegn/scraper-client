import React, { Component, useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";

import axios from "axios";
import globalFunctions from "../../../common/GlobalsFunctions";
import APIConstants from "../../../constants/constants";

const dataRep = [
    {
        label: "#",
        field: "number",
        sort: "asc",
        width: 20,
    },
    {
        label: "Commenter",
        field: "commenter",
        sort: "asc",
        width: 100,
    },
    {
        label: "Comment",
        field: "comment",
        sort: "asc",
        width: 200,
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


function CommentList(props) {

    [data, setData] = useState();

    const queryParams = new URLSearchParams(window.location.search);
    const doc_id = queryParams.get('doc-id');

    const url = APIConstants.YOUTUBE_API_ROOT + "/youtube/comments/" + doc_id;

    useEffect(() => {
        axios.get(url, {
            headers: {
                'x-access-token': globalFunctions.getAccessToken()
            }
        }).then((response) => {
            console.log(response);
            let _dat = [];
            try {
                _dat = response.data.comments;
            } catch (e) {

            }
            if (_dat === undefined) {
                _dat = [];
            }
            let tmp = [];
            let tmp_src = {};
            for (let x = 0; x < _dat.length; x++) {
                tmp_src = _dat[x];
                tmp.push({
                    number: x + 1,
                    commenter: tmp_src.comment_name,
                    comment: tmp_src.comment,
                    sentiment: React.createElement('p', { color: 'grey' }, 'N/A'),
                    reporting: React.createElement('button', { className: "btn btn-sm btn-warning", disabled: true }, 'Report')
                });
            }
            setData({ columns: dataRep, rows: tmp });
            //   setLoading(false);
        });
    }, []);

    return <MDBDataTable striped bordered hover data={data} />;
}

export default CommentList;
