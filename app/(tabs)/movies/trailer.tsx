import { getMovieVideos } from "@/api/movies";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export default function MovieTrailerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlayVideo, setIsPlayVideo] = useState(false);

  useEffect(() => {
    loadTrailer();
  }, [id]);

  useEffect(() => {
    if (videoKey) {
      setIsPlayVideo(true);
    }
  }, [videoKey]);

  const loadTrailer = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getMovieVideos(id);

      if (!data || !data.results || data.results.length === 0) {
        setError("No trailer available!");
        setLoading(false);
        return;
      }

      const trailer =
        data.results.find(
          (v: any) => v.type === "Trailer" && v.site === "YouTube"
        ) ||
        data.results.find(
          (v: any) => v.type === "Teaser" && v.site === "YouTube"
        ) ||
        data.results.find((v: any) => v.site === "YouTube");

      if (trailer && trailer.key) {
        setVideoKey(trailer.key);
      } else {
        setError("No YouTube trailer found!");
      }
    } catch (err) {
      console.log("Error loading trailer", err);
      setError("Failed to load trailer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onStateChange = useCallback((state: string) => {
    if (state === "ended") {
      router.back();
    }
  }, []);

  const onError = useCallback((err: string) => {
    setError("Error playing video");
  }, []);

  const handleDone = useCallback(() => {
    router.back();
  }, []);

    const handlePlayerReady = useCallback(() => {
    setIsPlayVideo(true);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading trailer...</Text>
      </View>
    );
  }

  if (error || !videoKey) {
    return (
      <View style={styles.errorContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <Text style={styles.errorText}>{error || "Trailer not found"}</Text>
        <TouchableOpacity style={styles.errorButton} onPress={handleDone}>
          <Text style={styles.errorButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>

      <View style={styles.playerWrapper}>
        <YoutubePlayer
          height={300}
          play={isPlayVideo}
          mute={true}
          videoId={videoKey}
          onChangeState={onStateChange}
          forceAndroidAutoplay={true}
          onError={onError}
           onReady={handlePlayerReady}
          initialPlayerParams={{
            preventFullScreen: false,
            controls: true,
            mute: true,
            start: 1,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  errorText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 24,
  },
  errorButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  errorButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
  playerWrapper: {
    width: "100%",
    backgroundColor: "#000",
  },
  doneButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    zIndex: 10,
  },
  doneText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
});
