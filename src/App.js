import React from "react";
import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Styled from "styled-components";
import { connect } from "react-redux";
import Tray from "./Tray";
import {
  getAllProjs,
  getAllSnippets,
  getAllAppsWithPid,
  getAllCommands,
  getAllTodos
} from "./Actions/index";
import { getAllFiles } from "./Actions/addFileActions";
import { withRouter } from "react-router-dom";
import {
  getAllBookMarksNoPid,
  getAllBookMarks
} from "./Actions/bookmarkActions";
const Container = Styled.div`
width:100%;
display:flex;
flex-direction:column;


`;

function App(props) {
  useEffect(() => {
    props.getAllProjs();
    props.getAllBookMarks();
    props.getAllCommands();
    props.getAllSnippets();
    props.getAllTodos();
    props.getAllAppsWithPid();
    props.getAllBookMarksNoPid();
    props.getAllFiles();
    props.history.push("/projects");
  }, []);

  return (
    <Container>
      <Route path="/" component={Tray} />
    </Container>
  );
}

const mapDispatchToProps = {
  getAllProjs: getAllProjs,
  getAllBookMarks: getAllBookMarks,
  getAllCommands: getAllCommands,
  getAllSnippets: getAllSnippets,
  getAllTodos: getAllTodos,
  getAllAppsWithPid: getAllAppsWithPid,
  getAllBookMarksNoPid: getAllBookMarksNoPid,
  getAllFiles: getAllFiles
};
export default withRouter(connect(null, mapDispatchToProps)(App));
