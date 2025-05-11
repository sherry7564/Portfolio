import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, Animated, FlatList } from 'react-native';

const App = () => {
  const [mood, setMood] = useState(null);
  const [journalText, setJournalText] = useState('');
  const [posts, setPosts] = useState([]);
  
  const [progress, setProgress] = useState(0);  // For Mood Tracking Progress
  
  const changeMood = (newMood) => {
    setMood(newMood);
    setProgress(progress + 20);  // Update progress as mood changes
  };
  
  const handleAddPost = () => {
    if (journalText.trim()) {
      const newPost = {
        id: Math.random().toString(),
        content: journalText,
      };
      setPosts([newPost, ...posts]);
      setJournalText('');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* Header */}
      <Text style={styles.header}>Mental Health Tracker</Text>

      {/* Mood Selector */}
      <Text style={styles.moodText}>How are you feeling today?</Text>
      <View style={styles.moodContainer}>
        <TouchableOpacity onPress={() => changeMood('Happy')}>
          <Text style={[styles.moodButton, mood === 'Happy' && styles.selectedMood]}>😊</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeMood('Sad')}>
          <Text style={[styles.moodButton, mood === 'Sad' && styles.selectedMood]}>😞</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeMood('Neutral')}>
          <Text style={[styles.moodButton, mood === 'Neutral' && styles.selectedMood]}>😐</Text>
        </TouchableOpacity>
      </View>
      
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Mood Progress: {progress}%</Text>
        <View style={styles.progressBar}>
          <Animated.View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </View>

      {/* Journal Section */}
      <Text style={styles.journalText}>Share Your Thoughts:</Text>
      <TextInput
        style={styles.journalInput}
        placeholder="Write something..."
        multiline
        value={journalText}
        onChangeText={setJournalText}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddPost}>
        <Text style={styles.buttonText}>Post Journal</Text>
      </TouchableOpacity>

      {/* Recent Posts Section */}
      <Text style={styles.sectionTitle}>Recent Posts</Text>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <Text style={styles.postContent}>{item.content}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      
      {/* Footer */}
      <View style={styles.navBar}>
        <Text style={styles.navItem}>Home</Text>
        <Text style={styles.navItem}>Journals</Text>
        <Text style={styles.navItem}>Groups</Text>
        <Text style={styles.navItem}>Therapy</Text>
        <Text style={styles.navItem}>Profile</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4b5b6f',
    textAlign: 'center',
    marginBottom: 20,
  },
  moodText: {
    fontSize: 18,
    color: '#555',
    marginVertical: 10,
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  moodButton: {
    fontSize: 40,
    padding: 15,
    backgroundColor: '#ddd',
    borderRadius: 50,
  },
  selectedMood: {
    backgroundColor: '#85e1a2',
  },
  progressContainer: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4b5b6f',
  },
  progressBar: {
    height: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4caf50',
  },
  journalText: {
    fontSize: 18,
    marginVertical: 10,
    color: '#333',
  },
  journalInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  postCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  postContent: {
    fontSize: 16,
    color: '#333',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  navItem: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default App;
