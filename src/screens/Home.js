import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator, RefreshControl } from 'react-native';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import StatusBar from '../components/StatusBar';
import useAuth from '../hooks/useAuth';
import { getImages } from '../api/user';

import colors from '../styles/colors';

export default function Home() {

    const { auth } = useAuth();

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {

        loadImages();

    }, []);

    const onRefresh = useCallback(() => {

        setRefreshing(true);
        loadImages();


    }, []);

    const loadImages = async () => {

        setRefreshing(false);
        setLoading(true);

        try {

            const response = await getImages(auth);
            setImages(response);
            setLoading(false);

        } catch (error) {
            setLoading(false);
        }
    }

    return (
        <>
            <StatusBar backgroundColor={colors.dark} barStyle={'light-content'} />
            <View style={styles.container}>
                {loading ?
                    <ActivityIndicator size='large' color={colors.dark} />
                    :
                    <FlatList
                        data={images}
                        style={styles.list}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(dataImage) => <RenderImages dataImage={dataImage} />}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    />
                }
            </View>
        </>
    )
}

function RenderImages(props) {

    const { dataImage } = props;
    const { index } = dataImage;
    const { title, description, image } = dataImage.item;

    return (

        <View
            key={index}
            style={styles.listContainer}
        >
            <View style={styles.infoContainer}>
                <View style={styles.infoDetail}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
                <Image
                    key={image}
                    source={{ uri: `${image}?rand=${Math.random() * (1 - 100) + 1}` }}
                    indicator={ProgressBar}
                    style={{ aspectRatio: 1 }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    list: {
        paddingTop: 10
    },
    listContainer: {
        alignItems: 'center'
    },
    infoContainer: {
        borderWidth: 1,
        borderColor: "#dddddd",
        width: "95%",
        marginBottom: 20
    },
    infoDetail: {
        marginHorizontal: 5
    },
    title: {
        fontWeight: 'bold',
        marginVertical: 5
    },
    description: {
        marginBottom: 10,
        fontSize: 12,
        textAlign: 'justify'
    }
})