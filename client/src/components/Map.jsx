import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Resource from '../models/resource'
import {
  GoogleMapLoader,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import SearchBox from 'react-google-maps/lib/components/places/SearchBox'
import Markers from './Marker';

const userData = Resource('users');
const _ = require("lodash");


class MyMapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      lists: [],
      industries: [],
      offers_needs: [],
      currentLocation: {
        lat: '',
        lng: ''
      },
      bounds: null,

    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      console.log("did update ...")
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      console.log("did update recenter???");
      this.recenterMap();
    }
  }

  componentWillMount(){
    userData.findAll()
      .then((result) => {
        console.log("findAll", result)
        this.setState({
          lists: result,
          errors: null
        })
        //move all marker relevant info into array and to state
        let allMarkers = []
        result.map((resultMarker) => {
          allMarkers.push({
            info: {
              id:      resultMarker.id,
              name:    resultMarker.name,
              image:   resultMarker.image,
              company: resultMarker.company
            },
            location:  {
              lat: resultMarker.lat,
              lng: resultMarker.lng
            }
          })
          const state = this.state;
          this.setState(...state, {markers: allMarkers});
        })
        .catch((errors) => this.setState({ errors: errors }))
      })
      .catch((errors) => this.setState({ errors: errors }))
  }

  componentDidMount(){
    console.log("componentDidMount");
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

  loadMap() {
    console.log("in load");
  }

  recenterMap() {
    console.log("in recenter");
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

  handleSearchBoxMounted(searchBox) {
    this._searchBox = searchBox;
    console.log('handleSearchBoxMounted')
  }

  handlePlacesChanged() {
    const places = this._searchBox.getPlaces();

    // Add a marker for each place returned from search bar
    const markers = places.map(place => ({
      position: place.geometry.location,
    }));

    // Set markers; set map center to first search result
    const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;
    console.log('handlePlacesChanged')
    this.setState({
      center: mapCenter
      //,      markers,
    });
  }

render(){
  const marker = [
      {
        info: {
          id: 1,
          name: 'Michael',
          image: 'https://s3.amazonaws.com/uifaces/faces/twitter/peterlandt/128.jpg',
          company: 'Programmer',
          search: 'IT',
          offer: 'Finance'
        },
        location: {
          lat: 43.65,
          lng: -79.38
        }
      },
      {
        info: {
          id: 2,
          name: 'Xiaoqi',
          image: 'https://s3.amazonaws.com/uifaces/faces/twitter/peterlandt/128.jpg',
          company: 'CEO Never Lunch Alone',
          search: 'Finance',
          offer: 'IT'
        },
        location: {
          lat: 43.66,
          lng: -79.39
        }
      }
    ]

  const GoogleMapExample = withGoogleMap(props => (
    <GoogleMap
      defaultCenter = {{lat: parseFloat(this.state.currentLocation.lat),
                        lng: parseFloat(this.state.currentLocation.lng)}}
      defaultZoom = { 13 }
    >
    <SearchBox
      onSearchBoxMounted={this.handleSearchBoxMounted}
      bounds={this.state.bounds}
      onPlacesChanged={this.handlePlacesChanged}
      controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
    >
      <input
        type="text"
        placeholder="Customized your placeholder"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          marginTop: `27px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`
        }}
      />
    </SearchBox>
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