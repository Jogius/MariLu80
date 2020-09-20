import React from "react";
import {Route, Switch} from "react-router-dom";

import Home from "./containers/Home";
import UploadPhoto from "./containers/UploadPhoto";
import UploadVideo from "./containers/UploadVideo";
import UploadText from "./containers/UploadText";
import SearchEntry from "./containers/SearchEntry";
import ViewAll from "./containers/ViewAll";
import Collage from "./containers/Collage";
import ViewEntry from "./containers/ViewEntry";
import Diashow from "./containers/Diashow";
import NotFound from "./containers/NotFound";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/uploadphoto">
        <UploadPhoto />
      </Route>
      <Route exact path="/uploadvideo">
        <UploadVideo />
      </Route>
      <Route exact path="/uploadtext">
        <UploadText />
      </Route>
      <Route exact path="/searchentry">
        <SearchEntry />
      </Route>
      <Route exact path="/viewall">
        <ViewAll />
      </Route>
      <Route exact path="/diashow">
        <Diashow />
      </Route>
      <Route exact path="/collage">
        <Collage />
      </Route>
      <Route exact path="/entry/:filetype/:filename">
        <ViewEntry />
      </Route>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
