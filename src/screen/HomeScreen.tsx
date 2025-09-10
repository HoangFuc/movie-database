import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import Dropdown from "../component/Dropdown"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getListMovie } from "../libs/movie"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { getListMovieByCategory, setSelectedCategory } from "../redux/slices/movie"

const MovieApp = () => {
  const [search, setSearch] = useState("")
  const selectedCategory = useAppSelector(state => state.movie.selectedCategory)
  const listMovie = useAppSelector(state => state.movie.lists)
  const loading = useAppSelector(state => state.movie.loading)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getListMovieByCategory({category: selectedCategory, page: 1}))
  }, [selectedCategory])

  const renderMovie = ({ item }) => (
    <View style={styles.movieCard}>
      <Image 
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} 
        style={styles.poster} 
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.release_date}</Text>
        <Text numberOfLines={2} style={styles.description}>
          {item.overview}
        </Text>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/headerImage.jpg')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Dropdown
        label="Now Playing"
        options={["now_playing", "upcoming", "popular"]}
        onSelect={(val) => dispatch(setSelectedCategory(val))}
      />

      <Dropdown
        label="Sort by"
        options={["By alphabetical order", "By rating", "By release date"]}
        onSelect={(val) => console.log("Sort by:", val)}
      />

      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={search}
        onChangeText={setSearch}
      />

      <TouchableOpacity style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      <FlatList
        data={listMovie}
        renderItem={renderMovie}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        ListFooterComponent={
          <TouchableOpacity style={styles.loadMore}>
            <Text style={styles.loadMoreText}>Load More</Text>
          </TouchableOpacity>
        }
      />

      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Icon name="home" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="bookmark" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default MovieApp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  logo: {
    height: 50,
    alignSelf: "center",
    marginBottom: 20,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  optionText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: "#eee",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  searchButtonText: {
    fontSize: 16,
    color: "#555",
  },
  movieCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    elevation: 2,
  },
  poster: {
    width: 80,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  date: {
    color: "gray",
    marginVertical: 4,
  },
  description: {
    color: "#333",
  },
  loadMore: {
    backgroundColor: "#00AEEF",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
  },
  loadMoreText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#002B5B",
    paddingVertical: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
})
