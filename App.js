import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Alert, Linking } from 'react-native';

export default class App extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = { count: 0};
    this.index = 0;
    this.date = { date: (new Date()).toString() }
    this.url_array = ['https://www.youtube.com/watch?v=fKopy74weus', 'https://reactnativecode.com', 'https://www.youtube.com/watch?v=1KAE_JJx0-I', 'http://puppy-picturee.blogspot.com/2012/10/siberian-husky-puppy-pictures.html', 'https://3.bp.blogspot.com/-8sZkKWu98rE/UiD3w_ilIuI/AAAAAAAAAUc/ywb03PKeRtA/s1600/cat-funny.jpg'];
  }

  random_range(lower_limit, upper_limit)
  {
    var number = Math.floor(Math.random() * upper_limit) + lower_limit;
    return number;
  }

  updateIndex(lower, upper){
    var new_random = this.random_range(lower, upper);
    while(new_random == this.index){
      new_random = this.random_range(lower, upper);
    }
    this.index = new_random;
    return this.index
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
          getURL(this.url_array[this.updateIndex(0, 5)]);
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
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
