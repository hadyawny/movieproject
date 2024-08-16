import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { addFavorite } from '../redux/slices/movieListSlice.jsx';

const MovieCard = ({ title, posterPath, movie }) => {
  const dispatch = useDispatch();

  const handleAddFavorite = () => {
    dispatch(addFavorite({
      id: movie.id,
      title: movie.title,
      posterPath: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      rating: movie.vote_average,
      releaseDate: movie.release_date
      
    }));
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: posterPath }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={handleAddFavorite}>
          <Ionicons name="heart-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    card: {
      flexDirection: 'column',
      marginBottom: 10,
      backgroundColor: '#2B2B2B',
      borderRadius: 8,
      overflow: 'hidden',
    },
    image: {
      width: "100%",
      height: 250,
    },
    info: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-between',
      padding: 10,
    },
    title: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default MovieCard;
