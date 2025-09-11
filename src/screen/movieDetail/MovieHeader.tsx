import { Movie } from "../../types";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "@rneui/base";
import { memo } from "react";

interface MovieHeaderProps {
  movieDetail: Movie | undefined;
  goBack: any
}

export const MovieHeader = memo(({ movieDetail, goBack }: MovieHeaderProps) => {
  const yearRelease = movieDetail?.release_date ? movieDetail.release_date.split('-')[0] : ''
  return (
    <View style={styles.movieHeader}>
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Icon name="chevron-left" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.movieTitle}>{movieDetail?.title ?? ""} ({yearRelease})</Text>
    </View>
  );
}, (prevProps, nextProps) => {
  return prevProps.movieDetail == nextProps.movieDetail
})

const styles = StyleSheet.create({
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
})