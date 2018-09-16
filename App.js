import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Alert, Linking } from 'react-native';

export default class App extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = { count: 0 };
    this.date = { date: (new Date()).toString() }
    this.url_array = ['https://www.youtube.com/watch?v=fKopy74weus', 'https://reactnativecode.com'];
  }

  random_range(lower_limit, upper_limit)
  {
    var number = Math.floor(Math.random() * upper_limit) + lower_limit;
    return number;
  }

  incrementCount()
  {
    this.setState(prevState => ({ count: prevState.count + 1 }))
  }

  getDate()
  {
    return (new Date()).toString();
  }

  render()
  {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() =>
        {
          this.incrementCount();
          getURL(this.url_array[this.random_range(0, 2)]);
        }}>

          <Image
            source={require('./img/icon.jpg')}
          />
        </TouchableHighlight>
        <Text>{this.getDate()}</Text>
      </View>
    );
  }
}

function getURL(url){
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
          console.log('Failed to open: ' + url);
      }else {
          return Linking.openURL(url);
      }
    }).catch(err => console.error('Request failed, an error occurred.', err));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
