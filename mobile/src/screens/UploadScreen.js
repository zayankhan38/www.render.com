import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

/**
 * Mobile Upload Screen
 */
function UploadScreen() {
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    setUploading(true);
    Alert.alert('Upload', 'Select a video from your device');
    setTimeout(() => setUploading(false), 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📤 Upload Content</Text>
      </View>

      <View style={styles.uploadArea}>
        <View style={styles.uploadIcon}>
          <MaterialCommunityIcons name="cloud-upload" size={60} color="#dc2626" />
        </View>
        <Text style={styles.uploadTitle}>Upload Video or Short</Text>
        <Text style={styles.uploadDescription}>
          Share your content with the Render community
        </Text>

        <Pressable
          style={styles.uploadBtn}
          onPress={handleUpload}
          disabled={uploading}
        >
          <MaterialCommunityIcons name="plus" size={24} color="#fff" />
          <Text style={styles.uploadBtnText}>
            {uploading ? 'Uploading...' : 'Select Video'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoCard}>
          <MaterialCommunityIcons name="check-circle" size={24} color="#10b981" />
          <Text style={styles.infoText}>Copyright detection enabled</Text>
        </View>
        <View style={styles.infoCard}>
          <MaterialCommunityIcons name="shield-check" size={24} color="#10b981" />
          <Text style={styles.infoText}>AI-generated content detection</Text>
        </View>
        <View style={styles.infoCard}>
          <MaterialCommunityIcons name="percent" size={24} color="#10b981" />
          <Text style={styles.infoText}>Earn 90% of revenue</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 16
  },
  header: {
    paddingVertical: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },
  uploadArea: {
    marginVertical: 24,
    alignItems: 'center',
    paddingVertical: 32,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#374151'
  },
  uploadIcon: {
    marginBottom: 16
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8
  },
  uploadDescription: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 16,
    textAlign: 'center'
  },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#dc2626',
    borderRadius: 8
  },
  uploadBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  infoSection: {
    marginVertical: 24
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    backgroundColor: '#1f2937',
    borderRadius: 8
  },
  infoText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500'
  }
});

export default UploadScreen;