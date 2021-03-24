import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import CustomListItem from '../components/CustomListItem';
import { Avatar, Image } from 'react-native-elements';
import { auth, db } from '../firebase';

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('chats').onSnapshot(snapshot => {
      setChats(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data(),
      })))
    });

    return unsubscribe;
  }, [])

  const signOutUser = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login');
      });
  }

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id: id,
      chatName: chatName,
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
          <TouchableOpacity 
            activeOpacity={0.5} 
            onPress={() => navigation.navigate("AddChat")} 
          >
            <SimpleLineIcons name='pencil' size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),

    });
  }, []);

  return (
    <SafeAreaView>
      <StatusBar style="dark" /> 
      <ScrollView style={styles.container}>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem 
            key={id} 
            id={id} 
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  }
});
