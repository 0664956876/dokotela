import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";

export default function DetailScreen({ route }) {
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <ActivityIndicator size="large" color="blue" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff", flex: 1 },
  image: { width: 200, height: 200, alignSelf: "center", marginBottom: 16 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 8, textAlign: "center" },
  price: { fontSize: 16, color: "green", marginBottom: 8, textAlign: "center" },
  description: { fontSize: 14, lineHeight: 20, textAlign: "justify" },
});
