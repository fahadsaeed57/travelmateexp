import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, FlatList ,BackHandler,Alert,AsyncStorage} from 'react-native';

import { Button } from 'native-base';
import CardView from '../components/CardView';
import axios from 'axios';
import { Bubbles } from 'react-native-loader';
import Loader from '../components/Loader';
export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = { loading: true,user:''}
    }
    componentDidMount(){
           this._retrieveData();
    }
    _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('userData');
        this.setState({user:JSON.parse(value)});
        
       } catch (error) {
         alert(error);
       }
    } 
   
     

    render() {
        
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#6FB9F7"
                    barStyle="light-content"
                />

                    <Button block info onPress={()=>{this.props.navigation.navigate('SearchScreen',this.state.user)}}>
                        <Text style={{color:'white'}}>Travel Guide</Text>
                    </Button>
                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin:10
    }

})