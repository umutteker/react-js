import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import ListRecord from "./component/Record/ListRecord";
import AddRecord from "./component/Record/AddRecord";

function App() {
  return (
    <>
      <div className="container">
        <div className="row">
          <a style={{ textDecoration: "none" }} href="/">
            Records
          </a>
          <a
            style={{ textDecoration: "none", marginLeft: "2rem" }}
            href="/addRecord"
          >
            Add Records
          </a>
        </div>
      </div>
      <Switch>
        <Route path="/" exact component={ListRecord} />
        <Route path="/addRecord" exact component={AddRecord} />
      </Switch>
    </>
  );
}

export default App;
