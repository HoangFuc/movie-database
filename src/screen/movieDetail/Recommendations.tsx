import { useQuery } from "@tanstack/react-query";
import { memo } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Movie } from "../../types";
import { getRecommendationLists } from "../../libs/movie";
import _ from "lodash";

type RecommendationsProps = {
  movieId: number
}

export const Recommendations = memo((props: RecommendationsProps) => {

  const { data: recommendLists } = useQuery<Movie[]>({
    queryKey: ['recommend-lists', props?.movieId],
    queryFn: () => getRecommendationLists(props.movieId)
  })

  return (
    <View style={styles.recommendationsSection}>
      <Text style={styles.sectionTitle}>Recommendations</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {_.sortBy(recommendLists, 'vote_average').reverse()?.map((movie: Movie, index) => (
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
  )
}, (prevProps, nextProps) => {
  return prevProps.movieId == nextProps.movieId
})

const styles = StyleSheet.create({
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
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000000',
  },
})