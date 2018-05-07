import React from 'react'
import {Grid} from 'react-bootstrap'

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
          <div className="container-fluid">Welcome to the Index page!</div>
        </Grid>
      </div>
    )
  }
}

export default Index
