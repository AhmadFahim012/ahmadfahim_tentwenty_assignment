import { getUpcomingMovies, searchMovies } from "@/api/movies";
import Header from "@/components/Header";
import MovieCard from "@/components/MovieCard";
import SearchedMovieCard from "@/components/SearchedMovieCard";
import { Movie } from "@/types/movie";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function MovieListScreen() {
  const [searchMode, setSearchMode] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchedMovies, setSearchedMovies] = useState<Movie[]>([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    const data = await getUpcomingMovies();
    setMovies(data);
    setLoading(false);
  };

  const handleSearch = async (text: string) => {
    setSearchText(text);
    if (text.trim().length === 0) return;
    setLoading(true);
    const results = await searchMovies(text);
    setSearchedMovies(results);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Watch"
        handleSearch={handleSearch}
        setSearchText={setSearchText}
        searchText={searchText}
        searchMode={searchMode}
        onSearchPress={() => setSearchMode(!searchMode)}
      />

      {searchMode ? (
        <>
          {searchText.length === 0 ? (
            searchText ? (
              <Text style={styles.placeholderText}>
                No movie found against the search term. Please try a different
                one.
              </Text>
            ) : (
              <Text style={styles.placeholderText}>Search for a movie...</Text>
            )
          ) : loading ? (
            <ActivityIndicator style={{ marginTop: 30 }} />
          ) : (
            <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
              <Text style={{ fontSize: 14, fontFamily: "Poppins_500Medium" }}>
                Top Results:
              </Text>
              <View
                style={{
                  height: 1,
                  borderBottomColor: "#eee",
                  borderBottomWidth: 1,
                  marginVertical: 8,
                }}
              />
              <FlatList
                data={searchedMovies}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 200 }}
                renderItem={({ item }) => (
                  <SearchedMovieCard
                    movie={item}
                    onPress={() => router.push(`/movies/${item.id}`)}
                  />
                )}
              />
            </View>
          )}
        </>
      ) : loading ? (
        <ActivityIndicator style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              onPress={() => router.push(`/movies/${item.id}`)}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6FA",
    marginTop: 10,
  },
  list: {
    padding: 20,
  },
  searchInput: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  placeholderText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#87878aff",
    textAlign: "center",
    marginTop: 20,
    maxWidth: 300,
    alignSelf: "center",
  },
});
