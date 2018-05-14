import React from 'react';
import Resource from '../models/resource';
import {Grid } from 'react-bootstrap';
import Map from './Map';

const userData = Resource('users');

//Client ID
//L1BAD2VJONF3BY1VCXSYNPTSBDINHO3FLDX5I2VYGUPD5ZX1
//Client Secret
//FUMHJKGEJTBYUI1343NXI5GNOFZZBCCDLBTKGBO54JXJGBX1

var foursquare = require('react-foursquare')({
  clientID: 'L1BAD2VJONF3BY1VCXSYNPTSBDINHO3FLDX5I2VYGUPD5ZX1',
  clientSecret: 'FUMHJKGEJTBYUI1343NXI5GNOFZZBCCDLBTKGBO54JXJGBX1'
});

var params = {
  ll: '43.64,-79.39',
  query: 'Restaurant',
  section: 'topPicks',
  limit: 10,
  openNow: 1,
  sortByDistance: 1,
  intent: 'checkin',
  radius: 500
};

class Restaurant extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allVenues: [],
      venues: {
        info: [],
        marker: []
      },
      personClicked: ''
    }
  }

  componentDidMount() {
    let markers = [];
    let venueDetails = [];
    foursquare.venues.getVenues(params)
      .then(res=> {
        console.log("foursquare", res)
        //assign all venues to an array
        res.response.venues.map((venue) => {
          markers.push(venue.location)
          let venueParam = {venue_id: venue.id}
          //request details for each venue
          foursquare.venues.getVenue(venueParam)
            .then(res=> {
              venueDetails.push(res.response.venue);
          })
        })
    })
    const state = this.state;
    this.setState(...state, {venues: {info: venueDetails,
                                      marker: markers}});
  }

  componentWillMount() {
    console.log("in Restaurant will mount");
  }

render() {
    return (
      <div>
        <Grid>
          <div>
            <Map venues={this.state.venues} personClicked={this.state.personClicked}
                 restaurant={true} zoom={15}/>
          </div>
        </Grid>
      </div>
    )
  }
}

export default Restaurant