import React, { useState, useEffect } from "react";
import BreadCrumbs from "../UIElements/BreadCrumbs";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Styled from "styled-components";
import "./command.css";
import {
  Input,
  Header,
  Divider,
  List,
  Icon,
  Form,
  Dropdown,
  Popup,
  Label,
  Button
} from "semantic-ui-react";
import addCommandModal from "./addCommandModal";
const ipc = window.require("electron").ipcRenderer;

function Commands(props) {
  const [isHidden, setIsHidden] = useState(true);
  let crumbs = props.location.pathname.split("/");
  const ListStyle = {
    width: "100%",
    paddingTop: "15px"
  };
  const itemStyle = {
    // display: "flex",
    // justifyContent: "center"
  };
  const [options, setOptions] = useState([]);
  const [updatedCommandList, setUpdatedCommandList] = useState(props.commands);
  const [searchTerm, setTerm] = useState("");
  const dropChange = (event, { value }) => {
    setUpdatedCommandList(
      props.commands.filter(word =>
        word.category.toLowerCase().includes(event.target.textContent)
      )
    );
    if (event.target.textContent === "none") {
      setUpdatedCommandList(props.commands);
    }
  };
  useEffect(() => {
    if (props.commands) {
      let comms = [];
      let arr = [{ key: 0, text: "none", value: "none" }];
      props.commands.forEach((command, i) => {
        if (comms.indexOf(command.category) < 0) {
          comms.push(command.category);
          arr.push({
            key: i + 1,
            text: command.category,
            value: command.category
          });
        }
      });

      setOptions(arr);
    }
  }, [props.bookmarksNoPid]);
  function nameSearch(e, term, list) {
    setUpdatedCommandList(
      list.filter(word => word.name.toLowerCase().includes(term.toLowerCase()))
    );
  }
  function searchChange(e) {
    const value = e.target.value;
    setTerm(value);
  }
  const openLink = url => {
    ipc.send("openLink", url);
  };
  function copyCommandToCliboard(com) {
    navigator.clipboard.writeText(com);
  }
  const hideCommandDiv = () => {
    setIsHidden(!isHidden);
  };
  return (
    <>
      <List style={ListStyle} selection verticalAlign="middle" size="big">
        <div>
          <Form
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "90%",
              margin: " "
            }}
            onSubmit={e => {
              e.preventDefault();
              nameSearch(e, searchTerm, props.commands);
            }}
          >
            <Dropdown
              search
              selection
              searchInput={{ type: "text" }}
              options={options}
              placeholder="Category"
              onChange={dropChange}
              style={{ width: "40%" }}
            />
            <Input
              type="text"
              style={{ width: "40%" }}
              size="mini"
              icon={
                <button
                  style={{ background: "transparent", border: "none" }}
                  type="submit"
                >
                  <Icon name="search" inverted circular link />
                </button>
              }
              name="search"
              placeholder="Search..."
              onChange={searchChange}
            />
          </Form>
        </div>
        <Divider horizontal>
          <Header as="h4">Commands</Header>
        </Divider>
        {updatedCommandList &&
          updatedCommandList.map(command => (
            <Popup
              style={{ fontSize: ".8rem" }}
              content="Expand"
              trigger={
                <List.Item key={command.name} style={itemStyle}>
                  <Icon
                    onMouseDown={() => hideCommandDiv()}
                    style={{ marginRight: "10px" }}
                    name="code"
                    size="large"
                    color="teal"
                  />
                  <List.Content>
                    <List.Header
                      onMouseDown={() => hideCommandDiv()}
                      style={{ color: "darkslategrey", fontSize: "1.3rem" }}
                    >
                      {" "}
                      {command.name}{" "}
                    </List.Header>
                  </List.Content>
                  <List.Content>
                    <div style={{ display: "flex", marginLeft: "44px" }}>
                      <List.Header as="h4" style={{ color: "tomato" }}>
                        {" "}
                      </List.Header>
                      <List.Description
                        style={{
                          width: "100%",
                          fontSize: ".9rem",
                          overflowWrap: "break-word"
                        }}
                      >
                        {command.description}
                      </List.Description>
                    </div>
                  </List.Content>
                  <div
                    className={
                      isHidden ? "hidden-command-div" : "show-command-div"
                    }
                    key={command.command}
                  >
                    {command.command}
                    <Popup
                      content="Copy"
                      position="left center"
                      trigger={
                        <Icon
                          onClick={() => {
                            copyCommandToCliboard(command.command);
                          }}
                          style={{ marginRight: "10px" }}
                          name="copy"
                          color="olive"
                        />
                      }
                      basic
                    />
                  </div>
                </List.Item>
              }
              basic
              inverted
            />
          ))}
      </List>
    </>
  );
}

function mapStateToProps(state) {
  return {
    commands: state.commands
  };
}
const mapDispatchToProps = {};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Commands)
);
