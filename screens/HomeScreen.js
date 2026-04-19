import { View, Text, StyleSheet,posts,TouchableOpacity } from "react-native";
import { COLORS } from "../utils/colors";
import { useEffect } from "react";
import { useState } from "react";
import { apiClient } from "../utils/api";

export default function HomeScreen() {
  const [post,setPost] = useState([]);
  const [pagination,setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalCount: 0,
    limit: 5,
  });

  useEffect(async () => {
    const response = await apiClient.get("/posts");
    console.log("post fetched:",Response.data.data.posts);
    setposts(response.data.data.posts);
    setpagination(response.data.data.pagination);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Posts Feed</Text>
      {posts.length > 0 ? (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.postCard}>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text style={styles.postContent}>{item.content}</Text>
            </View>
          )}
          scrollEnabled={true}
        />
      ) : (
        <Text style={styles.emptyText}>
          No posts yet. Start by creating one!
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 12,
  },
  body: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
});
