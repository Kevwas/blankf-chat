import React, { useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import CustomListItem from '../components/CustomListItem';
import { Avatar, Image } from 'react-native-elements';
import { auth, db } from '../firebase';

const HomeScreen = ({ navigation }) => {

  const signOutUser = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login');
      });
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity onPress={signOutUser} activeOpacity={0.5} >
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View 
          style={{ 
            flexDirection: "row",
            justifyContent: 'space-between',
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity activeOpacity={0.5} onPress={null} >
            <AntDesign name='camerao' size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={null} >
            <SimpleLineIcons name='pencil' size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),

    });
  }, []);

  return (
    <SafeAreaView>
      <StatusBar style="light" /> 
      <ScrollView>
        <CustomListItem />
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({});
