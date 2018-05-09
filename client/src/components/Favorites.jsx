import React from 'react'
import {Grid} from 'react-bootstrap'
import Resource from '../models/resource'

const userData = Resource('users')

class Favorites extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: (this.props.match.params.id || null),
      favorites:[]
    }
  }

  componentWillMount() {
    userData.findFavorites(this.state.userId)
    .then((result) => {
      this.setState({ favorites: result })
    })
    .catch((errors) => this.setState({ errors: errors }))
  }

  render() {
    return (
      <div>
        <Grid>
          Welcome to your favorites!
        </Grid>
      </div>
    )
  }
}

export default Messages
