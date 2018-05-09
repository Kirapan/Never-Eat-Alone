import React from 'react'
import {
  GoogleMapLoader,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

class MyMapComponent extends React.Component {

render(){
  const GoogleMapExample = withGoogleMap(props => (
    <GoogleMap
      defaultCenter = { { lat: 43.65, lng: -79.38 } }
      defaultZoom = { 13 }
    >
      <Marker
      position={{ lat: 43.65, lng: -79.38 }}
      />
      <Marker
        position={{ lat: 43.64  , lng: -79.40 }}
      />
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