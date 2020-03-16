import React,{useState,useEffect} from 'react';
import Styled from 'styled-components'
import {Icon,Menu,Grid,Segment,Sidebar,Header,Image} from 'semantic-ui-react'
import {deleteProj} from '../Actions/index'
import {withRouter} from 'react-router-dom'
import {connect } from "react-redux"

const Settings = Styled.div`

`

 function ProjSettings(props) {

  const [projectName,setProjectName] = useState("")
    useEffect(() => {
    }, [props.currentProject])   


  return (
    

<div className={props.visible ? "project-settings" : "settings-close"} >

  <Sidebar.Pushable as={Segment} style={{background:"transparent",border:"none",borderRadius:"0"}} >
    <Sidebar
      as={Menu}
      style={{ padding:"-10px",
        marginLeft:"-10px"}}
      animation='overlay'
      direction='left'
      icon='labeled'
      inverted
      
      vertical
      visible={props.visible}
      width='thin'
    >
      <Menu.Item as='a'>
        <Icon name='info circle' />
        About
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='save' />
        Export Database
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='share' />
        Shareable Link
      </Menu.Item>
      <Menu.Item  as='a'>Future Features</Menu.Item>
    </Sidebar>

    <Sidebar
    style={{fontSize:"1.1rem"}}
      as={Menu}
      animation='overlay'
      direction='right'
      inverted
      vertical
      visible={props.visible}
    >     
     <Menu.Item onClick={() => props.close()} as='a'>Close</Menu.Item>
     

      
      <Menu.Item as='a'>Edit Permissions</Menu.Item>


      {props.currentProject  &&
      <Menu.Item 
      style={{color:"#cc3333",fontWeight:"bold",fontSize:"1.2rem"}}
       onClick={() => { props.deleteProj(props.currentProject.id);props.history.push('/projects')}}
       as='a'>Delete {props.currentProject.name}
       </Menu.Item>
       }
      
    </Sidebar>

    
  </Sidebar.Pushable>
</div>
   
  );
}
function mapStateToProps(state){
  return {
   currentProject:state.currentProject,
  }
}
const mapDispatchToProps = {
deleteProj:deleteProj
}
export default withRouter(
  connect(
 mapStateToProps,
 mapDispatchToProps
)(ProjSettings)
)