import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-maps-react';
import MapContainer from './MapContainer';
import GoogleApiComponent from '../GoogleApiComponent';
//import Marker from 'google-map-react';
//import GoogleMapLoader from 'react-google-maps';
//import GoogleMap from 'react-google-maps';
//import Marker from 'react-google-maps';

export class Maps extends Component {
  constructor(props) {
    super(props);
    //const {lat, lng} = this.state.currentLocation;
    const {lat, lng} = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      }
    }

  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate");
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  componentDidMount() {
    console.log("componentDidMount");
    if (this.props.centerAroundCurrentLocation) {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const coords = pos.coords;
                this.setState({
                    currentLocation: {
                        lat: coords.latitude,
                        lng: coords.longitude
                    }
                })
            })
        }
    }
    this.loadMap();
  }

  loadMap() {
    console.log("loadMap");

    if (this.props && this.props.google) {
      // google is available
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      //let zoom = 14;
      //let lat = 43.65;
      //let lng = -79.38  ;
      let {initialCenter, zoom} = this.props;
      const {lat, lng} = this.state.currentLocation;;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        //apiKey: 'AIzaSyA8Mufeh6GACIkLqJlIXnjC0o3NEi0FaBY',
        center: center,
        zoom: zoom
      })
      this.map = new maps.Map(node, mapConfig);

      let centerChangedTimeout;
      this.map.addListener('dragend', (evt) => {
        if (centerChangedTimeout) {
          clearTimeout(centerChangedTimeout);
          centerChangedTimeout = null;
        }
        centerChangedTimeout = setTimeout(() => {
          this.props.onMove(this.map);
        }, 0);
      })
   }
  }

  recenterMap() {
    const map = this.map;
    const curr = this.state.currentLocation;

    const google = this.props.google;
    const maps = google.maps;

    if (map) {
        let center = new maps.LatLng(curr.lat, curr.lng)
        map.panTo(center)
    }
  }

  render() {
//    const markers = this.props.markers.map((venue, i) => {
//      console.log("in marker", venue, " and ", i)
//      const marker =
//        {
//            postition: {
//              lat: venue.location.lat,
//              lng: venue.location.lng
//            }
//        }
//        console.log("before return ", marker)
//        return <Marker key={i} {...marker}/>
//    })

//      const MapContainer = <div style={{height: '500px', widht: '500px'}}></div>
    return (
      // Important! Always set the container height explicitly
      //<Marker key={1} position={{ lat: 43.65, lng : -79.38 }} />
      //<div style={{ height: '500px', width: '500px' }}> {markers}
//      <GoogleMapLoader
//      containerElement = {MapContainer}
//      googleMapElement = {
//        <GoogleMap
//           bootstrapURLKeys={{ key: 'AIzaSyA8Mufeh6GACIkLqJlIXnjC0o3NEi0FaBY' }}
//           defaultCenter={this.props.center}
//           defaultZoom={10}
//         >
//
//        </GoogleMap>
//      } />

      <div ref='map'>
        Loading map...
      </div>
    //</div>
    );
  }
}
Map.propTypes = {
  google: PropTypes.object,
  zoom: PropTypes.number,
  initialCenter: PropTypes.object,
  centerAroundCurrentLocation: PropTypes.bool,
  onMove: PropTypes.func
}

Map.defaultProps = {
  zoom: 13,
  // Toronto, by default
  initialCenter: {
    lat: 43.65,
    lng: -79.38
  },
  centerAroundCurrentLocation: false,
  onMove: function() {} // default prop
}
export default Maps;