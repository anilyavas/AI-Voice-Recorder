import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
    toast.loading('Loading...');
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

  return (
    <View>
      <Text>Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
