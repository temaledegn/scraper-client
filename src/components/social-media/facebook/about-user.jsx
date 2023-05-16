import React, { Component, useEffect, useState } from "react";

import { useLocation } from 'react-router-dom';
import Avatar from 'react-avatar';



// function AboutPage(props) {
//     // Always check because state is empty on first visit
//     if (props.location.state.product) {
//       console.log(props.location.state.product);
//       // { id: '...', images: [...], price: { ... } }
//     }
//   }


function AboutPage(props) {
    
    // console.log(props.location.state.friendList);
    const location = useLocation();
const data = location.state;

console.log(data);



  // return <MDBDataTable striped bordered hover data={data} />;
  return <div className="container">
    <br/>
    <h3>About User</h3>
    {
        data.about.map(function (item)  {
            if (Object.keys(item).length > 0){
                var key = Object.keys(item)[0];
                return <div><b>{key}:</b> {item[key]}<br/><br/></div>
            }else{
                return '';
            }
             
        })
    }
    
     <br/><br/>

    <h3>Friends</h3>
    {
        data.friendList.map(function (item)  {
            if (item.friendLink == undefined){
                var friendId = '100008343750912'
                return <div>
                    {/* <img src={imageLink}/> */}
                    <Avatar facebookId={friendId} size="50" />
                    &emsp;
                    <a href={"#"}><b>{item.friendName}</b></a>
                    </div>
            }else{
                var friendIdSplit = item.friendLink.split('/');
                var friendId = friendIdSplit[friendIdSplit.length - 1];
                return <div>
                    {/* <img src={imageLink}/> */}
                    <Avatar facebookId={friendId} size="50" />
                    &emsp;
                    <a href={item.friendLink}><b>{item.friendName}</b></a>
                    </div>
            }
           
        })
    }
   

  </div>;
}

export default AboutPage;
