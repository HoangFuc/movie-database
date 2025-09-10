import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import CircularProgress from '../component/CircularProgress'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery } from '@tanstack/react-query'
import { getCreditsOfMovie, getMovieDetail, getRecommendationLists } from '../libs/movie'
import { Cast, Credit, Crew, Movie } from '../types'
import _ from 'lodash'

const MovieDetailsScreen: React.FC = (props: any) => {
  const movie = props?.route?.params?.movie
  const { data: movieDetail } = useQuery<Movie>({
    queryKey: ['movie-detail', movie?.id],
    queryFn: () => getMovieDetail(Number(movie?.id))
  })
  const { data: movieCredits } = useQuery<Credit>({
    queryKey: ['movie-credits', movie?.id],
    queryFn: () => getCreditsOfMovie(Number(movie?.id))
  })
  const { data: recommendLists } = useQuery<Movie>({
    queryKey: ['recommend-lists', movie?.id],
    queryFn: () => getRecommendationLists(Number(movie?.id))
  })

  console.log("========recomment", recommendLists)
  const yearRelease = movieDetail?.release_date ? movieDetail.release_date.split('-')[0] : ''
  const hours = movieDetail?.runtime ? Math.floor(movieDetail.runtime / 60) : 0
  const mins = movieDetail?.runtime ? movieDetail.runtime % 60 : 0
  const director = _.find(movieCredits?.crew, (it: Crew) => it.job == "Director")
  const writer = _.find(movieCredits?.crew, (it: Crew) => it?.known_for_department == 'Writing')
  const sortCastLists = _.sortBy(movieCredits?.cast, 'popularity').reverse()

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />

      <View style={styles.header}>
        <Image
          source={require('../assets/headerImage.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <ScrollView style={styles.scrollView}>
        <View
          style={styles.movieSection}
        >
          <View style={styles.movieHeader}>
            <TouchableOpacity style={styles.backButton}>
              <Icon name="chevron-left" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.movieTitle}>{movieDetail?.title ?? ""} ({yearRelease})</Text>
          </View>

          <View style={styles.movieInfo}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${movieDetail?.poster_path}` }}
              style={styles.poster}
            />
            <View style={styles.movieDetails}>
              <Text style={styles.releaseInfo}>{movieDetail?.release_date} • {hours}h {mins}m</Text>
              <Text style={styles.genres}>{movieDetail?.genres.map((item) => item.name).join(", ")}</Text>
              <Text style={styles.status}>Status: {movieDetail?.status}</Text>
              <Text style={styles.language}>Original Language: {movieDetail?.production_countries[0]?.name}</Text>
            </View>
          </View>

          <View style={styles.scoreSection}>
            <View style={styles.scoreColumn}>
              <CircularProgress percentage={movieDetail?.vote_average ? _.round(movieDetail?.vote_average * 10) : 0} />
              <Text style={styles.userScoreLabel}>User Score</Text>
            </View>
            <View style={styles.creditsColumn}>
              <View style={styles.creditItem}>
                <Text style={styles.creditName}>{director?.name}</Text>
                <Text style={styles.creditRole}>Director, Writer</Text>
              </View>
              <View style={styles.creditItem}>
                <Text style={styles.creditName}>{writer?.name}</Text>
                <Text style={styles.creditRole}>Writer</Text>
              </View>
            </View>
          </View>

          <Text style={styles.tagline}>{movieDetail?.tagline}</Text>

          <View style={styles.overviewSection}>
            <Text style={styles.overviewTitle}>Overview</Text>
            <Text style={styles.overviewText}>
              {movieDetail?.overview}
            </Text>
          </View>

          {/* Watchlist Button */}
          <TouchableOpacity style={styles.watchlistButton}>
            <Icon name="bookmark" size={20} color="white" />
            <Text style={styles.watchlistText}>Add To Watchlist</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.castSection}>
          <Text style={styles.sectionTitle}>Top Billed Cast</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {sortCastLists.map((member, index) => (
              <View key={index} style={styles.castCard}>
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w500${member?.profile_path}` }}
                  style={styles.castImage}
                />
                <Text style={styles.castName}>{member?.name}</Text>
                <Text style={styles.castCharacter}>{member?.character}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.recommendationsSection}>
          <Text style={styles.sectionTitle}>Recommendations</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {recommendLists?.map((movie, index) => (
              <View key={index} style={styles.recommendationCard}>
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }}
                  style={styles.recommendationImage} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 180 }}>
                  <Text style={styles.recommendationTitle}>{movie.title}</Text>
                  <Text style={styles.recommendationRating}>{_.round(movie.vote_average * 10)} %</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 120,
    height: 40,
  },
  scrollView: {
    flex: 1,
  },
  movieSection: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    backgroundColor: '#00B4E4'
  },
  movieHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  backButton: {
    marginRight: 16,
  },
  movieTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
  },
  movieInfo: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 8,
    marginRight: 16,
  },
  movieDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ratingBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  ratingText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  releaseInfo: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
  },
  genres: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
  },
  status: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
  },
  language: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
  },
  scoreSection: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  scoreColumn: {
    alignItems: 'center',
    marginRight: 32,
  },
  userScoreLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  creditsColumn: {
    flex: 1,
    marginLeft: 80
  },
  creditItem: {
    marginBottom: 12,
  },
  creditName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  creditRole: {
    color: 'white',
    fontSize: 14,
    opacity: 0.8,
  },
  tagline: {
    color: 'white',
    fontSize: 20,
    fontStyle: 'italic',
    marginBottom: 24,
    fontWeight: '400'
  },
  overviewSection: {
    marginBottom: 24,
  },
  overviewTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  overviewText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 20,
    opacity: 0.9,
    fontWeight: '400'
  },
  watchlistButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    width: 191,
    height: 37
  },
  watchlistText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  castSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000000',
  },
  castCard: {
    width: 120,
    marginRight: 16,
  },
  castImage: {
    width: 120,
    height: 160,
    borderRadius: 8,
    marginBottom: 8,
  },
  castName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  castCharacter: {
    fontSize: 12,
    color: '#64748B',
  },
  recommendationsSection: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  recommendationCard: {
    width: 180,
    marginRight: 16,
  },
  recommendationImage: {
    width: 180,
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  recommendationTitle: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 4,
    fontWeight: '400',
    width: 150
  },
  recommendationRating: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
})

export default MovieDetailsScreen