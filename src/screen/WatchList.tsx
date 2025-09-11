import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronLeft, X, ArrowUp } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderImage } from '../component/HeaderImage';
import { useQuery } from '@tanstack/react-query';
import { getUserDetail } from '../libs/user';
import { RootStackParamList, UserInfo } from '../types';
import { WatchListDetail } from './watchListMovie/WatchListDetail';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';

const WatchlistScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { data: userInfo } = useQuery<UserInfo>({
    queryKey: ['user-detail'],
    queryFn: getUserDetail
  })

  // sort state
  const [sortOpen, setSortOpen] = useState(false)
  const [sortBy, setSortBy] = useState<'alpha' | 'rating' | 'release-date'>('rating')
  const [ascending, setAscending] = useState(true)

  const sortLabel = useMemo(() => {
    switch (sortBy) {
      case 'alpha':
        return 'Alphabetical order'
      case 'rating':
        return 'Rating'
      case 'release-date':
        return 'Release date'
      default:
        return 'Rating'
    }
  }, [sortBy])

  const goBackHome = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <HeaderImage />

        <View style={styles.profileSection}>
          <TouchableOpacity style={styles.backButton} onPress={goBackHome}>
            <ChevronLeft size={24} color="white" />
          </TouchableOpacity>

          <View style={styles.profileInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>P</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{userInfo?.username}</Text>
            </View>
          </View>
        </View>

        <View style={styles.watchlistSection}>
          <Text style={styles.watchlistTitle}>My Watchlist</Text>

          <View style={styles.filterContainer}>
            <View style={styles.filterBy}>
              <Text style={styles.filterLabel}>Filter by:</Text>
              <View>
                <TouchableOpacity style={styles.ratingFilter} onPress={() => setSortOpen((v) => !v)}>
                  <Text style={styles.ratingText}>{sortLabel}</Text>
                  <View style={styles.underline} />
                </TouchableOpacity>
                {sortOpen && (
                  <View style={styles.dropdownMenu}>
                    <TouchableOpacity style={styles.dropdownItem} onPress={() => { setSortBy('alpha'); setSortOpen(false); }}>
                      <Text style={styles.dropdownText}>Alphabetical order</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dropdownItem} onPress={() => { setSortBy('rating'); setSortOpen(false); }}>
                      <Text style={styles.dropdownText}>Rating</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dropdownItem} onPress={() => { setSortBy('release-date'); setSortOpen(false); }}>
                      <Text style={styles.dropdownText}>Release date</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.orderBy}>
              <Text style={styles.orderLabel}>Order:</Text>
              <TouchableOpacity style={styles.orderButton} onPress={() => setAscending((v) => !v)}>
                <ArrowUp size={16} color="#374151" style={{ transform: [{ rotate: ascending ? '0deg' : '180deg' }] }} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Movie Cards */}
          <WatchListDetail sortBy={sortBy} ascending={ascending} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default WatchlistScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4ECDC4',
    letterSpacing: 2,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4ECDC4',
    marginHorizontal: 4,
  },
  logoBar: {
    width: 30,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4ECDC4',
    marginRight: 8,
  },
  logoTextDB: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6B95DA',
    letterSpacing: 2,
  },
  profileSection: {
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 20,
    paddingVertical: 30,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 1,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 40,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 14,
    color: '#94A3B8',
  },
  watchlistSection: {
    padding: 20,
  },
  watchlistTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  filterBy: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 8,
  },
  ratingFilter: {
    position: 'relative',
  },
  ratingText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  underline: {
    position: 'absolute',
    bottom: -2,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#3B82F6',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 22,
    left: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
    zIndex: 10,
    minWidth: 180,
  },
  dropdownItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  dropdownText: {
    fontSize: 14,
    color: '#111827',
  },
  orderBy: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 8,
  },
  orderButton: {
    padding: 4,
  },

});