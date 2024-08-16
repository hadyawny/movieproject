import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Modal, Button ,TouchableWithoutFeedback, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchNowPlayingMovies, fetchTopRatedMovies, fetchTrendingMovies } from "../redux/slices/movieListSlice.jsx";
import MovieCard from "../components/movieCard.js";
import { Ionicons } from "@expo/vector-icons";

const Home = () => {
    const { trendingMovies, topRatedMovies, nowPlayingMovies, isLoading, error } = useSelector((state) => state.movieList);
    const dispatch = useDispatch();
    
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('Trending'); // Default filter
    const [modalVisible, setModalVisible] = useState(false); // Control modal visibility

    // Fetch appropriate movie list based on the filter
    useEffect(() => {
        if (filter === 'Trending') {
            dispatch(fetchTrendingMovies());
        } else if (filter === 'Top Rated') {
            dispatch(fetchTopRatedMovies());
        } else if (filter === 'Now Playing') {
            dispatch(fetchNowPlayingMovies());
        }
    }, [filter, dispatch]);

    // Set movie list based on filter and search query
    const getMovies = () => {
        let movies = [];
        if (filter === 'Trending') {
            movies = trendingMovies;
        } else if (filter === 'Top Rated') {
            movies = topRatedMovies;
        } else {
            movies = nowPlayingMovies;
        }

        // Filter movies based on the search query
        if (searchQuery) {
            movies = movies.filter((movie) => 
                movie.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return movies;
    };

    const handleSearch = (text) => {
        setSearchQuery(text);
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={styles.loadingText}>Loading Movies...</Text>
            </View>
        );
    }

    if (error) {
        return <Text style={styles.errorText}>Error: {error}</Text>;
    }

    return (
        <View style={styles.container}>
            {/* Search and Filter Section */}
            <View style={styles.searchFilterContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search Movies..."
                    value={searchQuery}
                    onChangeText={handleSearch}
                    placeholderTextColor="white"
                />
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.filterButton}>
                    <Ionicons name="filter" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Movie List */}
            <FlatList
                data={getMovies()}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <MovieCard 
                        title={item.title} 
                        movie={item}
                        posterPath={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`
                        
                    }
                    />
                )}
            />

            {/* Modal for Filter Selection */}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                {/* Handle click outside to close modal */}
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalContainer}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                                <Text style={{ color: "white" }}>Select Movie Category:</Text>
                                <Button title="Trending" onPress={() => { setFilter('Trending'); setModalVisible(false); }} />
                                <Button title="Top Rated" onPress={() => { setFilter('Top Rated'); setModalVisible(false); }} />
                                <Button title="Now Playing" onPress={() => { setFilter('Now Playing'); setModalVisible(false); }} />
                                <Button title="Cancel" onPress={() => setModalVisible(false)} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor:'#1A1E21'
    },
    searchFilterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
        color: 'white',
        
        
    },
    filterButton: {
        backgroundColor: '#2B2B2B',
        padding: 10,
        borderRadius: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: '#2B2B2B',
        borderRadius: 10,
        color: 'white',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1A1E21',
    },
    loadingText: {
        color: 'white',
        marginTop: 10,
        fontSize: 18,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default Home;
