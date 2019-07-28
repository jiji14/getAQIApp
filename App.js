import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Foundation } from "@expo/vector-icons";
import AirResult from './AirResult.js'

export default class App extends Component{
  state = {
    isLoaded: false,
    error: null,
    airInfo: {
      cityName: null,
      country: null,
      airIndex: null,
      quality: null
    }
  };

  // 위치 찾기를 이용하여 latitude, longtitude 구하기
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this._getAirInfo(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: error
        });
      }
    );
  }


  // lat, long 값으로 미세먼지 AQI 구하기
  _getAirInfo = (lat, long) => {
    fetch(`http://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${long}&key=43093270-a0cf-4389-ae4a-8c7badcb8a9c`)
    .then(response => response.json())
    .then(json => {
      //console.log(json);
      this._setAirQuality(json.data.city, json.data.country, json.data.current.pollution.aqius);
    })
    .catch(err => {
      console.error(err);
      this.setState({
        error: error
      });
    });
  }

  _setAirQuality = (cityName, country, airIndex) => {

    let quality = '';
    if(airIndex <= 50){
      quality = 'Good';   
    }else if(airIndex <= 100){
      quality = 'Moderate';
    }else if(airIndex <= 150){
      quality = 'NotGood';
    }else if(airIndex <= 200){
      quality = 'Unhealthy';
    }else if(airIndex <= 250){
      quality = 'VeryUnhealthy';
    }else{
      quality = 'Hazardous';
    } 

    this.setState({
      isLoaded : true,
      airInfo : {
        cityName : cityName,
        country: country,
        airIndex : airIndex,
        quality : quality
      }
    });
  }

    render() {
      const {isLoaded, airInfo} = this.state;

      return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        {isLoaded ? (
          <AirResult airInfo={airInfo} style={styles.airResult} /> 
        ) : (
        <LinearGradient colors= {['#019188', '#02cfc2', '#f3f5d7']} style={styles.loading}>
          <Foundation color="white" size={100} name="trees" style={styles.airIcon} />
          <Text style={styles.loadingText}>Searching air quality your area</Text>
        </LinearGradient>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  airResult: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  loadingText: {
    paddingLeft: 25,
    fontSize: 40,
    color: '#fff'
  },
  airIcon: {
    marginBottom: 20
  }
});
