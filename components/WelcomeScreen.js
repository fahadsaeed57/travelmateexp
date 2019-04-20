import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, StatusBar } from 'react-native';
import { Button, Text } from 'native-base';
import LogoAnimation from '../components/LogoAnimation'
import FadeInView from '../components/FadeInView';
import { FluidNavigator, Transition } from 'react-navigation-fluid-transitions';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';

export default class WelcomeScreen extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#6FB9F7' }}>
                   <StatusBar  backgroundColor={'transparent'} translucent />
                <ImageBackground style={{flex:1}}key={'img1'} source={require('../assets/bg.png')}>

                


                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <LogoAnimation>
                            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 45 }}>Travel Mate</Text>
                        </LogoAnimation>
                    </View>
                    <View style={{ marginBottom: 15, alignItems: 'center' }}>
                        <FadeInView style={{ flexDirection: 'row' }}>
                        
                            <Button style={styles.button} block onPress={() => this.props.navigation.navigate('SignInScreen')}>
                                <Text style={styles.buttonText}>LOGIN</Text>
                            </Button>
                        
                            <Text> {"\n"}</Text>
                            <Button style={styles.button} block onPress={() => this.props.navigation.navigate('SignUpScreen')}>
                                <Text style={styles.buttonText}>Sign Up</Text>
                            </Button>
                           
                        </FadeInView>
                    </View>
 
                </ImageBackground>
             


            </View>
        )
    }
}
const styles = StyleSheet.create({
    scene: { flex: 1 },
    buttonText: {
        color: 'black'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(237, 236, 236, 0.8)',
        borderRadius: 5,
        width: 130,
        borderColor: 'white',
        margin: 10
    },
    textStyle: {
        color: 'white',
        paddingTop: 10,
        fontSize: 12,
        fontWeight: 'bold'
    },
    underlineStyle: {
        backgroundColor: '#EA0000'
    },
    tabBar: {
        backgroundColor: '#131313'
    },

})