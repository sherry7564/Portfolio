// App.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Dummy user data
const dummyUser = { username: 'user', password: 'pass' };

// --- Login/Signup Screen ---
function AuthScreen({ navigation }) {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = () => {
    if (isSignup) {
      alert('Signup Successful!');
      navigation.replace('MainApp');
    } else {
      if (username === dummyUser.username && password === dummyUser.password) {
        navigation.replace('MainApp');
      } else {
        alert('Invalid credentials. Try user/pass');
      }
    }
  };

  return (
    <View style={styles.authContainer}>
      <Text style={styles.appTitle}>📸 PhotoHub</Text>
      <Text style={styles.authTitle}>{isSignup ? 'Signup' : 'Login'}</Text>
      <TextInput
        placeholder='Username'
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title={isSignup ? 'Signup' : 'Login'} onPress={handleAuth} />
      <TouchableOpacity onPress={() => setIsSignup(!isSignup)}>
        <Text style={styles.toggleText}>
          {isSignup ? 'Already have an account? Login' : "Don't have an account? Signup"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// --- Custom Header ---
function AppHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>📸 PhotoHub</Text>
    </View>
  );
}

// --- Home Screen ---
function HomeScreen() {
  return (
    <ScrollView style={styles.pageContainer}>
      <Image source={{ uri: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBob3RvZ3JhcGh5fGVufDB8fDB8fHww' }} style={styles.banner} />
      <Text style={styles.pageTitle}>Welcome to PhotoHub!</Text>
      <Text style={styles.pageContent}>
        Capture and share your beautiful moments. Explore stunning photography, upload your clicks, and build your portfolio!
      </Text>
    </ScrollView>
  );
}



// --- Gallery Screen ---
function GalleryScreen() {
  const photos = [
    'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1554080353-a576cf803bda?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBob3RvZ3JhcGh5fGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=60',
  ];
  return (
    <ScrollView style={styles.pageContainer}>
      <Text style={styles.pageTitle}>Gallery</Text>
      {photos.map((url, index) => (
        <Image key={index} source={{ uri: url }} style={styles.galleryImage} />
      ))}
    </ScrollView>
  );
}

// --- Upload Screen ---
function UploadScreen() {
  return (
    <View style={styles.pageContainer}>
      <Text style={styles.pageTitle}>Upload Photo</Text>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1829/1829586.png' }}
        style={styles.uploadIcon}
      />
      <Text style={styles.pageContent}>Feature coming soon — You’ll be able to upload your photos here!</Text>
    </View>
  );
}

// --- Profile Screen ---
function ProfileScreen() {
  return (
    <View style={styles.pageContainer}>
      <Text style={styles.pageTitle}>Profile</Text>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1541516160071-4bb0c5af65ba?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBob3RvZ3JhcGh5fGVufDB8fDB8fHww' }}
        style={styles.profileIcon}
      />
      <Text style={styles.pageContent}>Username: Shaher Bano</Text>
      <Text style={styles.pageContent}>Email: user@example.com</Text>
    </View>
  );
}

// --- Bottom Tab Navigator (with header) ---
function MainApp() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppHeader />
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Gallery" component={GalleryScreen} />
        <Tab.Screen name="Upload" component={UploadScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

// --- Main App ---
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthScreen">
        <Stack.Screen name="AuthScreen" component={AuthScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  appTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 20,
  },
  authContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  authTitle: {
    fontSize: 24,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginVertical: 5,
    width: '80%',
    borderRadius: 5,
  },
  toggleText: {
    marginTop: 10,
    color: '#4A90E2',
  },
  header: {
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  pageContainer: {
    flex: 1,
    padding: 15,
  },
  banner: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginBottom: 15,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pageContent: {
    fontSize: 16,
    marginBottom: 10,
  },
  galleryImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  uploadIcon: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginVertical: 20,
  },
  profileIcon: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 50,
  },
});
