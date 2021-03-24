import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from '../firebase';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from "@expo/vector-icons";

const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new chat",
      headerBackTitle: "Chats",
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={navigation.goBack}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const createChat = async () => {
    await db.collection('chats').add({
      chatName: input
    }).then(() => {
      navigation.goBack();
    }).catch((err) => alert(err));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" /> 
      <Input
        placeholder="Enter a chat name"        
        value={input}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={() => {input && createChat()}}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
      />
      <Button disabled={!input} onPress={createChat} title='Create new chat'/>
    </View>
  )
}

export default AddChatScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    height: "100%"
  }
})
