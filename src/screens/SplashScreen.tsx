import React, { useEffect } from "react";
import {
    Image,
    StatusBar,
    Text,
    View,
    StyleSheet,
    useColorScheme
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

export default function SplashScreen() {
    const navigation = useNavigation<SplashScreenNavigationProp>();
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace("WizardRoute", { step: 1, nextRoute: 'WizardRoute' });
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
            <StatusBar hidden={true} />

            <View style={styles.logoContainer}>
                <Image
                    source={require("../../assets/SnapLog-light.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Developed By: Nahji Nuzaf</Text>
                <Text style={styles.footerText}>Version: 1.0.0</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF", 
    },
    containerDark: {
        backgroundColor: "#030712", 
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        height: 100, 
        width: 130,
    },
    footer: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        bottom: 48,
    },
    footerText: {
        color: "#64748b",
        fontWeight: "600",
        fontSize: 14,
    },
});