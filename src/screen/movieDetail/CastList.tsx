import { useQuery } from "@tanstack/react-query";
import { memo } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Credit } from "../../types";
import { getCreditsOfMovie } from "../../libs/movie";
import _ from "lodash";


type CastListProps = {
  movieId: number
}

export const CastList = memo((props: CastListProps) => {
  const { data: movieCredits } = useQuery<Credit>({
    queryKey: ['movie-credits', props?.movieId],
    queryFn: () => getCreditsOfMovie(props?.movieId)
  })

  const sortCastLists = _.sortBy(movieCredits?.cast, 'popularity').reverse()

  return (
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
  )
}, (prevProps, nextProps) => {
  return prevProps.movieId == nextProps.movieId
})

const styles = StyleSheet.create({
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
})