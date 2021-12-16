import React, { Component } from "react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useParams,
  Redirect
} from "react-router-dom";
import "./App.css";

import NavBarNA from "./components/non-auth/navbar";
import LandingNA from "./components/non-auth/landing";
import SignupForm from "./components/non-auth/register";
import LoginForm from "./components/non-auth/login";

import NavBar from "./components/common/navbar";
import Landing from "./components/common/landing";
import UserGuide from "./components/common/user-guide";
import NotFound from "./components/common/not-found";
import CommonComponents from "./components/common/common";
import { FacebookPageInfo, TwitterPageInfo, TelegramPageInfo } from "./components/common/page-user";

import Facebook from "./components/social-media/facebook/facebook";
import PreFacebook from "./components/social-media/facebook/pre-facebook";
import PostList from "./components/social-media/facebook/posts";
import PostSearchResult from "./components/social-media/facebook/post-search-result";

import Twitter from "./components/social-media/twitter/twitter";
import TweetList from "./components/social-media/twitter/tweets";
import TweetSearchResult from "./components/social-media/twitter/tweet-search-result";

import PreTelegram from "./components/social-media/telegram/pre-telegram";
import Telegram from "./components/social-media/telegram/telegram";
import TelegramPostList from "./components/social-media/telegram/telegram-posts";
import TelegramPostSearchResult from "./components/social-media/telegram/telegram-post-search-result";

import Linkedin from "./components/social-media/linkedin/linkedin";

import Youtube from "./components/social-media/youtube/youtube";

import insaLogo from "./assets/img/logo.jpg";
import APIConstants from "./constants/constants";

import AuthService from './services/auth.service'



export default class App extends Component {
  state = {}
  componentDidMount() {
    try {
    } catch (error) {
    }
  }


  render() {
    return (
      <div>
        <div className="content">
          <Router>
            <Switch>

              <Route exact path="/no-access" component={NoAccess} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/logout" component={Logout} />
              <Route path="/login" component={Login} />

              <PrivateRoute path="/facebook/search">
                <FacebookSearch />
              </PrivateRoute>
              <PrivateRoute path="/facebook">
                <FacebookX />
              </PrivateRoute>
              <PrivateRoute path="/pre-facebook">
                <FacebookPre />
              </PrivateRoute>
              <PrivateRoute path="/twitter/search">
                <TwitterSearch />
              </PrivateRoute>
              <PrivateRoute path="/twitter">
                <TwitterX />
              </PrivateRoute>
              <PrivateRoute path="/telegram/search">
                <TelegramSearch />
              </PrivateRoute>
              <PrivateRoute path="/telegram">
                <TelegramX />
              </PrivateRoute>
              <PrivateRoute path="/pre-telegram">
                <TelegramPre />
              </PrivateRoute>
              <PrivateRoute path="/linkedin">
                <LinkedinX />
              </PrivateRoute>
              <PrivateRoute path="/youtube">
                <YoutubeX />
              </PrivateRoute>
              <PrivateRoute path="/user-guide">
                <UserGuideX />
              </PrivateRoute>
              <PrivateRoute path="/">
                <LandingX />
              </PrivateRoute>
            </Switch>
          </Router>
        </div>
      </div>
    )
  }
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route {...rest} render={({ location }) => {
      let data = AuthService.getCurrentUser();
      if (data[0] === true) {
        if (data[1].includes("ROLE_ADMIN")) {
          return children;
        } else {
          return <Redirect to={{
            pathname: '/no-access',
            state: { from: location }
          }} />
        }
      } else {
        return <Redirect to={{
          pathname: '/login',
          state: { from: location }
        }} />
      }
      // return data[0] === true
      //   ? children
      //   : <Redirect to={{
      //     pathname: '/login',
      //     state: { from: location }
      //   }} />
    }} />
  )
}




