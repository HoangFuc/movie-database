import { useQuery } from "@tanstack/react-query";
import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getCreditsOfMovie } from "../../libs/movie";
import { Credit, Crew } from "../../types";
import _ from "lodash";

type CreditProps = {
  movieId: number
}

export const Credits = memo((props: CreditProps) => {
  const { data: movieCredits } = useQuery<Credit>({
    queryKey: ['movie-credits', props?.movieId],
    queryFn: () => getCreditsOfMovie(props?.movieId)
  })
  const director = _.find(movieCredits?.crew, (it: Crew) => it.job == "Director")
  const writer = _.find(movieCredits?.crew, (it: Crew) => it?.known_for_department == 'Writing')

  return (
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
  )
}, (prevProps, nextProps) => {
  return prevProps.movieId == nextProps.movieId
})

const styles = StyleSheet.create({
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
})