import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Platform, StatusBar as RNStatusBar } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../LanguageContext';
import { useForm } from '../FormContext';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

export default function DetailsScreen() {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const { t } = useLanguage();
    const { formData, updateFormData } = useForm();

    const [showDatePicker, setShowDatePicker] = useState(false);

    const onDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            updateFormData('date', selectedDate);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>{t('detailsTitle')}</Text>

                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.input}
                        placeholder={t('location')}
                        value={formData.location}
                        onChangeText={(text) => updateFormData('location', text)}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder={t('description')}
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                        value={formData.description}
                        onChangeText={(text) => updateFormData('description', text)}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
                        <Text style={{ color: '#333', marginTop: 4 }}>
                            {formData.date ? formData.date.toDateString() : t('date')}
                        </Text>
                    </TouchableOpacity>
                </View>

                {showDatePicker && (
                    <DateTimePicker value={formData.date} mode="date" display="default" onChange={onDateChange} />
                )}
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={[styles.button, styles.prevButton]} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>{t('previous')}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.nextButton]}
                    onPress={() => {
                        console.log("FINAL DATA:", formData);
                        navigation.navigate('Showcase');
                    }}
                >
                    <Text style={styles.buttonText}>{t('next')}</Text>
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
    content: {
        flex: 1,
        padding: 20
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 20,
        marginTop: 10
    },
    inputGroup: {
        marginBottom: 15,
        backgroundColor: '#EAE6F0',
        borderRadius: 4
    },
    input: {
        padding: 15,
        fontSize: 16,
        color: '#333'
    },
    textArea: {
        height: 150
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
    nextButton: {
        backgroundColor: '#D3D3D3',
        marginLeft: 10
    },
    buttonText: {
        fontWeight: '600',
        fontSize: 16
    }
});
