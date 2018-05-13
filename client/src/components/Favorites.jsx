import React from 'react'
import {Grid, Row} from 'react-bootstrap'
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

    // const displayImage = this.state.favorites.map((scroll, idx) => {
    //   return (<Col xs={3} md={3}>
    //     <Thumbnail src={scroll.image} alt="242x200" >
    //       <h5><strong>{scroll.name}</strong></h5>
    //       <h6>Industry: {scroll.industry}</h6>
    //       <h6>Offers: {scroll.offers[0]}, {scroll.offers[1]},{scroll.offers[2]} </h6>
    //       <Button bsStyle="primary">Like</Button>
    //       <Button bsStyle="default">Invite</Button>
    //     </Thumbnail>
    //   </Col>)
    // })
    return (
      <div>
        <Row>
          {displayImage}
        </Row>
      </div>
    )
  }
}

export default Messages
