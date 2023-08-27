import { Button, FlatList, Image, Keyboard, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const App = () => {
  const defaultAvatar = require('./images/defaultImage.jpg');
  const [data, setData] = useState([]);
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactAvatar, setContactAvatar] = useState(null);
  const [contactDescription, setContactDescription] = useState("");
  const [contactPhoneNumber, setContactPhoneNumber] = useState(null);
  const [contactEmail, setContactEmail] = useState("");
  

  const selectAvatar = () => {
    const option = {
      title: 'Chọn Avatar',
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(option, response=>{
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setContactAvatar(response.assets[0].uri);
      }
    });
  };

  const showContactAvatar = () => {
    console.log(contactAvatar);
  };

  const closeModalAdd = () => {
    setIsShowAddModal(!isShowAddModal);
    Keyboard.dismiss();
    setContactName("");
    setContactAvatar(null);
    setContactDescription("");
    setContactPhoneNumber(null);
    setContactEmail("");
  };

  const handleAddContact = () => {
    const newContact = {name:contactName,avatar:contactAvatar,description:contactDescription,phoneNumber:contactPhoneNumber,email:contactEmail};
    const updateData = [...data,newContact];
    setData(updateData);
    closeModalAdd();
  }

  const renderItem = ({item,index}) => {
    return(
      <TouchableOpacity style={styles.itemContainer}>
        <View style={styles.itemContent}>
          <Image
          source={item.avatar ? {uri:item.avatar} : defaultAvatar}
          style={styles.image}
          />
          <View>
            <Text style={styles.itemLabel}>
              {item.name}
            </Text>
            <Text style={styles.itemDescription}>
              {item.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>All Contact</Text>
      <View style={styles.searchContainer}>
        <TextInput placeholder='Search' style={styles.searchInput}/>
        <TouchableOpacity style={styles.sort}>
          <FontAwesome name="sort-alpha-asc" size={16} color={"#8d8c90"}/>
        </TouchableOpacity>
      </View>
      <View style={styles.line}></View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item,index)=>index.toString()}
      />
      <TouchableOpacity style={styles.addContainer} onPress={()=>setIsShowAddModal(!isShowAddModal)}>
        <Ionicons name="person-add" size={24} color={"#ffffff"}/>
      </TouchableOpacity>
      <Modal
        visible={isShowAddModal}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={[styles.title,{textAlign: "center",fontSize: 40,}]}>Thêm Danh Bạ</Text>
            <TouchableOpacity onPress={()=>selectAvatar()} style={{alignSelf: "center",marginBottom: 20, marginTop: 20,}}>
              {contactAvatar != null ? (
              <Image
              source={{ uri: contactAvatar }}
              style={{width: 120, height: 120}}
              />) : (
              <Image
              source={defaultAvatar}
              style={{width: 120, height: 120}}
              />)
              }
            </TouchableOpacity>
            <TextInput style={styles.textInput} placeholder='Vui lòng nhập họ tên' onChangeText={text=>setContactName(text)}/>
            <TextInput style={styles.textInput} placeholder='Vui lòng nhập mô tả' onChangeText={text=>setContactDescription(text)}/>
            <TextInput style={styles.textInput} placeholder='Vui lòng nhập số điện thoại' onChangeText={text=>setContactPhoneNumber(text)}/>
            <TextInput style={styles.textInput} placeholder='Vui lòng nhập email' onChangeText={text=>setContactEmail(text)}/>
            <View style={styles.pocketButton}>
              <Button title='Thêm' color={"#499cff"} onPress={()=>handleAddContact()}/>
              <Button title='Đóng' color={"#D3D3D3"} onPress={()=>closeModalAdd()}/>
            </View>
            <Button title="Show Avatar URI" onPress={showContactAvatar} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#ffffff",
  },
  title:{
    color: "black",
    marginTop: 8,
    marginLeft: 16,
    fontWeight: "bold",
    fontSize: 20,
  },
  searchContainer:{
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    height: 80,
    maxHeight: 80,
  },
  searchInput:{
    width: "85%",
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 30,
    paddingHorizontal: 16,
    marginRight: 8,
    height: "100%",
  },
  sort:{
    borderRadius: 100,
    borderWidth: 1,
    height: "100%",
    width: "14%",
    borderColor: "#D3D3D3",
    justifyContent: "center",
    alignItems: "center",
  },
  line:{
    borderBottomWidth: 1,
    borderColor: "#D3D3D3",
  },
  addContainer:{
    position: "absolute",
    bottom: 20,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#499cff",
    width: 70,
    height: 70,
    elevation: 6,
  },
  itemContainer:{
    flex: 1,
    paddingVertical: 16,
    marginLeft: 16,
    borderBottomWidth: 1,
    borderColor: "#D3D3D3",
  },
  itemContent:{
    flexDirection: "row",
  },
  image:{
    width: 60,
    height: 60,
    borderRadius: 100,
    marginRight: 16,
  },
  itemLabel:{
    fontWeight: "bold",
    color: "black",
    fontSize: 22,
  },
  modalContainer:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",

  },
  modalContent:{
    position: "absolute",
    backgroundColor: "#ffffff",
    padding: 16,
    width: 350,
    maxWidth: 350,
    borderRadius: 30,
  },
  textInput:{
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  pocketButton:{
    justifyContent: "space-around",
    flexDirection: "row",
  },
})