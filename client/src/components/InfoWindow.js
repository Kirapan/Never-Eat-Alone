import React, { Component, Button } from 'react';
import {
  GoogleMapLoader,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

class InfoWindows extends Component {


  render() {
    console.log("in infoWindows render");
    const location = {
      lat: 43.65,
      lng: -79.38
    }

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

    return (
      <InfoWindow>
        <div>
        <img src="https://www.google.de/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F6%2F64%2FBruce_Willis_by_Gage_Skidmore_2.jpg%2F220px-Bruce_Willis_by_Gage_Skidmore_2.jpg&imgrefurl=https%3A%2F%2Fde.wikipedia.org%2Fwiki%2FBruce_Willis&docid=nzIKiPy6kIH4gM&tbnid=UT2CyidrStm_RM%3A&vet=10ahUKEwjRhKaigfraAhVEneAKHfvUCHcQMwgsKAUwBQ..i&w=220&h=272&bih=810&biw=1535&q=bruce%20willis&ved=0ahUKEwjRhKaigfraAhVEneAKHfvUCHcQMwgsKAUwBQ&iact=mrc&uact=8g"/>
        <p>Michael Rychly</p>
        <p>IT</p>
        <p>Looking for: Career advice</p>
        <p>Offering: React programming skills</p>
        </div>
      </InfoWindow>
    );
  }
}

export default InfoWindows;