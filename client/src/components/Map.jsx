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
        info: {
          name: 'Michael',
          img: 'https://www.google.de/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F6%2F64%2FBruce_Willis_by_Gage_Skidmore_2.jpg%2F220px-Bruce_Willis_by_Gage_Skidmore_2.jpg&imgrefurl=https%3A%2F%2Fde.wikipedia.org%2Fwiki%2FBruce_Willis&docid=nzIKiPy6kIH4gM&tbnid=UT2CyidrStm_RM%3A&vet=10ahUKEwjRhKaigfraAhVEneAKHfvUCHcQMwgsKAUwBQ..i&w=220&h=272&bih=810&biw=1535&q=bruce%20willis&ved=0ahUKEwjRhKaigfraAhVEneAKHfvUCHcQMwgsKAUwBQ&iact=mrc&uact=8g',
          job: 'Programmer',
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
          name: 'Xiaoqi',
          img: 'https://www.google.de/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F6%2F64%2FBruce_Willis_by_Gage_Skidmore_2.jpg%2F220px-Bruce_Willis_by_Gage_Skidmore_2.jpg&imgrefurl=https%3A%2F%2Fde.wikipedia.org%2Fwiki%2FBruce_Willis&docid=nzIKiPy6kIH4gM&tbnid=UT2CyidrStm_RM%3A&vet=10ahUKEwjRhKaigfraAhVEneAKHfvUCHcQMwgsKAUwBQ..i&w=220&h=272&bih=810&biw=1535&q=bruce%20willis&ved=0ahUKEwjRhKaigfraAhVEneAKHfvUCHcQMwgsKAUwBQ&iact=mrc&uact=8g',
          job: 'CEO Never Lunch Alone',
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