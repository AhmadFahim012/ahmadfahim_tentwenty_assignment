import { Entypo } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

interface MovieCardProps {
  movie: any;
  onPress?: () => void;
}

export default function SearchedMovieCard({ movie, onPress }: MovieCardProps) {
  return (
    <>
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{
          uri: `${process.env.EXPO_PUBLIC_IMAGE_BASE_URL}${movie.poster_path}`,
        }}
        style={styles.poster}
      />
      <Text style={styles.title} numberOfLines={1} >{movie.title}</Text>
      <Entypo name="dots-three-horizontal" size={24} color="#61C3F2" />

    </TouchableOpacity>
    </>

  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
    flex: 1,
    gap: 12,
  },
  poster: {
    width: 130,
    height: 100,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    color: "#000",
    fontFamily: "Poppins_500Medium",
    maxWidth: '40%',
  },
  date: {
    color: "#777",
    marginTop: 4,
  },
});
