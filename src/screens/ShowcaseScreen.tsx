import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Platform,
    StatusBar as RNStatusBar,
    Dimensions,
    ScrollView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Carousel from 'react-native-reanimated-carousel';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../LanguageContext';
import { useForm } from '../FormContext';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get('window');

export default function ShowcaseScreen() {
    const navigation = useNavigation<any>();
    const { t, language } = useLanguage();
    const { formData } = useForm();

    const images = [
        formData.image1,
        formData.image2,
        formData.image3
    ].filter(img => img !== null) as string[];

    if (images.length === 0) {
        images.push("https://via.placeholder.com/400x600/CCCCCC/999999?text=No+Image");
    }

    const tags = ['label1', 'label2', 'label3', 'label4', 'label5'];

    const getLangLabel = () => {
        if (language === 'si') return 'සිංහල';
        if (language === 'ta') return 'தமிழ்';
        return 'English';
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />

            <View style={styles.header}>
                <TouchableOpacity style={styles.langDropdown}>
                    <Text style={styles.langText}>{getLangLabel()}</Text>
                    <Ionicons name="caret-down" size={12} color="#333" style={{ marginLeft: 5 }} />
                </TouchableOpacity>
            </View>

            <View style={styles.contentContainer}>
                <Text style={styles.title}>{t('showcaseTitle')}</Text>

                <View style={{ height: 450, alignItems: 'center' }}>
                    <Carousel
                        loop={false}
                        width={width * 0.85}
                        height={450}
                        data={images}
                        scrollAnimationDuration={1000}
                        mode="parallax"
                        modeConfig={{
                            parallaxScrollingScale: 0.9,
                            parallaxScrollingOffset: 50,
                        }}
                        renderItem={({ item }) => (
                            <View style={styles.cardContainer}>
                                <Image source={{ uri: item }} style={styles.cardImage} />
                            </View>
                        )}
                    />
                </View>

                <View style={styles.tagsContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {tags.map((tagKey, index) => (
                            <View key={index} style={styles.tag}>
                                <Text style={styles.tagText}>{t(tagKey as any)}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={[styles.button, styles.prevButton]} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>{t('previous')}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.finishButton]}
                    onPress={() => {
                        navigation.navigate('Home');
                    }}
                >
                    <Text style={styles.buttonText}>{t('finish')}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'flex-end'
    },
    langDropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E0E0E0',
        padding: 8,
        borderRadius: 6
    },
    langText: {
        fontSize: 14,
        fontWeight: '500'
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 20,
        paddingHorizontal: 20
    },
    cardContainer: {
        flex: 1,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#E0E0E0',
        marginLeft: '2.5%'
    },
    cardImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    tagsContainer: {
        marginTop: 30,
        paddingHorizontal: 20,
        height: 50
    },
    tag: {
        backgroundColor: '#E6E0F5',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginRight: 10,
        justifyContent: 'center'
    },
    tagText: {
        color: '#4A4A4A',
        fontWeight: '500'
    },
    footer: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between',
        paddingBottom: 30
    },
    button: {
        flex: 1,
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center'
    },
    prevButton: {
        backgroundColor: '#D3D3D3',
        marginRight: 10
    },
    finishButton: {
        backgroundColor: '#D3D3D3',
        marginLeft: 10
    },
    buttonText: {
        fontWeight: '600',
        fontSize: 16
    }
});
