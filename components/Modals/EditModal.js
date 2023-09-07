import { Button, Image, Modal, StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native'
import React, {useState} from 'react'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const EditModal = ({visible, onEdit, onClose}) => {
    const defaultAvatar = require('../../images/defaultImage.jpg');
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
    const handleEdit = () => {
        const editContact = {
            name:contactName || "",
            avatar:contactAvatar || "",
            description:contactDescription || "",
            phoneNumber:contactPhoneNumber || "",
            email:contactEmail || ""};
        console.log(editContact);
        onEdit(editContact);
    }
    const closeModalEdit = () => {
        setContactName("");
        setContactAvatar(null);
        setContactDescription("");
        setContactPhoneNumber(null);
        setContactEmail("");
      };
  return (
    <Modal
        visible={visible}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={[styles.title,{textAlign: "center",fontSize: 40,color: "black"}]}>Sửa Danh Bạ</Text>
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
              <Button title='Sửa' color={"#499cff"} onPress={()=>handleEdit()}/>
              <Button title='Đóng' color={"#D3D3D3"} onPress={()=>{closeModalEdit();onClose}}/>
            </View>
          </View>
        </View>
      </Modal>
  )
}

export default EditModal

const styles = StyleSheet.create({
    modalContainer:{
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent:{
        backgroundColor: "#ffffff",
        padding: 16,
        width: 350,
        maxWidth: 350,
        borderRadius: 20,
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