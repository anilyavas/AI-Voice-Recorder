import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function Page() {
  const { uri } = useLocalSearchParams<{ uri?: string }>();
  return (
    <View>
      <Text>Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
