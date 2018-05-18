import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Users from './Users';
import Map from './Map';

class UsersWithMaps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollData: [],
      personClicked: ''
    }
  }

  _onClick(personClicked){
    const state = this.state;
    this.setState(...state, {personClicked: personClicked})
  }

  _currentSelection(selected){
    const state = this.state;
    this.setState(...state, {scrollData: selected})
  }

  render() {
//    if (!this.props.email) {
//      return (<Row className='usersWithMapsRow'>
//        <h2>Please<Link to='/api/signup'> Signup</Link> or<Link to='/api/login'> Login</Link> first!</h2>
//      </Row>)
//    } else {
    return (<Grid className='usersWithMapsGrid'>
      <Row className='usersWithMapsRow'>
        <Col xs={12} md={6} className='usersWithMapsCol'>
          <Users className='usersWithMapsElement' id={this.props.id} email={this.props.email}
            person={this._onClick.bind(this)} currentSelection={this._currentSelection.bind(this)}/>
        </Col>
        <Col xs={12} md={6} className='usersWithMapsCol-onpage'>
          <Map className='usersWithMapsElement' marker={this.state.scrollData} personClicked={this.state.personClicked} zoom={12}/>
        </Col>
      </Row>
      </Grid>
    )
  //}
  }
}

export default UsersWithMaps;