import React from 'react';
import Map from './Map';


let foursquare = require('react-foursquare')({
  clientID: 'L1BAD2VJONF3BY1VCXSYNPTSBDINHO3FLDX5I2VYGUPD5ZX1',
  clientSecret: 'FUMHJKGEJTBYUI1343NXI5GNOFZZBCCDLBTKGBO54JXJGBX1'
});

class Restaurant extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allVenues: [],
      venues: {
        info: [],
        marker: []
      },
      restaurantClicked: '',
      params: ''
    }
  }

  componentDidMount() {
    let markers = [];
    let venueDetails = [];

    //retrieving the current location based on browser
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        //retrieval of location from the browser
        const coords = pos.coords;
        const lat = coords.latitude.toString().substring(0, 5);
        const lng = coords.longitude.toString().substring(0, 6);
        //hard coding lat and lng for presentation
        const state = this.state;
        this.setState(...state, {
          params: {
            ll: 43.68 + ',' + -79.45,
            query: 'Restaurant',
            section: 'topPicks',
            limit: 10,
            openNow: 1,
            sortByDistance: 1,
            intent: 'checkin',
            radius: 1000
          }
        }, () => {
          foursquare.venues.getVenues(this.state.params)
            .then(res => {
              //assign all venues to an array
              res.response.venues.map((venue) => {
                markers.push(venue.location)
                let venueParam = { venue_id: venue.id }
                //request details for each venue
                foursquare.venues.getVenue(venueParam)
                  .then(res => {
                    venueDetails.push(res.response.venue);
                    const state = this.state;
                    this.setState(...state, {
                      venues: {
                        info: venueDetails,
                        marker: markers
                      }
                    });
                  })
              })
            })
        })
      })
    }

    this.props.restaurantChosen(this.state.restaurantClicked);
  }

  componentWillMount() {
  }

  _restaurantChosen(restaurant) {
    this.props.restaurantChosen(restaurant);
  }

  render() {
    return (<Map venues={this.state.venues} personClicked={this.state.restaurantClicked}
      restaurant={true} zoom={13} restaurantChosen={this._restaurantChosen.bind(this)} />
    )
  }
}

export default Restaurant