// Favorites.js
import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import MovieCardFav from '../components/movieCardFav.js';

const Favorites = () => {
  const { favoriteMovies } = useSelector((state) => state.movieList);

  return (
    <View style={styles.container}>
      {favoriteMovies.length === 0 ? (
        <Text style={styles.emptyText}>No favorite movies yet</Text>
      ) : (
        <FlatList
          data={favoriteMovies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieCardFav
              title={item.title}
              posterPath={`https://image.tmdb.org/t/p/w500${item.posterPath}`}
              rating={item.rating}
              releaseDate={item.releaseDate}
              movie={item}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#1A1E21',
  },
  emptyText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Favorites;
