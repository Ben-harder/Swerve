import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, TouchableOpacity, Alert, Linking } from 'react-native';
import { Constants, Audio } from 'expo';
import FormData from 'FormData';

const a = require('./img/swerve.png');
const b = require('./img/icon.png');

export default class App extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = { count: 0};
    this.index = 0;
    this.date = { date: (new Date()).toString() }
    this.url_array = ['https://www.youtube.com/watch?v=fKopy74weus', 'https://reactnativecode.com', 'https://www.youtube.com/watch?v=1KAE_JJx0-I', 'http://puppy-picturee.blogspot.com/2012/10/siberian-husky-puppy-pictures.html',
    'https://3.bp.blogspot.com/-8sZkKWu98rE/UiD3w_ilIuI/AAAAAAAAAUc/ywb03PKeRtA/s1600/cat-funny.jpg', 'https://i.imgur.com/k9i7YLN.jpg'];

    this.timer = null;
    this.addOne = this.addOne.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.number = 0;

    this.view = true;
    this.view_url = require('./img/icon.png');

  }

  addOne() {
    this.number = this.number + 1;
    this.timer = setTimeout(this.addOne, 200);
  }

  stopTimer() {
    var number = this.number;
    this.number = 0;
    this.timer = clearTimeout(this.timer);
    if(number >= 3){
      console.log(number);
      this.view = !(this.view);
      this.stayCount();
    }
    else{
      this.view = false;
      this.post_request(this.getDate())
      this.incrementCount();
      getURL(this.url_array[this.updateIndex(0, 6)]);
    }
    this.view_url = this.view === true ? a : b;
    return;
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

  stayCount(){
    this.setState(prevState => ({ count: prevState.count}))
  }

  incrementCount()
  {
    this.setState(prevState => ({ count: prevState.count + 1 }))
  }

  getDate()
  {
    return (new Date()).toString();
  }

  async post_request(item){
    var formData = new FormData();
    formData.append('date', item);
    console.log(item);
    try{
      let req = await fetch('http://ben-harder.com/lumohacks2019/execPython.php',{
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      if (req.status >= 200 && req.status < 300) {
        console.log(req.status);
      }
      else{
        console.log(req.status);
      }
    }
    catch(errors){
      console.log(errors);
    }
  }

  async play_song(){
      const source = {
        uri: "http://www.slspencer.com/Sounds/Chewbacca/Chewie3.mp3"
      };
      try {
        await Audio.setIsEnabledAsync(true);
        const sound = new Audio.Sound();
        await sound.loadAsync(source);
        await sound.playAsync();
      } catch(error) {
        console.error(error);
      }
    }

  display_image(){
    console.log(this.view_url);
    return (
      <Image
        source={this.view_url}
        style={{width: 300, height:300, flex:1}}
        resizeMode="contain"
      />
    );
  }

  render()
  {
      return (

        <View style={styles.container}>
          <TouchableOpacity onPressIn={this.addOne} onPressOut={this.stopTimer} >
          {this.display_image()}
          </TouchableOpacity>
          <Text style={{color: 'white'}}>{this.getDate()}</Text>
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
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
