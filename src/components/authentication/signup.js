import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

import Parse from 'parse/react-native';
import Button from '../common/button';

class Signup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      passwordConfirmation: '',
      errorMessage: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
        
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

        <Text style={styles.label}>Confirm Password:</Text>
        <TextInput secureTextEntry={true}
          style={styles.input}
          value={this.state.passwordConfirmation}
          onChangeText={(text) => this.setState({passwordConfirmation: text})}
          />
        <Text style={styles.label}>{this.state.errorMessage}</Text>
        <Button text={'Signup'} onPress={this.onSignupPress.bind(this)} />
        <Button text={'I have an account...'} onPress={this.onSigninPress.bind(this)} />
      </View>
    );
  }

  onSignupPress() {
    
    if (this.state.password !== this.state.passwordConfirmation) {
      return this.setState({ errorMessage: 'Your passwords do not match' });
    }

    const user = new Parse.User();
    user.set('username', this.state.username);
    user.set('password', this.state.password);

    user.signUp(null, {
      success: (user) => { this.props.navigator.immediatelyResetRouteStack([{ name:'tweets' }]);},
      error: (data, error) => {this.setState({ errorMessage: error.message });}
    });
  }

  onSigninPress() {
    this.props.navigator.pop();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
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

export default Signup;