import React from 'react'
import {Grid} from 'react-bootstrap'

class Users extends React.Component {
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
          Welcome to the Users page!
        </Grid>
      </div>
    )
  }
}

export default Users
