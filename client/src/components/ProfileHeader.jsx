import React from 'react'
import {Link} from 'react-router-dom'
import {Grid, Row, Col} from 'react-bootstrap'


const ProfileHeader = (props) => (
  <Grid>
  <Row className="profile-header">
    <Col xs={6} md={6}>
      <Link to={`/api/users/${id}`}>Your Profile</Link>
    </Col>
    <Col xs={6} md={6}>
      <Link to={`/api/users/${id}/preferences`}>Preferences</Link>
    </Col>
  </Row>
  </Grid>
)

export default ProfileHeader
