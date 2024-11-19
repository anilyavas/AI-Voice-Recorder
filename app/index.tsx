import { useState } from 'react';
import { View, StyleSheet, Pressable, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Index() {
  const [recording, setRecording] = useState<Audio.Recording>();
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();

  const startRecording = async () => {
    try {
      console.log('Requesting permissions..');
      const permissionResponse = await Audio.requestPermissionsAsync();

      if (permissionResponse.status !== 'granted') {
        Alert.alert('Permission not granted');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (error) {
      console.log(error);
    }
  };
  const stopRecording = async () => {
    if (!recording) {
      return;
    }
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log('stopRecording', uri);
    setRecording(undefined);

    if (uri) {
      router.push(`/new-recording?uri=${encodeURIComponent(uri)}`);
    }
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
