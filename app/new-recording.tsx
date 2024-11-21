import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { toast } from 'sonner-native';

export default function Page() {
  const { uri } = useLocalSearchParams<{ uri?: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [transcription, setTranscription] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!uri) return;
    handleTranscribe();
  }, [uri]);

  const handleTranscribe = async () => {
    setIsLoading(true);
    toast.loading('Transcribing...');
    try {
      const formData = new FormData();
      const audioData = {
        uri,
        type: 'audio/m4a',
        name: 'audio.m4a',
      };

      formData.append('file', audioData as unknown as Blob);

      const response = await fetch('/api/speech-to-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      }).then((response) => response.json());
      setTranscription(response.text || 'No transcription available');
    } catch (error) {
      console.error('Error transcribing audio:', error);
    } finally {
      setIsLoading(false);
      toast.dismiss();
    }
  };

  const handleSave = () => {
    console.log('handleSave');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.transcriptionInput}
        multiline
        value={transcription}
        onChangeText={setTranscription}
        placeholder='Transcription will appear here...'
        editable={!isLoading}
      />
      <Pressable onPress={handleSave} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Transcription</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'f5f5f5',
  },
  transcriptionInput: {
    backgroundColor: 'white',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    minHeight: 150,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#ff9800',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
