import React from 'react'
import {Grid} from 'react-bootstrap'

class Login extends React.Component {
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
          Please Login!
        </Grid>
      </div>
    )
  }
}

export default Login
