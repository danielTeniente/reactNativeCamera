import React from 'react';
import {View, Pressable, StyleSheet, Text} from 'react-native';

class MainScreen extends React.Component{

    handlePressPicture = () =>{
        console.log('Go to picture ');
        this.props.navigation.navigate('PictureScreen');
    }
    
    handlePressVideo = () =>{
        console.log('Go to video ');
        this.props.navigation.navigate('VideoScreen');
    }

    render(){
        return(
            <View style={styles.mainMenu}>
                <Pressable onPress={this.handlePressPicture}
                style={styles.btn}>
                   <Text style={styles.txt}>Fotografia</Text>
                </Pressable>
                <Pressable onPress={this.handlePressVideo}
                style={styles.btn}>
                   <Text style={styles.txt}>Video</Text>
                </Pressable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainMenu:{
        backgroundColor: '#050',
        flex: 1,
    },
    btn:{
        backgroundColor: '#005',
        padding: 0,
        borderRadius: 8,
        margin: 16,
    },
    txt:{
        color: '#ff0',
        textAlign: 'center',
        fontSize: 20,
    },
});

export default MainScreen;

