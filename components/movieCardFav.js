import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { removeFavorite } from '../redux/slices/movieListSlice.jsx';

const MovieCardFav = ({ title, posterPath, rating, releaseDate, movie }) => {
  const dispatch = useDispatch();

  const handleRemoveFavorite = () => {
    dispatch(removeFavorite(movie));
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: posterPath }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.details}>
          <Text style={styles.rating}>Rating: {rating}</Text>
          <Text style={styles.releaseDate}>Release Date: {releaseDate}</Text>
        </View>
        <TouchableOpacity style={styles.removeButton} onPress={handleRemoveFavorite}>
          <Ionicons name="trash-outline" size={24} color="white" />
          <Text style={styles.removeButtonText}>Remove from Favorites</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#2B2B2B',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: "40%",
    height: 250,
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: 5,
  },
  rating: {
    color: 'white',
    fontSize: 14,
  },
  releaseDate: {
    color: 'white',
    fontSize: 14,
  },
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#FF5C5C',
    borderRadius: 5,
    marginTop: 15,
  },
  removeButtonText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 14,
  },
});

export default MovieCardFav;