function FacebookSearch() {
  const urlParams = new URLSearchParams(window.location.search);
  const q = urlParams.get("q");
  const type = urlParams.get("type");
  const doc_id = urlParams.get("doc-id");

  return (
    <React.Fragment>
      <NavBar />
      <CommonComponents.SearchBoxSmall action="/facebook/search" doc_id={doc_id} type={type} />
      <FacebookPageInfo linkHidden={true} _name={q} />
      <div
        className="container"
        style={{ marginBottom: "10%", textAlign: "center" }}
      >
        <PostSearchResult searchQuery={q} doc_id={doc_id} type={type} />
      </div>
    </React.Fragment>
  );
}

function TwitterSearch() {
  const urlParams = new URLSearchParams(window.location.search);
  const q = urlParams.get("q");

  return (
    <React.Fragment>
      <NavBar />
      <CommonComponents.SearchBoxSmall action="/twitter/search" />
      <TwitterPageInfo linkHidden={true} _name={q} />
      <div
        className=""
        style={{ marginBottom: "10%", textAlign: "center", marginLeft: "17%", marginRight: "17%" }}
      >
        <TweetSearchResult searchQuery={q} />
      </div>
    </React.Fragment>
  );
}

function TelegramSearch() {
  const urlParams = new URLSearchParams(window.location.search);
  const q = urlParams.get("q");

  return (
    <React.Fragment>
      <NavBar />
      <CommonComponents.SearchBoxSmall action="/telegram/search" />
      <TelegramPageInfo linkHidden={true} _name={q} />
      <div
        className="container"
        style={{ marginBottom: "10%", textAlign: "center" }}
      >
        <TelegramPostSearchResult searchQuery={q} />
      </div>
    </React.Fragment>
  );
}

function LandingX() {
  return (
    <React.Fragment>
      <NavBar />
      <Landing />
    </React.Fragment>
  );
}

function LandingXNA() {
  return (
    <React.Fragment>
      <NavBarNA />
      <LandingNA />
    </React.Fragment>
  );
}

function Logout() {
  AuthService.logout();
  const history = useHistory();
  history.push('/');
  return LandingX;
}

function Login() {
  return (
    <React.Fragment>
      <NavBarNA />
      <div className="container" style={{ marginTop: "3%" }}>
        <div className="container">
          <LoginForm />
        </div>
        <br />
      </div>
    </React.Fragment>
  );
}
function Signup() {
  return (
    <React.Fragment>
      <NavBarNA /><div className="container" style={{ marginTop: "3%" }}>
        <div className="container">
          <SignupForm />
        </div>
        <br />
      </div>
    </React.Fragment>
  );
}

function UserGuideX() {
  return (
    <React.Fragment>
      <NavBar />
      <UserGuide />
    </React.Fragment>
  );
}


function FacebookPre() {
  return (
    <React.Fragment>
      <NavBar />
      <PreFacebook />
    </React.Fragment>
  );
}


function FacebookX() {
  let match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/page/:pageName`}>
        <FacebookPage />
      </Route>
      <Route path={match.path}>
        <FacebookLanding />
      </Route>
    </Switch>
  );
}

function TwitterX() {
  let match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/page/:userName`}>
        <TwitterPage />
      </Route>
      <Route path={match.path}>
        <TwitterLanding />
      </Route>
    </Switch>
  );
}

