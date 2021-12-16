import React, { Component } from "react";
import "../css/user-guide.css";

class UserGuide extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="container" style={{ marginTop: "3%" }}>
          <div className="row">
            <div className="col-md-3">
              <div className="sticky">
                <ul className="list-group">
                  <li className="list-group-item">
                    <a href="#div-intro">Intro</a>
                  </li>
                  <li className="list-group-item">
                    <a href="#div-facebook">Facebook</a>
                    <ul className="list-group borderless">
                      <li className="list-group-item">
                        <a href="#data-present-fb">Data Presentation</a>
                      </li>
                      <li className="list-group-item">
                        <a href="#sf-fb">Sort &amp; Filter</a>
                      </li>
                      <li className="list-group-item">
                        <a href="#searching-fb">Searching</a>
                      </li>
                    </ul>
                  </li>
                  <li className="list-group-item">
                    <a href="#div-twitter">Twitter</a>
                    <ul className="list-group borderless">
                      <li className="list-group-item">
                        <a href="#data-present-tw">Data Presentation</a>
                      </li>
                      <li className="list-group-item">
                        <a href="#sf-tw">Sort &amp; Filter</a>
                      </li>
                      <li className="list-group-item">
                        <a href="#searching-tw">Searching</a>
                      </li>
                    </ul>
                  </li>
                  <li className="list-group-item disabled">
                    <a style={{ color: "grey" }} href="#div-insta">
                      Instagram
                    </a>
                  </li>
                  <li className="list-group-item disabled">
                    <a style={{ color: "grey" }} href="#div-news">
                      News
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-9">
              <div id="div-intro">
                <h4>
                  <b>Introduction</b>
                </h4>
                <p>
                  Data presentation tool for scraped content from social media
                  and news sites.
                </p>
              </div>
              <div id="div-facebook">
                <h4>
                  <b>Facebook</b>
                </h4>
                <p>
                  The{" "}
                  <a href="/facebook">
                    facebook page{" "}
                    <small>
                      <i className="fa fa-external-link"></i>
                    </small>
                  </a>{" "}
                  presents the data scraped from groups / pages on Facebook. On
                  the landing page of Facebook, you find most popular or pages
                  with more scraped contents. Click on "Go To Posts" button to
                  view posts from the selected group / page.
                  <div id="data-present-fb" className="container">
                    <br />

                    <h5>
                      <b>Data Presentation &amp; Features</b>
                    </h5>

                    <p>
                      The data is presented in a tabular form which contains the
                      Post Content, Likes, Shares, Timestamp and links to the
                      actual post on facebook.com and also a link which loads
                      the comments for every post if there are any.
                    </p>
                    <div id="sf-fb">
                      <p>
                        <h6>
                          <b>Sort and Filter</b>
                        </h6>
                        You can do sorting by number of likes, number of shares
                        and timestamp, both in ascending and descending order,
                        click on the column header of the field you want to sort
                        by.
                      </p>
                      <p>
                        Once the data is presented you can filter using keyword
                        inside the content, number of likes, number of shares
                        and even date &amp; time. This can be done using the
                        search field available at the upper right corner of the
                        table.
                      </p>
                      <div className="indent">
                        For instance: Searching for 884 might show all posts
                        from the presented data that contain the number 884 in
                        their content or those with 884 likes or shares.
                      </div>
                      <br />
                      <p>
                        The data presented after a search on keyword or
                        group/page name contains all the features mentioned
                        above plus a field "Post By" which shows who made that
                        post. Clicking on the name redirects to all scraped
                        contents by that specific page/group and clicking on
                        "View Page" redirects to actual page on facebook.com{" "}
                      </p>
                    </div>
                  </div>
                  <div id="searching-fb" className="container">
                    <br />
                    <h5>
                      <b>Searching</b>
                    </h5>
                    <p>
                      You can do keyword search or group/page name search on the
                      search field provided at the landing page of Facebook
                    </p>
                    <p>
                      To search by keyword just enter the word in the input
                      field and press enter or click search, This will return
                      all posts that contains the entered keyword <b>Note:</b>{" "}
                      The search is case insensitive
                    </p>

                    <p>
                      To search for group/page name put the at (@) character
                      before the group/page name and press enter or click
                      search, This returns posts from pages/groups that contains
                      the word after the character @ in their names.{" "}
                      <b>Note:</b> The search is case insensitive.
                    </p>
                    <div className="indent">
                      For instance: Searching for @bb might show all posts from
                      "BBC", "BBC Africa", "BBC News" and "BBQ Shop"
                    </div>
                    <br />
                    <p>
                      To search for a word that starts with the character @,
                      just enclose the word in double quotes
                    </p>
                    <div className="indent">
                      For instance: If you want to get all the posts that
                      contains @bb, including the character '@', you can do
                      "@bb" search.
                    </div>
                    <br />
                    <p>
                      To search for a word inside quotations, just enclose the
                      word in quotations in other quotations.
                    </p>
                    <div className="indent">
                      For instance: If you want to get all the posts that
                      contains "BBC", including the quotes, you can do ""BBC""
                      search.
                    </div>
                  </div>
                </p>
              </div>
              <div id="div-twitter">
                <h4>
                  <b>Twitter</b>
                </h4>
                <p>
                  The{" "}
                  <a href="/twitter">
                    twitter page{" "}
                    <small>
                      <i className="fa fa-external-link"></i>
                    </small>
                  </a>{" "}
                  presents the data scraped from twitter users on Twitter. On
                  the landing page of twitter, you find most popular tweets or
                  users with more scraped contents. Click on "Go To Tweets"
                  button to view tweets from the selected user.{" "}
                  <div id="data-present-tw" className="container">
                    <br />
                    <h5>
                      <b>Data Presentation &amp; Features</b>
                    </h5>
                    <p>
                      The data is presented in a tabular form which contains the
                      Tweet Content, Likes, Retweets, Mentions, Timestamp and
                      links to the actual tweet on twitter.com.
                    </p>
                    <div id="sf-tw">
                      <h6>
                        <b>Sort and Filter</b>
                      </h6>
                      <p>
                        You can do sorting by number of likes, number of
                        mentions, number of retweets and timestamp, both in
                        ascending and descending order, click on the column
                        header of the field you want to sort by.
                      </p>
                      <p>
                        Once the data is presented you can filter using keyword
                        inside the content, number of likes, number of mentions,
                        number of retweets and even date &amp; time. This can be
                        done using the search field available at the upper right
                        corner of the table.
                      </p>
                      <div className="indent">
                        For instance: Searching for 5 might show all tweets from
                        the presented data that contain the number 884 in their
                        content or those with 5 likes, mentions, retweets and
                        datetime.
                      </div>
                      <br />
                      <p>
                        The data presented after a search on keyword or username
                        contains all the features mentioned above plus a field
                        "Tweet By" which shows who made that tweet. Clicking on
                        the name shows all scraped contents by that specific
                        user and clicking on "View Page" redirects to actual
                        page of the user on twitter.com{" "}
                      </p>{" "}
                    </div>
                  </div>
                  <div id="searching-tw" className="container">
                    <br />
                    <h5>
                      <b>Searching</b>
                    </h5>
                    <p>
                      You can do keyword search or username search on the search
                      field provided at the landing page of Twitter
                    </p>
                    <p>
                      To search by keyword just enter the word in the input
                      field and press enter or click search, This will return
                      all tweets that contains the entered keyword <b>Note:</b>{" "}
                      The search is case insensitive
                    </p>

                    <p>
                      To search for user using username put the at (@) character
                      before the username and press enter or click search, This
                      returns all tweets from that user. Unlike facebook's
                      search you have to enter the exact username to get the
                      tweets from the user you want. <b>Note:</b> The search is
                      case insensitive.
                    </p>
                    <div className="indent">
                      For instance: Searching for @realDonaldTrump shows all
                      tweets from the user Donald J. Trump, If one character is
                      missing or is misspelled you get empty result or tweets
                      from that username if there is one.
                    </div>
                    <br />
                    <p>
                      To search for a word that starts with the character @,
                      just enclose the word in double quotes
                    </p>
                    <div className="indent">
                      For instance: If you want to get all the tweets that
                      contains @realDonaldTrump, including the character '@',
                      you can do "@realDonaldTrump" search. This shows all the
                      tweets that contains the username @realDonaldTrump in
                      their tweet content
                    </div>
                    <br />
                    <p>
                      To search for a word inside quotations, just enclose the
                      word in quotations in other quotations.
                    </p>
                    <div className="indent">
                      For instance: If you want to get all the posts that
                      contains "realDonaldTrump", including the quotes, you can
                      do ""realDonaldTrump"" search.
                    </div>
                  </div>
                </p>
              </div>
              <div id="div-insta"></div>
              <div id="div-news"></div>
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <h3 style={{ color: "white", background: "#aaf" }}>
              <b>INSA OSINT Team</b>
            </h3>
          </div>

          <br />
          <br />
        </div>
      </React.Fragment>
    );
  }
}

export default UserGuide;
