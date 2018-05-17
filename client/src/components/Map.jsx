import React from 'react';
import {
  withGoogleMap,
  GoogleMap
} from "react-google-maps";
import SearchBox from 'react-google-maps/lib/components/places/SearchBox';
import Markers from './Marker';

let _searchBox;

class MyMapComponent extends React.Component {
  constructor(props) {
    super(props)
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
      zoom: ''
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  componentWillMount(){
  }

  componentDidMount(){
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

  handleBoundsChanged() {
     this.setState({
       //bounds: this._map.getBounds(),
       center: this.state.center
     });
   }

  handleSearchBoxMounted(searchBox) {
    _searchBox = searchBox;
  }

  handlePlacesChanged(){
    const places = _searchBox.getPlaces();

    // Add a marker for each place returned from search bar
    const markers = places.map(place => ({
      position: {
        lat: place.geometry.viewport.b.b,
        lng: place.geometry.viewport.f.f
      }
    }));

    // Set markers; set map center to first search result
    const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;
    const state = this.state;

    this.setState(...state, {currentLocation: {
                              lat: mapCenter.lat,
                              lng: mapCenter.lng}
                            });
  }

  _restaurantChosen(restaurant){
    this.props.restaurantChosen(restaurant);
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

  //depending on whether style is for restaurants or users different size
  const style = this.props.restaurant ? (
    <div style={{ height: '500px', width: '400px', margin: '20px' }} />) :
  (<div style={{ height: '83vh', width: '47vw', position: 'fixed', marginBottom: '15px' }} />)

  //depending on whether markers are for restaurants or users different data structure
  const markers = this.props.restaurant ? (this.props.venues.info.map((marker, index)=> {
     return (//restaurant markers
       <Markers
         key={index}
         data={marker}
         location={marker.location}
         title="Click to zoom"
         icon={'https://maps.google.com/mapfiles/kml/shapes/dining_maps.png'}
         restaurantChosen={this._restaurantChosen.bind(this)}
         markerNumber={index}
       />)
     })) : (//user markers
    this.props.marker.map((marker, index)=> {
     return (
       <Markers
         key={index}
         data={marker}
         title="Click to zoom"
         icon={'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ff0000'}
       />)
     }))

  //personal marker when user clicks on one user from the entire list
  const personMarker =
   <Markers
       key={this.props.personClicked.id}
       data={this.props.personClicked}
       title="Click to zoom"
       icon={'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|00688b'}
     />

  const GoogleMapExample = withGoogleMap(props => (
    <GoogleMap
      defaultCenter = {{lat: parseFloat(this.state.currentLocation.lat),
                        lng: parseFloat(this.state.currentLocation.lng)}}
      defaultZoom = {this.props.zoom}
      onBoundsChanged={this.state.bounds}
      onCenterChanged={this.currentLocation}
      restaurantChosen={this._restaurantChosen.bind(this)}
    >
    <div>
    {markers}
    {personMarker}
    </div>
    </GoogleMap>
  ));
  return(
    <div>
      <GoogleMapExample
        containerElement={style}
        mapElement={ <div style={{ height: `100%` }} /> }
      />
    </div>
    );
  }
}

export default MyMapComponent