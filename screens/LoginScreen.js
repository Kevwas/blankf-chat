import React, { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase-config';
import LoadingScreen from './LoadingScreen';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        navigation.replace("Home");
      } 
      setLoading(false);
    });

    return unsuscribe;
  }, []);

  const signIn = () => {
    setLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .catch(err => alert(err))
      .finally(() => setLoading(false));
  };

  return (
    loading ? 
      <LoadingScreen /> 
    :
      <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
        <StatusBar style="light" /> 
        <Image 
          source={{
            uri:
              "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",
          }}
          style={{ width: 200, height: 200 }}
        />
        <View style={styles.inputContainer}>
          <Input 
            placeholder="Email" 
            autoFocus 
            type="email" 
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.inputContainer}
          />
          <Input 
            placeholder="Password" 
            secureTextEntry 
            type="password"
            value={password}
            onChangeText={text => setPassword(text)}
            onSubmitEditing={() => {(password && email) && signIn}}
          />
          <Button disabled={!password || !email} containerStyle={styles.button} onPress={signIn} title="Login" /> 
          <Button containerStyle={styles.button} type="outline" onPress={() => navigation.navigate("Register")} title="Register" /> 
        </View>
        <View stle={{ height: 100 }}/>
      </KeyboardAvoidingView>
  )
}

export default LoginScreen;

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
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  button: {
    width: 200,
    marginTop: 10,
  }
});