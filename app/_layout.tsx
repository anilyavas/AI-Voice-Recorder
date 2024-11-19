import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Toaster } from 'sonner-native';
import { PostHogProvider } from 'posthog-react-native';

const POSTHOG_API_KEY = process.env.EXPO_PUBLIC_POSTHOG_API_KEY;
const HOST = process.env.EXPO_PUBLIC_POSTHOG_HOST;
if (!POSTHOG_API_KEY) {
  throw new Error(
    'Missing PostHog API Key. Please set EXPO_PUBLIC_POSTHOG_API_KEY in your .env'
  );
}

export default function RootLayout() {
  const router = useRouter();
  return (
    <GestureHandlerRootView>
      <PostHogProvider
        apiKey={POSTHOG_API_KEY}
        debug={true}
        options={{
          host: HOST,
          enableSessionReplay: true,
        }}
      >
        <Toaster />
        <Stack>
          <Stack.Screen name='index' options={{ title: 'Voice Recorder' }} />
          <Stack.Screen
            name='new-recording'
            options={{
              title: 'New Recording',
              presentation: 'modal',
              headerLeft: () => {
                return (
                  <Ionicons
                    name='close'
                    size={24}
                    color='black'
                    onPress={() => router.back()}
                  />
                );
              },
            }}
          />
        </Stack>
      </PostHogProvider>
    </GestureHandlerRootView>
  );
}
