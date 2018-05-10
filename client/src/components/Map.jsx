import React from 'react'
import ReactDOM from 'react-dom';
import {
  GoogleMapLoader,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import Markers from './Marker'

class MyMapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: {
        lat: '',
        lng: ''
      }
    }
    const markers = [
    {position:
      { lat: 43.65, lng: -79.38 },
     position:
      { lat: 43.64, lng: -79.40 }
    }
  ]
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  componentDidMount(){
    console.log("componentDidMount", this.props.center);
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
    this.loadMap();
  }

  loadMap() {
    console.log("in load")
  }

  recenterMap() {
    const map = this.map;
    const curr = this.state.currentLocation;
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

render(){
  const marker = [
      {
        location: {
          lat: 43.65,
          lng: -79.38
        }
      },
      {
        location: {
          lat: 43.66,
          lng: -79.39
        }
      }
    ]

  const GoogleMapExample = withGoogleMap(props => (
    <GoogleMap
      defaultCenter = { this.state.currentLocation }
      defaultZoom = { 13 }
    >
    {marker.map((marker, index)=> {
      return (
        <Markers
          key={index}
          data={marker}
          title="Click to zoom"
        />
      )
    })}
    </GoogleMap>
  ));
  return(
    <div>
      <GoogleMapExample
        containerElement={ <div style={{ height: `500px`, width: '500px' }} /> }
        mapElement={ <div style={{ height: `100%` }} /> }
      />
    </div>
    );
  }
}

export default MyMapComponent