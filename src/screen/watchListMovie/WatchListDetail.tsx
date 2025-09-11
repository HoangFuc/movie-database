import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWatchListMovie, removeFromWatchList } from "../../libs/watchlist";
import { Image, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { Movie, RootStackParamList } from "../../types";
import { X } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import _ from "lodash";

type Props = {
  sortBy: 'alpha' | 'rating' | 'release-date'
  ascending: boolean
}

export const WatchListDetail = ({ sortBy, ascending }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const queryClient = useQueryClient()
  const { data: watchListDetail } = useQuery<Movie[]>({
    queryKey: ['watchList-detail'],
    queryFn: getWatchListMovie
  })

  const removeMutation = useMutation({
    mutationFn: removeFromWatchList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchList-detail'] })
      Alert.alert("Success", "Removed from watchlist!")
    },
    onError: () => {
      Alert.alert("Error", "Failed to remove from watchlist")
    }
  })

  const onPressMovie = (movie: Movie) => {
    navigation.navigate('Detail', { movie })
  }

  const handleRemoveMovie = (movieId: number) => {
    Alert.alert(
      "Remove from Watchlist",
      "Are you sure you want to remove this movie from your watchlist?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => removeMutation.mutate(movieId)
        }
      ]
    )
  }

  const sortedList = useMemo(() => {
    const lists = watchListDetail || []
    let cloned = [...lists]
    switch (sortBy) {
      case 'alpha':
        cloned = _.sortBy(cloned, 'title')
        break
      case 'rating':
        cloned = _.sortBy(cloned, 'vote_average')
        break
      case 'release-date':
        cloned = _.sortBy(cloned, 'release_date')
        break
      default:
        break
    }
    if (!ascending) cloned.reverse()
    return cloned
  }, [watchListDetail, sortBy, ascending])

  return (
    <View style={styles.movieList}>
      {sortedList?.map((movie: Movie) => (
        <TouchableOpacity key={movie.id} style={styles.movieCard} onPress={() => onPressMovie(movie)}>
          <TouchableOpacity 
            style={styles.removeButton}
            onPress={(e) => {
              e.stopPropagation()
              handleRemoveMovie(movie.id)
            }}
          >
            <X size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <View style={styles.cardContent}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }}
              style={styles.moviePoster}
            />
            <View style={styles.movieInfo}>
              <Text style={styles.movieTitle}>{movie?.title}</Text>
              <Text style={styles.movieDate}>{movie?.release_date}</Text>
              <Text style={styles.movieDescription} numberOfLines={2}>
                {movie?.overview}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  movieList: {
    gap: 15,
  },
  movieCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'relative',
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    padding: 5,
  },
  cardContent: {
    flexDirection: 'row',
  },
  moviePoster: {
    width: 80,
    height: 120,
    borderRadius: 6,
    marginRight: 15,
  },
  movieInfo: {
    flex: 1,
    paddingRight: 20,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  movieDate: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  movieDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
})