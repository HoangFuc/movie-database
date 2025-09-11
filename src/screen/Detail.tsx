import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import CircularProgress from '../component/CircularProgress'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getMovieDetail } from '../libs/movie'
import { Movie } from '../types'
import _ from 'lodash'
import { MovieHeader } from './movieDetail/MovieHeader'
import { useAppSelector } from '../redux/hooks'
import Loading from '../component/Loading'
import { Credits } from './movieDetail/Credits'
import { CastList } from './movieDetail/CastList'
import { Recommendations } from './movieDetail/Recommendations'
import { addToWatchList } from '../libs/watchlist'
import { HeaderImage } from '../component/HeaderImage'
import { Bookmark } from 'lucide-react-native'

const MovieDetailsScreen: React.FC = (props: any) => {
  const movie = props?.route?.params?.movie
  const queryClient = useQueryClient()
  const { data: movieDetail } = useQuery<Movie>({
    queryKey: ['movie-detail', movie?.id],
    queryFn: () => getMovieDetail(Number(movie?.id))
  })

  const mutation = useMutation({
    mutationFn: addToWatchList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchList-detail'] })
      Alert.alert("Success", "Add to watchlist success !")
    },
  })
  const loading = useAppSelector(state => state.movie.loading)
  const hours = movieDetail?.runtime ? Math.floor(movieDetail.runtime / 60) : 0
  const mins = movieDetail?.runtime ? movieDetail.runtime % 60 : 0

  const handleAddWatchList = () => {
    if (movie?.id) {
      mutation.mutate(Number(movie.id))
    } else {
      Alert.alert("Error", "Missing movie id")
    }
  }

  const goBack = () => {
    props.navigation.goBack()
  }


  return (
    <SafeAreaView style={styles.container}>
      <HeaderImage />
      {loading
        ? <Loading />
        :
        <ScrollView style={styles.scrollView}>
          <View
            style={styles.movieSection}
          >
            {movieDetail && <MovieHeader movieDetail={movieDetail} goBack={goBack} />}

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
              <Credits movieId={Number(movie?.id)} />
            </View>

            <Text style={styles.tagline}>{movieDetail?.tagline}</Text>

            <View style={styles.overviewSection}>
              <Text style={styles.overviewTitle}>Overview</Text>
              <Text style={styles.overviewText}>
                {movieDetail?.overview}
              </Text>
            </View>

            <TouchableOpacity style={styles.watchlistButton} onPress={handleAddWatchList}>
              <Bookmark color='white' />
              <Text style={styles.watchlistText}>Add To Watchlist</Text>
            </TouchableOpacity>
          </View>

          <CastList movieId={Number(movie?.id)} />

          <Recommendations movieId={Number(movie?.id)} />

        </ScrollView>
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  scrollView: {
    flex: 1,
  },
  movieSection: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    backgroundColor: '#00B4E4',
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
})

export default MovieDetailsScreen