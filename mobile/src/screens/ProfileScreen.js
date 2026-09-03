import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

/**
 * Mobile Profile Screen
 */
function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <Text style={styles.username}>CreatorPro</Text>
          <Text style={styles.bio}>Making awesome content on Render</Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>2.5K</Text>
              <Text style={styles.statLabel}>Subscribers</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>15.4M</Text>
              <Text style={styles.statLabel}>Views</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>156</Text>
              <Text style={styles.statLabel}>Videos</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <Pressable style={styles.actionBtn}>
            <MaterialCommunityIcons name="pencil" size={20} color="#fff" />
            <Text style={styles.actionBtnText}>Edit Profile</Text>
          </Pressable>
          <Pressable style={[styles.actionBtn, styles.actionBtnSecondary]}>
            <MaterialCommunityIcons name="share" size={20} color="#fff" />
            <Text style={styles.actionBtnText}>Share</Text>
          </Pressable>
        </View>

        {/* Monetization Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💰 Monetization</Text>
          <View style={styles.card}>
            <View style={styles.cardRow}>
              <Text style={styles.cardLabel}>Status</Text>
              <Text style={styles.cardValueGreen}>✓ Active</Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.cardLabel}>Play Button</Text>
              <Text style={styles.cardValue}>🏆 Diamond</Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.cardLabel}>Payout Rate</Text>
              <Text style={styles.cardValueGreen}>90%</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomColor: '#1f2937',
    borderBottomWidth: 1
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#dc2626',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12
  },
  avatarText: {
    fontSize: 40
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4
  },
  bio: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 16,
    textAlign: 'center'
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16
  },
  stat: {
    alignItems: 'center'
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  },
  statLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    backgroundColor: '#dc2626',
    borderRadius: 8
  },
  actionBtnSecondary: {
    backgroundColor: '#374151'
  },
  actionBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12
  },
  card: {
    backgroundColor: '#1f2937',
    borderRadius: 8,
    overflow: 'hidden'
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomColor: '#111827',
    borderBottomWidth: 1
  },
  cardLabel: {
    fontSize: 14,
    color: '#9ca3af'
  },
  cardValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff'
  },
  cardValueGreen: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10b981'
  }
});

export default ProfileScreen;