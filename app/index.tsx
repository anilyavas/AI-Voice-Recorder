import { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Audio } from 'expo-av';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Index() {
  const [recording, setRecording] = useState<Audio.Recording>();
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();

  const startRecording = () => {
    console.log('startRecording');
  };
  const stopRecording = () => {
    console.log('stopRecording');
  };

  return (
    <View style={styles.container}>
      {/* Render the items */}
      <View style={[styles.buttonContainer, { bottom }]}>
        <Pressable
          onPress={recording ? stopRecording : startRecording}
          style={[
            styles.recordButton,
            recording ? styles.recordingButton : styles.notRecordingButton,
          ]}
        >
          <Ionicons
            name={recording ? 'stop' : 'mic'}
            size={24}
            color={'white'}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    alignSelf: 'center',
  },
  recordButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordingButton: {
    backgroundColor: '#ff4444',
  },
  notRecordingButton: {
    backgroundColor: '#4444ff',
  },
});
