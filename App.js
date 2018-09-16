import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Alert } from 'react-native';

export default class App extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = { count: 0 };
    this.date = { date: (new Date()).toString() }
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
