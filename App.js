import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Alert } from 'react-native';

export default class App extends React.Component
{
  render()
  {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() =>
        {
          Alert.alert("wain");
        }}>
          <Image
            source={require('./img/icon.jpg')}
          />
        </TouchableHighlight>
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
