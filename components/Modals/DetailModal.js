import { Button, Image, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DetailModal = ({visible, onClose, item}) => {
    const defaultAvatar = require('../../images/defaultImage.jpg');
    if(!item){
        return null;
    }
  return (
    <Modal
        visible={visible}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
                source={item.avatar != null ? {uri:item.avatar} : defaultAvatar}
                style={styles.avatar}
            />
            <Text style={styles.name}>Họ và tên: {item.name}</Text>
            <Text style={styles.description}>Mô tả: {item.description}</Text>
            <Text style={styles.phoneNumber}>Số điện thoại: {item.phoneNumber}</Text>
            <Text style={styles.email}>Email: {item.email}</Text>
            <Button title='Đóng' onPress={onClose}/>
          </View>
        </View>
      </Modal>
  )
}

export default DetailModal

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
    avatar:{
        alignSelf: "center",
        width: 150,
        height: 150,
        marginBottom: 8,
        borderRadius: 100,
    },
    name:{
        fontSize: 20,
        color: "black",
        marginBottom: 8,
    },
    description:{
        fontSize: 20,
        color: "black",
        marginBottom: 8,
    },
    phoneNumber:{
        fontSize: 20,
        color: "black",
        marginBottom: 8,
    },
    email:{
        fontSize: 20,
        color: "black",
        marginBottom: 8,
    },
})