import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

interface MovieCardProps {
  movie: any;
  onPress?: () => void;
}

export default function MovieCard({ movie, onPress }: MovieCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{
          uri: `${process.env.EXPO_PUBLIC_IMAGE_BASE_URL}${movie.poster_path}`,
        }}
        style={styles.poster}
      />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.9)"]} 
          style={styles.info}
        >
          <Text style={styles.title}>{movie.title}</Text>
        </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 8,
    overflow: "hidden",
    elevation: 2,
    position: "relative",
  },
  poster: {
    width: "100%",
    height: 220,
  },
  info: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 70,
  },
  title: {
    fontSize: 16,
    color: "#fff",
    fontFamily: 'Poppins_500Medium',
  },
  date: {
    color: "#777",
    marginTop: 4,
  },
});
