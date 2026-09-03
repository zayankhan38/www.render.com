import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

/**
 * Mobile Studio Screen (Analytics)
 */
function StudioScreen() {
  const stats = [
    { label: 'Views', value: '15.4M', icon: '👁️' },
    { label: 'Likes', value: '856K', icon: '❤️' },
    { label: 'Subscribers', value: '2.5K', icon: '👥' },
    { label: 'Earnings', value: '$2,150', icon: '💰' }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🎙️ Render Studio</Text>
        <Text style={styles.subtitle}>Your creator analytics</Text>
      </View>

      <ScrollView>
        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat, idx) => (
            <View key={idx} style={styles.statCard}>
              <Text style={styles.statIcon}>{stat.icon}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Analytics Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Weekly Performance</Text>
          <View style={styles.analyticsCard}>
            <View style={styles.chartBar}>
              <View style={[styles.bar, { height: '80%' }]} />
            </View>
            <View style={styles.chartBar}>
              <View style={[styles.bar, { height: '60%' }]} />
            </View>
            <View style={styles.chartBar}>
              <View style={[styles.bar, { height: '90%' }]} />
            </View>
            <View style={styles.chartBar}>
              <View style={[styles.bar, { height: '70%' }]} />
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    paddingVertical: 16
  },
  statCard: {
    width: '50%',
    paddingHorizontal: 8,
    marginBottom: 12
  },
  statCardInner: {
    backgroundColor: '#1f2937',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center'
  },
  statIcon: {
    fontSize: 28,
    marginBottom: 8
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4
  },
  statLabel: {
    fontSize: 12,
    color: '#9ca3af'
  },
  section: {
    paddingHorizontal: 16,
    marginVertical: 12
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12
  },
  analyticsCard: {
    backgroundColor: '#1f2937',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8
  },
  chartBar: {
    flex: 1,
    height: 100,
    backgroundColor: '#111827',
    borderRadius: 4,
    overflow: 'hidden'
  },
  bar: {
    backgroundColor: '#dc2626',
    width: '100%'
  }
});

export default StudioScreen;