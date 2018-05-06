import React from 'react'
import {Link} from 'react-router-dom'
import Resource from '../models/resource'
import {Grid, Row, Col} from 'react-bootstrap'

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount() {

  }

  _handleSumbit(event) {
    alert('submited')
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Grid>
          <div class="container-fluid">Welcome to the Index page!</div>
        </Grid>
      </div>
    )
  }
}

export default Index
