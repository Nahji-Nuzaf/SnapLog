import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Image, Alert, Platform, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from "react-native-safe-area-context";

import { useLanguage } from '../LanguageContext';
import { useForm } from '../FormContext';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'WizardRoute'>;

export default function WizardScreen2({ route }: Props) {
    const { step, nextRoute } = route.params;

    const navigation = useNavigation<any>();
    const { language, setLanguage, t } = useLanguage();
    const { formData, updateFormData } = useForm();

    const [modalVisible, setModalVisible] = useState(false);

    const imageKey = `image${step}` as 'image1' | 'image2' | 'image3';
    const currentImage = formData[imageKey];

    const getLangLabel = () => {
        if (language === 'si') return 'සිංහල';
        if (language === 'ta') return 'தமிழ்';
        return 'English';
    };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(t('permissionDenied'), t('permissionMessage'));
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true, quality: 1,
        });
        if (!result.canceled) {
            updateFormData(imageKey, result.assets[0].uri);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />

            <View style={styles.header}>
                <TouchableOpacity style={styles.langDropdown} onPress={() => setModalVisible(true)}>
                    <Text style={styles.langText}>{getLangLabel()}</Text>
                    <Ionicons name="caret-down" size={12} color="#333" style={{ marginLeft: 5 }} />
                </TouchableOpacity>
            </View>

            <View style={styles.contentContainer}>
                <Text style={styles.title}>
                    {step === 1 ? t('addImage1') : step === 2 ? t('addImage2') : t('addImage3')}
                </Text>

                <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
                    {currentImage ? (
                        <Image source={{ uri: currentImage }} style={styles.previewImage} />
                    ) : (
                        <View style={styles.placeholderContent}>
                            <Ionicons name="image-outline" size={64} color="#999" />
                            <Text style={styles.placeholderText}>{t('selectFromGallery')}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                {step > 1 && (
                    <TouchableOpacity style={[styles.navButton, styles.prevButton]} onPress={() => navigation.goBack()}>
                        <Text style={styles.navButtonText}>{t('previous')}</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    style={[styles.navButton, styles.nextButton]}
                    onPress={() => {
                        if (step === 1) {
                            navigation.push('WizardRoute', { step: 2, nextRoute: 'WizardRoute' });
                        } else if (step === 2) {
                            navigation.push('WizardRoute', { step: 3, nextRoute: 'Details' });
                        } else {
                            navigation.navigate('Details');
                        }
                    }}
                >
                    <Text style={styles.navButtonText}>{t('next')}</Text>
                </TouchableOpacity>
            </View>

            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setModalVisible(false)}>
                    <View style={styles.modalContent}>
                        <View style={styles.dragHandle} />
                        <Text style={styles.modalTitle}>{t('selectLanguage')}</Text>
                        <TouchableOpacity style={styles.languageOption} onPress={() => { setLanguage('en'); setModalVisible(false); }}><Text style={styles.optText}>English</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.languageOption} onPress={() => { setLanguage('si'); setModalVisible(false); }}><Text style={styles.optText}>සිංහල</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.languageOption} onPress={() => { setLanguage('ta'); setModalVisible(false); }}><Text style={styles.optText}>தமிழ்</Text></TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
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
        padding: 20
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 20
    },
    imageContainer: {
        flex: 1,
        backgroundColor: '#E0E0E0',
        borderRadius: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    placeholderContent: {
        alignItems: 'center'
    },
    placeholderText: {
        marginTop: 15,
        color: '#888'
    },
    previewImage: {
        width: '100%',
        height: '100%'
    },
    footer: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between',
        paddingBottom: 30
    },
    navButton: {
        flex: 1,
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center'
    },
    prevButton: {
        backgroundColor: '#D3D3D3',
        marginRight: 10
    },
    nextButton: {
        backgroundColor: '#D3D3D3',
        marginLeft: 10
    },
    navButtonText: {
        fontSize: 16,
        fontWeight: '600'
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'flex-end'
    },
    modalContent: {
        backgroundColor: '#F2F2F7',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        minHeight: 250,
        alignItems: 'center'
    },
    dragHandle: {
        width: 40,
        height: 4,
        backgroundColor: '#CCC',
        borderRadius: 2,
        marginBottom: 20
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 20
    },
    languageOption: {
        width: '100%',
        padding: 15,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#DDD',
        backgroundColor: '#D3D3D3',
        marginBottom: 2
    },
    optText: {
        fontSize: 16
    }
});