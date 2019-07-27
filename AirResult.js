import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from "@expo/vector-icons";
import PropTypes from "prop-types";

const airCases = {
    Good : {
        colors: ['#68f205', '#c7e3b3'],
        image: 'smileo',
        title: 'Good',
        desc: 'Fresh air, perfect conditions'
    },
    Moderate : {
        colors: ['#f6fa00', '#dfe09d'],
        image: 'aliwangwang-o1',
        title: 'Moderate',
        desc: 'Acceptable conditions of indoor air quality in rooms'
    },
    NotGood : {
        colors: ['#e38e05', '#c9c0b1'],
        image: 'frowno',
        title: 'Not Good',
        desc: 'The upper limit of fresh air'
    },
    Unhealthy : {
        colors: ['#c94126', '#c2ada9'],
        image: 'meho',
        title: 'Unhealthy',
        desc: 'Air Perceived as stuffy and not fresh'
    },
    VeryUnhealthy : {
        colors: ['#8410b5', '#a99ead'],
        image: 'dislike2',
        title: 'Very Unhealthy',
        desc: 'It can cause cough or faint'
    },
    Hazardous : {
        colors: ['#303030', '#cccacc'],
        image: 'warning',
        title: 'Hazardous',
        desc: 'Extemly bad. Do not go outside'
    },
    error : {
        colors: ['#303030', '#cccacc'],
        image: 'warning',
        title: 'Error',
        desc: 'Sorry, failed to get data. Try later'
    }
}

function AirResult( {name, getAqi, airQuality} ) {

    return (
    <View style={styles.container}>
    <StatusBar hidden={true} />
    <LinearGradient colors={airCases[airQuality].colors} style={styles.back}>
        <View>
            <AntDesign color="white" size={120} name={airCases[airQuality].image} style={styles.airIcon} />
        </View>
        <View style={styles.textArea}>
            <Text style={styles.city} >{name} </Text>
            <Text style={styles.aqi} >  [ AQI : {getAqi} ] </Text>
            <Text style={styles.title}>{airCases[airQuality].title}</Text>
            <Text style={styles.desc}>{airCases[airQuality].desc}</Text>
        </View>
    </LinearGradient>
    </View>
    );
}

AirResult.propTypes = {
    name: PropTypes.string.isRequired,
    getAqi: PropTypes.number.isRequired,
    airQuality: PropTypes.string.isRequired
}

export default AirResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  back: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch' 
  },
  airIcon: {
    marginBottom: 50
  },
  city : {
      textAlign: 'center',
      fontSize: 40,
      paddingBottom:10,
      color: 'white'
  },
  aqi : {
    textAlign: 'center',
    fontSize: 35,
    paddingBottom:10,
    color: 'white'
  },
  title : {
    textAlign: 'center',
      fontSize: 35,
      paddingBottom: 10,
      color: 'white'
  },
  desc : {
    textAlign: 'center',
      fontSize : 25,
      paddingBottom : 10,
      color: 'white'
  }
})