function TelegramX() {
  let match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/channel/:userName`}>
        <TelegramPage />
      </Route>
      <Route path={`${match.path}/group/:userName`}>
        <TelegramPage />
      </Route>
      <Route path={match.path}>
        <TelegramLanding />
      </Route>
    </Switch>
  );
}

function TelegramPre() {
  return (
    <React.Fragment>
      <NavBar />
      <PreTelegram />
    </React.Fragment>
  );
}

function LinkedinX() {
  let match = useRouteMatch();
  return (
    <Switch>
      {/* <Route path={`${match.path}/page/:pageName`}>
        <FacebookPage />
      </Route> */}
      <Route path={match.path}>
        <LinkedinLanding />
      </Route>
    </Switch>
  );
}


function YoutubeX() {
  let match = useRouteMatch();
  return (
    <Switch>
      <Route path={match.path}>
        <YoutubeLanding />
      </Route>
    </Switch>
  );
}


function FacebookLanding() {
  return (
    <React.Fragment>
      <NavBar />
      <Facebook />
      {/* <Footer /> */}
    </React.Fragment>
  );
}

function TwitterLanding() {
  return (
    <React.Fragment>
      <NavBar />
      <Twitter />
      {/* <Footer /> */}
    </React.Fragment>
  );
}

function TelegramLanding() {
  return (
    <React.Fragment>
      <NavBar />
      <Telegram />
      {/* <Footer /> */}
    </React.Fragment>
  );
}

function LinkedinLanding() {
  return (
    <React.Fragment>
      <NavBar />
      <Linkedin />
      {/* <Footer /> */}
    </React.Fragment>
  );
}


function YoutubeLanding() {
  return (
    <React.Fragment>
      <NavBar />
      <Youtube />
      {/* <Footer /> */}
    </React.Fragment>
  );
}

let about = "";
let numberOfLikes = "";
let fbLink = "";
let _name = "";

function FacebookPage() {
  const [loading, setLoading] = useState(true);
  let { pageName } = useParams();
  // used the twitter api root to make the port number the same as the 
  // twitter api server 
  const url = APIConstants.TWITTER_API_ROOT + "/facebookv2/page/" + pageName;

  // axios.get(url).then((response) => {
  //   about = response.data.about;
  //   numberOfLikes = response.data.numberOfFollowers;
  //   fbLink = response.data.facebookLink;
  //   setLoading(false);
  // });

  return (
    <React.Fragment>
      <NavBar />
      <FacebookPageInfo
        pageName={pageName}
        about={about}
        numberOfLikes={numberOfLikes}
        fbLink={fbLink}
      />
      <div
        className="container"
        style={{ marginBottom: "10%", textAlign: "center" }}
      >
        <PostList pageName={pageName} />
      </div>
    </React.Fragment>
  );
}

function TwitterPage() {
  const [loading, setLoading] = useState(true);
  let { userName } = useParams();
  const url = APIConstants.TWITTER_API_ROOT + "/twitter/page/" + userName;

  // axios.get(url).then((response) => {
  //   _name = response.data._source.name;
  //   setLoading(false);
  // });

  return (
    <React.Fragment>
      <NavBar />
      <TwitterPageInfo linkHidden={false} userName={userName} _name={_name} />
      <div
        // className="container"
        style={{ marginBottom: "10%", textAlign: "center", marginLeft: "15%", marginRight: "15%" }}
      >
        <TweetList userName={userName} />
      </div>
    </React.Fragment>
  );
}

function TelegramPage() {
  const [loading, setLoading] = useState(true);
  let { userName } = useParams();
  const url = APIConstants.TELEGRAM_API_ROOT + "/telegram/page/" + userName;

  axios.get(url).then((response) => {
    _name = response.data.username;
    // _type = response.data.type;
    setLoading(false);
  });

  return (
    <React.Fragment>
      <NavBar />
      <TelegramPageInfo linkHidden={false} userName={userName} _name={_name} />
      <div
        className="container"
        style={{ marginBottom: "10%", textAlign: "center" }}
      >
        <TelegramPostList userName={userName} />
      </div>
    </React.Fragment>
  );
}

function NotFoundX() {
  return (
    <React.Fragment>
      <NavBar />
      <NotFound />
      {/* <Footer /> */}
    </React.Fragment>
  );
}

function NoAccess() {
  return (
    <React.Fragment>
      <NavBar />
      <div className="container" style={{ textAlign: "center", marginTop: "5%" }}>
        <img className="center" src={insaLogo} alt="logo" height={300} style={{ tintColor: "gray" }} />
        <h1 style={{ marginTop: "10%", color: "black" }}>YOU ARE NOT AUTHORIZED TO ACCESS THIS RESOURCE</h1>
      </div>
    </React.Fragment>
  );
}

