import { getMovieDetails } from "@/api/movies";
import { formatDate } from "@/lib/formatData";
import { Movie } from "@/types/movie";
import Entypo from "@expo/vector-icons/Entypo";
import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  const { width, height } = useWindowDimensions();
const isLandscape = width > height;

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    try {
      const data = await getMovieDetails(id);
      setMovie(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !movie) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, {flexDirection: isLandscape ? 'row' : 'column'}]}>
      <ImageBackground
        source={{
          uri: `${process.env.EXPO_PUBLIC_IMAGE_BASE_URL}${movie.backdrop_path}`,
        }}
        style={styles.backdrop}
      >
        <View style={{ position: "absolute", top: 50, left: 20 }}>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => router.back()}
          >
            <Entypo name="chevron-left" size={24} color="white" />
            <Text style={{ color: "white", marginLeft: 8, fontFamily:'Poppins_500Medium' }}>Back</Text>
          </TouchableOpacity>
        </View>
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.9)"]}
          style={{width: "100%", alignItems: "center", justifyContent:'flex-end', height: 359}}
        >
          <View
            style={{
              width: 243,
              alignItems: "center",
              marginBottom: 20,
              gap: 10,
              justifyContent: "center",
            }}
          >
            <Text style={styles.title}>
              In Theaters {formatDate(movie.release_date)}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                router.push({ pathname: "/movies/trailer", params: { id } })
              }
            >
              <Text style={styles.buttonText}>Get Tickets</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "transparent" }]}
              onPress={() =>
                router.push({ pathname: "/movies/trailer", params: { id } })
              }
            >
              <Entypo name="controller-play" size={24} color="white" />
              <Text style={styles.buttonText}>Watch Trailer</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
      <View style={styles.content}>
        {movie?.genres?.length > 0 && (
          <View>
            <Text style={styles.subtitle}>Genres</Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              {movie?.genres?.map((genre, index) => {
                const colors = ["#15D2BC", "#E26CA5", "#564CA3", "#CD9D0F"];
                const bgColor = colors[index % colors.length];
                return (
                  <Text
                    style={[styles.genreText, { backgroundColor: bgColor }]}
                    key={genre?.id}
                  >
                    {genre.name}
                  </Text>
                );
              })}
            </View>
          </View>
        )}

        <View
          style={{
            height: 1,
            backgroundColor: "#F6F6FA",
            width: "100%",
            marginVertical: 20,
          }}
        />
        <Text style={styles.subtitle}>Overview</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    width: "100%",
    minHeight: 500,
    justifyContent: "flex-end",
    alignItems: "center",
    resizeMode: "cover",
    position: "relative",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    color: "white",
    marginBottom: 6,
    fontFamily: "Poppins_500Medium",
  },
  subtitle: {
    fontSize: 16,
    color: "#202C43",
    marginBottom: 10,
    fontFamily: "Poppins_500Medium",
  },
  overview: {
    fontSize: 12,
    color: "#8F8F8F",
    lineHeight: 22,
    marginBottom: 20,
    fontFamily: "Poppins_400Regular",
  },
  button: {
    backgroundColor: "#61C3F2",
    borderWidth: 1,
    borderColor: "#61C3F2",
    padding: 12,
    borderRadius: 10,
    width: 243,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  genreText: {
    color: "white",
    backgroundColor: "red",
    paddingHorizontal: 10,
    borderRadius: 20,
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    flexWrap: "wrap",
    height:24,
    textAlignVertical:'center'
  },
});
