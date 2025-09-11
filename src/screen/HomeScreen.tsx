import { useEffect, useState } from "react"
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Dropdown from "../component/Dropdown"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { getListMovieByCategory, getMoreMovieByPage, Movie, setSelectedCategory } from "../redux/slices/movie"
import Loading from "../component/Loading"
import { HeaderImage } from "../component/HeaderImage"
import { SafeAreaView } from "react-native-safe-area-context"

type RootStackParamList = {
  Main: undefined
  Detail: { movie: Movie }
}

const MovieApp = () => {
  const [search, setSearch] = useState("")
  const selectedCategory = useAppSelector(state => state.movie.selectedCategory)
  const listMovie = useAppSelector(state => state.movie.lists)
  const loading = useAppSelector(state => state.movie.loading)
  const dispatch = useAppDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const categoryOptions = [
    {
      id: 1,
      name: 'Now Playing',
      value: 'now_playing'
    },
    {
      id: 2,
      name: 'Upcoming',
      value: 'upcoming'
    },
    {
      id: 3,
      name: 'Popular',
      value: 'popular'
    }
  ]

  const sortOptions = [
    {
      id: 1,
      name: 'By alphabetical order',
      value: 'alpha'
    },
    {
      id: 2,
      name: 'By rating',
      value: 'rating'
    },
    {
      id: 3,
      name: 'By release date',
      value: 'release-date'
    }
  ]

  useEffect(() => {
    dispatch(getListMovieByCategory({ category: selectedCategory, page: 1 }))
  }, [selectedCategory])

  const onPressItem = (item: Movie) => {
    navigation.navigate('Detail', { movie: item })
  }

  const renderMovie = ({ item }: { item: Movie }) => (
    <TouchableOpacity style={styles.movieCard} onPress={() => onPressItem(item)}>
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
    </TouchableOpacity>
  )

  const loadMore = () => {
    dispatch(getMoreMovieByPage({}))
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderImage />

      <Dropdown
        label="Now Playing"
        options={categoryOptions}
        onSelect={(val) => dispatch(setSelectedCategory(val))}
        type="category"
      />

      <Dropdown
        label="Sort by"
        options={sortOptions}
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
          loading
            ?
            <Loading style={styles.loadMore} />
            :
            <TouchableOpacity style={styles.loadMore} onPress={loadMore}>
              <Text style={styles.loadMoreText}>Load More</Text>
            </TouchableOpacity>
        }
      />
    </SafeAreaView>
  )
}

export default MovieApp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 20,
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
