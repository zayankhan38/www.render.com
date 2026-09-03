import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

/**
 * Mobile Home Screen
 */
function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'gaming', name: 'Gaming' },
    { id: 'music', name: 'Music' },
    { id: 'education', name: 'Education' },
    { id: 'comedy', name: 'Comedy' }
  ];

  const videos = [
    { id: 1, title: 'How to Make Money on Render', creator: 'Creator Pro', views: '1.2M' },
    { id: 2, title: 'Render Shorts Challenge $10K', creator: 'Content King', views: '5.6M' },
    { id: 3, title: 'Gaming Setup Reveal', creator: 'Gamer Elite', views: '2.3M' },
    { id: 4, title: 'Music Production Guide', creator: 'Beat Master', views: '456K' },
    { id: 5, title: 'Render Platform Review', creator: 'Tech Reviewer', views: '3.1M' }
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>🔴 RENDER</Text>
        <Pressable>
          <MaterialCommunityIcons name="magnify" size={24} color="#fff" />
        </Pressable>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScroll}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((cat) => (
          <Pressable
            key={cat.id}
            onPress={() => setSelectedCategory(cat.id)}
            style={[
              styles.categoryBtn,
              selectedCategory === cat.id && styles.categoryBtnActive
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat.id && styles.categoryTextActive
              ]}
            >
              {cat.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Video Feed */}
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable style={styles.videoCard}>
            <View style={styles.thumbnail}>
              <Text style={styles.thumbnailText}>🎬</Text>
            </View>
            <View style={styles.videoInfo}>
              <Text style={styles.videoTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.creator}>{item.creator}</Text>
              <Text style={styles.views}>{item.views} views</Text>
            </View>
          </Pressable>
        )}
        scrollEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomColor: '#1f2937',
    borderBottomWidth: 1
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#dc2626'
  },
  categoriesScroll: {
    paddingVertical: 8
  },
  categoriesContainer: {
    paddingHorizontal: 8
  },
  categoryBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#1f2937'
  },
  categoryBtnActive: {
    backgroundColor: '#dc2626'
  },
  categoryText: {
    color: '#9ca3af',
    fontSize: 14,
    fontWeight: '600'
  },
  categoryTextActive: {
    color: '#fff'
  },
  videoCard: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomColor: '#1f2937',
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: 12
  },
  thumbnail: {
    width: 120,
    height: 68,
    backgroundColor: '#1f2937',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  thumbnailText: {
    fontSize: 32
  },
  videoInfo: {
    flex: 1,
    justifyContent: 'center'
  },
  videoTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4
  },
  creator: {
    color: '#9ca3af',
    fontSize: 12,
    marginBottom: 2
  },
  views: {
    color: '#6b7280',
    fontSize: 12
  }
});

export default HomeScreen;