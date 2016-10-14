import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

import Parse from 'parse/react-native';
import Button from '../common/button';

class Signin extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      errorMessage: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Sign In</Text>
        
        <Text style={styles.label}>Username:</Text>
        <TextInput 
          style={styles.input}
          value={this.state.username} 
          onChangeText={(text) => this.setState({username: text})}
          />
        
        <Text style={styles.label}>Password:</Text>
        <TextInput secureTextEntry={true}
          style={styles.input}
          value={this.state.password}
          onChangeText={(text) => this.setState({password: text})}
          />

        <Text style={styles.label}>{this.state.errorMessage}</Text>
        <Button text={'Sign In'} onPress={this.onPress.bind(this)} />
        <Button text={'I need account...'} onPress={this.onSignupPress.bind(this)} />
      </View>
    );
  }

  onSignupPress() {
    this.props.navigator.push({name: 'signup'});
  }

  onPress() {
    Parse.User.logIn(this.state.username, this.state.password,{
      success: (user) => { this.props.navigator.immediatelyResetRouteStack([{ name:'tweets' }]);},
      error: (data, error) => {this.setState({ errorMessage: error.message });}
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 200,
    alignSelf: 'center'
  },
  label: {
    fontSize: 18
  }
});

export default Signin;