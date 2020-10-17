import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Video from 'react-native-video';

class VideoScreen extends React.Component{

    state = {
        
        recording: false,
        video_path: null,
        processing: false,  
    }

    render() {
        const { recording, video_path, processing } = this.state;
        console.log(video_path)
        let button = (
          <TouchableOpacity
            onPress={this.startRecording.bind(this)}
            style={styles.button}
          >
            <Text style={{ fontSize: 14 }}> RECORD </Text>
          </TouchableOpacity>
        );
    
        if (recording) {
          button = (
            <TouchableOpacity
              onPress={this.stopRecording.bind(this)}
              style={styles.button}
            >
              <Text style={{ fontSize: 14 }}> STOP </Text>
            </TouchableOpacity>
          );
        }
        
        

        return (
          <View style={styles.container}>
            {!processing?
              <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.off}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'We need your permission to use your audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              android
              />
              :
              null
            }
              <View
                style={{ flex: 0, flexDirection: "row", justifyContent: "center" }}
                >
                {button}
              </View>

              {video_path?
              // Reproduce el video en un pequeño espacio en la parte inferior
              <View
               style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}>
                <Video source={{uri: video_path}}   // Can be a URL or a local file.
                ref={(ref) => {
                  this.player = ref
                }}                                      // Store reference
                onBuffer={this.onBuffer}                // Callback when remote video is buffering
                onError={this.videoError}               // Callback when video cannot be loaded
                style={styles.backgroundVideo} />
                <TouchableOpacity style={styles.button}
                onPress={() => this.resumeVideo()}>
                    <Text>Aceptar</Text>
                </TouchableOpacity>
              </View>
                :null
                }

          </View>
        );
    }

    async startRecording() {
        this.setState({ recording: true });
        const options = { quality: RNCamera.Constants.VideoQuality["480p"]};
        // default to mp4 for android as codec is not set
        const { uri, codec = 'mp4' } = await this.camera.recordAsync(options);
        if(uri)
          console.log(uri)
          this.setState({ recording: false, video_path:uri, processing:true });
    }
    
    stopRecording() {
        this.camera.stopRecording();

    }

    resumeVideo(){
      this.setState({video_path:null,processing:false})

    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black',
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    button: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20,
    },
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  });

export default VideoScreen;

