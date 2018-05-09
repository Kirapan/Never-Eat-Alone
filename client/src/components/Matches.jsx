import React from 'react'
import {Grid} from 'react-bootstrap'
import Resource from '../models/resource'

const userData = Resource('users')

class Matches extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: (this.props.match.params.id || null),
      matches:[]
    }
  }

  componentWillMount() {
    userData.findMatches(this.state.userId)
    .then((result) => {
      this.setState({ matches: result })
    })
    .catch((errors) => this.setState({ errors: errors }))
  }

  _handleFavorites

  render() {
    return (
      <div>
        <Grid>
          Welcome to your matches!
        </Grid>
      </div>
    )
  }
}

export default Matches
