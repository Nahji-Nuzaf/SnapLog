import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Platform,
    StatusBar as RNStatusBar,
    Dimensions,
    ScrollView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Carousel from 'react-native-reanimated-carousel';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { useLanguage } from '../LanguageContext';
import { useForm } from '../FormContext';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
    const navigation = useNavigation<any>();
    const { t, language, setLanguage } = useLanguage();
    const { formData } = useForm();

    const images = [
        formData.image1,
        formData.image2,
        formData.image3
    ].filter(img => img !== null) as string[];

    if (images.length === 0) {
        images.push("https://via.placeholder.com/400x600/D3D3D3/808080?text=No+Image");
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
                                <Text style={styles.tagText}>{t(tagKey as any) || "Label"}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>

            <View style={styles.footer}>
                <View style={{ flex: 1 }} />

                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate('WizardRoute', { step: 1, nextRoute: 'WizardRoute' })}
                >
                    <Text style={styles.buttonText}>EDIT</Text>
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
        marginLeft: '2.5%',
    },
    cardImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    tagsContainer: {
        marginTop: 30,
        paddingHorizontal: 20,
        height: 50,
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
        paddingBottom: 30
    },
    editButton: {
        width: 150,
        backgroundColor: '#D3D3D3',
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center'
    },
    buttonText: {
        fontWeight: '600',
        fontSize: 16
    },
});