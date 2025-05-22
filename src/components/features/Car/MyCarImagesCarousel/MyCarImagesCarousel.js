import React from 'react';
import { View, Image, StyleSheet, Dimensions  } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

const { width, height } = Dimensions.get('window');

const MyCarImagesCarousel = ({images}) => {

    return (
        <View style={styles.carouselContainer}>
            <SwiperFlatList
                autoplay
                autoplayDelay={2}
                showPagination
                data={images}
                renderItem={({ item }) => (
                    <View style={styles.slide}>
                        <Image
                            source={{ uri: item }}
                            style={styles.image}
                        />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    carouselContainer: {
      height: 400,
      width: width,
    },
    slide: {
        width: width,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        resizeMode: 'cover'
    },
});

export default MyCarImagesCarousel;
