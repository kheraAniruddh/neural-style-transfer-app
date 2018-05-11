import React,{Component} from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import 'font-awesome/css/font-awesome.min.css'; 
import {Nav, Navbar, NavItem} from 'react-bootstrap';

class Navigator extends Component{

constructor() {
  super();
  this.state= {
    activekey:-1
  }
}


handleSelect(eventKey) {
    this.setState({
        activekey: eventKey
      });
    }

render() {
  return(
<Navbar style={{backgrounColor:"black"}} collapseOnSelect>
  <Navbar.Toggle />
  <Navbar.Collapse>
    <Nav activekey={this.state.activekey}  onSelect={this.handleSelect.bind(this)}>
      <LinkContainer to='/'>
      <NavItem eventKey={1}> Upload Image / Video</NavItem>
      </LinkContainer>
    </Nav>
  </Navbar.Collapse>
  </Navbar>


);
}
}

export default Navigator;