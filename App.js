import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Foundation } from "@expo/vector-icons";
import AirResult from './AirResult.js'

export default class App extends Component{
  state = {
    isLoaded: false,
    error: null,
    cityName: null,
    aqi: null,
    quality: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this._getCity(position.coords.latitude, position.coords.longitude)
      },
      error => {
        this.setState({
          error: error
        });
      }
    );
  }

  _getCity = (lat, long) => {
    fetch('https://api.waqi.info/feed/seoul/?token=a52f054e9b618ef2f10a33155f2f3e4cd50ef1d7')
    .then(response => response.json())
    .then(json => {
      console.log(json)
      console.log(json.data.aqi)
      console.log(json.data.city.name)

      const _aqi = json.data.aqi

      if(_aqi <= 50){
        _quality = 'Good';   
      }else if(50 < _aqi && _aqi <= 100){
        _quality = 'Moderate';
      }else if(100< _aqi && _aqi <= 150){
        _quality = 'NotGood';
      }else if(150< _aqi && _aqi <= 200){
        _quality = 'Unhealthy';
      }else if(200< _aqi && _aqi <= 250){
        _quality = 'VeryUnhealthy';
      }else{
        _quality = 'Hazardous';
      } 
      this.setState({
        isLoaded : true,
        cityName : json.data.city.name,
        aqi : json.data.aqi,
        quality : _quality
      });
    });


    // // 주소는 받았지만 값이 null일 경우
    // if(typeof(aqi)!="number"){
    //   this.setState({
    //     isLoaded : true,
    //     cityName : 'error',
    //     aqi : 0,
    //     quality : 'error' 
    //   })
    // }

    // not working
    // console.log(lat)
    // console.log(long)
    // fetch(`https://geocode.xyz/?37.4219985,-122.0839828&auth=217981090409132197278x3063?json=1`)
    // .then(response => response.json())
    // .then(json => {
      
    //   console.log(json)
    // });

    // unirest.get("https://air-quality.p.rapidapi.com/current/airquality?lon=-78.63&lat=35.5")
    // .header("X-RapidAPI-Host", "air-quality.p.rapidapi.com")
    // .header("X-RapidAPI-Key", "c3bfdac90amsh4ad8967dec8473bp168e39jsn2d404b5f965b")
    // .end(function (result) {
    // console.log(result.status, result.headers, result.body);
    // });
  }

    render() {
      const {isLoaded, cityName, aqi, quality} = this.state;

      return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        {isLoaded ? (
          <AirResult name={cityName} getAqi = {aqi} airQuality={quality} style={styles.airResult} /> 
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
