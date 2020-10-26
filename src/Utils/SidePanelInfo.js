import React, { useState, useEffect } from "react";
import { openUrl } from "../Actions/index";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import {
  Header,
  Image,
  Icon,
  Button,
  Menu,
  Ref,
  Segment,
  Sidebar
} from "semantic-ui-react";
import SideEdit from "./SideEdit";
import SideInfo from "./SideInfo";

function SidePanelInfo(props) {
  const openLink = url => {
    props.openUrl(url);
  };
  const [activeItem, setActiveItem] = useState("Info");
  const [view, setView] = useState("Info");
  const handleActive = (e, { tag }) => {
    setActiveItem(tag);
  };
  useEffect(() => {
    switch (activeItem) {
      case "Edit":
        setView(<SideEdit data={props.data} type={props.type} />);
        break;
      case "Info":
        setView(<SideInfo data={props.data} type={props.type} />);
        break;
      case "Launch":
        if (props.type === "file") {
          openLink(props.data.file_path);
        }
        if (props.type === "bookmark") {
          openLink(props.data.url);
        }
        setActiveItem("Info");
        break;
      default:
    }
  }, [activeItem, props.data]);

  return (
    <Sidebar.Pushable style={{ height: "72vh", overflowY: "scroll" }}>
      <Sidebar
        as={Segment}
        animation="scale down"
        icon="labeled"
        direction="right"
        style={{ padding: 0 }}
        onHide={() => props.setVisible(false)}
        vertical
        visible={props.visible}
        width="wide"
      >
        <Segment.Group style={{ padding: "0 auto", background: "white" }}>
          <Segment>
            <Header textAlign="center">{props.data.name}</Header>
          </Segment>
          <Segment.Group style={{ margin: 0, padding: "5px 15px 0" }}>
            <Menu pointing>
              <Menu.Item
                style={{
                  width:
                    props.type != "command" ? "calc(100% / 3)" : "calc(100%/2)"
                }}
                as="a"
                name="Info"
                active={activeItem === "Info"}
                onClick={handleActive}
                tag="Info"
              >
                Info
              </Menu.Item>
              <Menu.Item
                style={{
                  width:
                    props.type != "command" ? "calc(100% / 3)" : "calc(100%/2)"
                }}
                as="a"
                name="Edit"
                active={activeItem === "Edit"}
                onClick={handleActive}
                tag="Edit"
              >
                Edit
              </Menu.Item>
              {props.type != "command" && (
                <Menu.Item
                  style={{ width: "calc(100% / 3)" }}
                  as="a"
                  name="Launch"
                  active={activeItem === "Launch"}
                  onClick={handleActive}
                  tag="Launch"
                >
                  Launch
                </Menu.Item>
              )}
            </Menu>
            <Segment style={{ borderTop: "none", padding: "10px 0" }}>
              {view}
            </Segment>
          </Segment.Group>
        </Segment.Group>
      </Sidebar>

      <Sidebar.Pusher>{props.children}</Sidebar.Pusher>
    </Sidebar.Pushable>
  );
}
const mapDispatchToProps = {
  openUrl: openUrl
};

export default connect(null, mapDispatchToProps)(SidePanelInfo);
