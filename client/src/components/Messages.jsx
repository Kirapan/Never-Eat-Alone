import React from 'react'
import {Grid} from 'react-bootstrap'

class Messages extends React.Component {
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
          Welcome to your messages!
        </Grid>
      </div>
    )
  }
}

export default Messages
