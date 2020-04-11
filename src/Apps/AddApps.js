import React, { useEffect, useState } from "react";
import {
  Label,
  Form,
  Input,
  Icon,
  Popup,
  Dropdown,
  List,
  Divider
} from "semantic-ui-react";
import Styled from "styled-components";
import AddAppsForm from "./AddAppsForm";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getInstalledApps, addApp } from "../Actions/index";
import MessageToast from "../UIElements/MessageToast";

function AddApps(props) {
  const [searchTerm, setSearchTerm] = useState("");

  function appSearch(e, term) {
    props.getInstalledApps(term);
    setSearchTerm(term);
  }
  const [sortedApps, setSortedApps] = useState();
  const [showMessage, setShowMessage] = useState(false);
  function sortApps() {
    if (props.installedApps.length > 0) {
      let sorted = props.installedApps.sort(function(a, b) {
        var nameA = a.name.toLowerCase();
        var nameB = b.name.toLowerCase();
        if (nameA.charAt(0) === searchTerm.charAt(0)) {
          return -1;
        }
        if (nameB.charAt(0) === searchTerm.charAt(0)) {
          return 1;
        }

        return 0;
      });

      setSortedApps(sorted);
    }
  }

  useEffect(() => {
    if (props.installedApps) {
      sortApps();
    }
  }, [props.installedApps]);

  const addAppToProj = app => {
    const appToAdd = {
      launch: false,
      name: app.name,
      app_path: app.path,
      project_id: props.pID
    };
    props.addApp(appToAdd);
  };
  return (
    <>
      <MessageToast
        close={setShowMessage}
        messageHeader="Done"
        show={showMessage}
        messageContent="added app to project linked apps"
      />

      <AddAppsForm appSearch={appSearch} />

      <List
        selection
        style={{
          overflowY: "scroll",
          minHeight: "240px",
          maxHeight: "240px",
          width: "100%"
        }}
      >
        {props.installedApps &&
          sortedApps &&
          sortedApps.map((app, index) => (
            <>
              <Popup
                style={{ fontSize: ".8rem" }}
                content={app.path}
                trigger={
                  <List.Item
                    onClick={() => {
                      addAppToProj(app);
                      setShowMessage(true);
                    }}
                    key={app.id}
                    style={{ fontSize: "1.2rem" }}
                  >
                    <List.Content
                      style={{
                        color: "#333333",
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      {app.name}
                    </List.Content>
                  </List.Item>
                }
                basic
                inverted
              />
              <Divider></Divider>
            </>
          ))}
      </List>
    </>
  );
}
function mapStateToProps(state) {
  return {
    installedApps: state.installedApps
  };
}
const mapDispatchToProps = {
  getInstalledApps: getInstalledApps,
  addApp: addApp
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddApps)
);
