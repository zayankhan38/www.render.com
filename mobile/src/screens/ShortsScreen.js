import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

/**
 * Mobile Shorts Screen
 */
function ShortsScreen() {
  const shorts = [
    { id: 1, title: 'Quick Tip #1', creator: 'Pro Tips', duration: '0:15' },
    { id: 2, title: 'Render Shorts Challenge', creator: 'Creator King', duration: '0:30' },
    { id: 3, title: 'Gaming Moment', creator: 'Gamer Pro', duration: '0:45' }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🔥 Render Shorts</Text>
        <Text style={styles.subtitle}>TikTok-Style Loop System</Text>
      </View>

      <ScrollView>
        {shorts.map((short) => (
          <Pressable key={short.id} style={styles.shortCard}>
            <View style={styles.shortThumbnail}>
              <Text style={styles.shortIcon}>📱</Text>
              <Text style={styles.shortDuration}>{short.duration}</Text>
            </View>
            <View style={styles.shortInfo}>
              <Text style={styles.shortTitle}>{short.title}</Text>
              <Text style={styles.shortCreator}>{short.creator}</Text>
              <Text style={styles.shortBadge}>✓ Loop Badge</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomColor: '#1f2937',
    borderBottomWidth: 1
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4
  },
  subtitle: {
    fontSize: 14,
    color: '#9ca3af'
  },
  shortCard: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomColor: '#1f2937',
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: 12
  },
  shortThumbnail: {
    width: 100,
    height: 160,
    backgroundColor: '#1f2937',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  shortIcon: {
    fontSize: 40
  },
  shortDuration: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#000000cc',
    color: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 'bold'
  },
  shortInfo: {
    flex: 1,
    justifyContent: 'center'
  },
  shortTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4
  },
  shortCreator: {
    color: '#9ca3af',
    fontSize: 12,
    marginBottom: 4
  },
  shortBadge: {
    color: '#10b981',
    fontSize: 12,
    fontWeight: '600'
  }
});

export default ShortsScreen;