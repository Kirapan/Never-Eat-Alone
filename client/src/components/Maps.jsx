import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
//import GoogleMapReact from 'google-maps-react';
//import MapContainer from './MapContainer';
//import GoogleApiComponent from '../GoogleApiComponent';
//import Marker from 'google-map-react';
//import GoogleMapLoader from 'react-google-maps';
//import GoogleMap from 'react-google-maps';
//import Marker from 'react-google-maps';

const evtNames = ['click', 'dragend'];

const camelize = function(str) {
    return str.split(' ').map(function(word){
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join('');
  }

export class Maps extends Component {
  constructor(props) {
    super(props);
    //const {lat, lng} = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      }
    }
    const {lat, lng} = this.state.currentLocation;
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
      console.log("in if loadMap");
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

      evtNames.forEach(e => {
        this.map.addListener(e, this.handleEvent(e));
      });

      maps.event.trigger(this.map, 'ready');

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

  handleEvent(evtName) {
    const handlerName = `on${camelize(evtName)}`;

    if (evtName === "dragend") {
      let timeout;
      return (e) => {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        timeout = setTimeout(() => {
          if (this.props[handlerName]) {
            this.props[handlerName](this.props, this.map, e);
          }
        }, 1000);
      }
    } else {
      return (e) => this.props[handlerName](this.props, this.map, e)
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
    console.log("in render");
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

  renderChildren() {
    const {children} = this.props;

    if (!children) return;

    return React.Children.map(children, c => {
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation
      });
    })
  }
}

Map.propTypes = {
  google: PropTypes.object,
  zoom: PropTypes.number,
  initialCenter: PropTypes.object,
  centerAroundCurrentLocation: PropTypes.bool,
  onMove: PropTypes.func
}

evtNames.forEach(e => Map.propTypes[camelize(e)] = PropTypes.func);

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