import React, { useState, useLayoutEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { Button, Input, Image, Text } from 'react-native-elements';
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from '@react-navigation/native';
import { auth } from '../firebase';
import LoadingScreen from './LoadingScreen';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login"
    })
  }, []);

  const register = () => {
    setLoading(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL: 
            imageUrl || 
            "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
        })
      })
      .catch(err => alert(err.message))
      .finally(() => setLoading(false));
  };
  
  return (
    loading ? 
      <LoadingScreen /> 
    :
      <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
        <StatusBar style="light" />
        <Text h4 style={{ marginBottom: 50 }}>
          Create a Signal account
        </Text>

        <View style={styles.inputContainer}>
          <Input 
            placeholder="Full Name"  
            autofocus
            type="text" 
            value={name} 
            onChangeText={text => setName(text)}
          />
          <Input 
            placeholder="Email"  
            type="email" 
            value={email} 
            onChangeText={text => setEmail(text)}
          />
          <Input 
            placeholder="Password"  
            type="password" 
            value={password} 
            secureTextEntry
            onChangeText={text => setPassword(text)}
          />
          <Input 
            placeholder="Profile Picture URL (optional)"  
            type="text" 
            value={imageUrl} 
            onChangeText={text => setImageUrl(text)}
            onSubmitEditing={register}
          />
        </View>

        <Button 
          containerStyle={styles.button}
          raised 
          onPress={register} 
          title="Register" 
        />

        <View stle={{ height: 100 }}/>
      </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
})