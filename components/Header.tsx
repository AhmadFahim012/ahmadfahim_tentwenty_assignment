import { EvilIcons, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface HeaderProps {
  title: string;
  onSearchPress?: () => void;
  showBackButton?: boolean;
  onBackPress?: () => void;
  handleSearch?: (text: string) => void;
  searchText?: string;
  setSearchText?: (text: string) => void;
  searchMode?: boolean;
}

export default function Header({
  title,
  onSearchPress,
  showBackButton,
  onBackPress,
  searchMode,
  handleSearch,
  searchText,
  setSearchText,
}: HeaderProps) {
  return (
    <>
      <StatusBar style="dark" backgroundColor="white" />
      <View style={styles.container}>
        {showBackButton && (
          <TouchableOpacity onPress={onBackPress}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
        )}
        {!searchMode && <Text style={styles.title}>{title}</Text>}
        <TouchableOpacity onPress={onSearchPress}>
          {!searchMode ? (
            <Ionicons name="search" size={22} color="#000" />
          ) : (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#F2F2F6",
                  borderRadius: 100,
                  paddingHorizontal: 12,
                  borderWidth: 1,
                  borderColor: "#E0E0E0",
                  height: 52,
                  width: '100%',
                }}
              >
                <Ionicons name="search" size={14} color="#000" />
                <TextInput
                  placeholder="TV shows, movies and more"
                  value={searchText}
                  onChangeText={handleSearch}
                  style={styles.searchInput}
                  autoFocus
                  placeholderTextColor='#202C434D'
                  selectionColor="#61C3F2" 
                />
                <EvilIcons name="close" size={24} color="black" />
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#fff",
    marginBlockStart: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
  },
  title: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
  },
  searchInput: {
    paddingHorizontal: 12,
    flex: 1,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#202C43",
  },
});
