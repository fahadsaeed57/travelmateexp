import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar,ImageBackground, ToastAndroid,ScrollView,RefreshControl, FlatList ,BackHandler,TouchableHighlight,Alert,AsyncStorage} from 'react-native';

import { Container, Header, Button, Icon, Fab, Toast } from 'native-base';
import CardView from '../components/CardView';
import axios from 'axios';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { Bubbles } from 'react-native-loader';
import Loader from '../components/Loader';
export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {  active: 'true',loading: true,user:'',mostViewed:[],remcommended:[],myPosts:[],topViewedLocations:''}
    }
    componentWillMount(){
        this.subs = [
            this.props.navigation.addListener('didFocus', this._retrieveData),
            
          ];
           this._retrieveData();
           this.fetchPosts();
           this.fetchTopLocations();
           
    }
    
    componentWillUnmount(){
        this.subs.forEach(sub => sub.remove());
    }
    _retrieveData = async () => {
        this.fetchTopLocations();
      try {
        const value = await AsyncStorage.getItem('userData');
        this.setState({user:JSON.parse(value)});
        
       } catch (error) {
         alert(error);
       }
    } 
    fetchPosts()
    {   
        var mostViewed = []
        var remcommended = []
        var myPosts = []
        this.setState({loading:true})
        axios.get(`https://picsum.photos/list`).then(res => {
            for(var i = res.data.length;i>954;i--){
                    if(i < 970) {
                        mostViewed.push(res.data[i])
                    }
                    else if(i < 978 && i > 970) {
                        remcommended.push(res.data[i])
                    }
                    else{
                        myPosts.push(res.data[i])
                    }
            }
            // alert(JSON.stringify(myPosts))
            this.setState({mostViewed: mostViewed ,remcommended:remcommended,myPosts:myPosts, loading:false});
        }).catch((error)=>{
            this.setState({loading:true})
            ToastAndroid.show('Some thing went wrong', ToastAndroid.LONG);
        })
    }
    fetchTopLocations(){
        const LIMIT = 5;
        axios.get(`http://wasayhere-002-site1.itempurl.com/api/location/topviews/${LIMIT}`).then(res => {
            let data = res.data;
            this.setState({topViewedLocations:data})
            // alert(this.state.topViewedLocations)
        }).catch((error)=>{
            this.setState({loading:true})
            ToastAndroid.show('Some thing went wrong', ToastAndroid.LONG);
            
        })
    }
   renderMostViewed = ()  =>{
    return( <FlatList
        data={this.state.mostViewed}
        horizontal
        renderItem={({ item: rowData }) => {
          return (
            <CardView
              height={180}
              width={170}
              imageUri={`https://picsum.photos/${rowData.filename.toString()}`}
              name={rowData.author}
              isTopLoc={false}
            />
             
            
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
         )
   }
   renderRecommended = ()  =>{
    return( <FlatList
        data={this.state.remcommended}
        horizontal
        renderItem={({ item: rowData }) => {
          return (
            <CardView
              height={180}
              width={170}
              imageUri={`https://picsum.photos/${rowData.filename.toString()}`}
              name={rowData.author}
              isTopLoc={false}
            />
             
            
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
         )
   }
   topLocations = ()  =>{
    return( <FlatList
        data={this.state.topViewedLocations}
        horizontal
        renderItem={({ item: rowData }) => {
          return (
            <CardView
              height={180}
              width={170}
              imageUri={`${rowData.imageID}`}
              name={rowData.description}
              locationId={rowData.locationID}
              navigation={this.props.navigation}
              isTopLoc={true}
            />
             
            
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
         )
   }
     

    render() {
        // if(this.state.loading){
        //     return(
        //         <Loader
        //                     modalVisible={this.state.loading}
        //                     animationType="slide"/>
        //     )
        // }
        // else{
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>

 

            <ScrollView style={{height:hp('100%')}} refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={()=>{this._retrieveData()}}
              colors={['#6FB9F7', '#000000']}
            />
          }>
        
            <TouchableHighlight onPress={()=>{this.props.navigation.navigate('SearchScreen',this.state.user)}} >
             <ImageBackground style={{height:hp('30%'),margin:10,alignItems:'center',alignContent:'center',justifyContent:'center'}} imageStyle={{ borderRadius: 10}}source={{uri:'https://cdn.mangobaaz.com/wp-content/uploads/2016/10/8160999677_80bc8f38ca_b.jpg'}}>
                        
                        <Text style={{color:'white',fontSize:30,fontWeight:'bold',fontFamily:'Montserrat_bold'}}>Travel Guide</Text>
                        
                    </ImageBackground>
                </TouchableHighlight>
                <View style={{  flex: 1, marginTop: 20 }}>
                    <View style={{flexDirection : 'row' ,margin:10}}>
                        <Text style={{fontFamily:'Montserrat_bold',fontSize:20}}> #Top Locations </Text>
                        <Text style={{textAlign:'right',fontFamily:'Montserrat_bold',flex:2}}>See all ></Text>

                    </View>
                 
                   
                   
                </View>
                    <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
                        {this.topLocations()}
                    </ScrollView>
                    <View style={{  flex: 1, marginTop: 20 }}>
                    <View style={{flexDirection : 'row' ,margin:10}}>
                        <Text style={{fontFamily:'Montserrat_bold',fontSize:20}}> #My Posts </Text>
                        <Text style={{textAlign:'right',fontFamily:'Montserrat_bold',flex:2}}>See all ></Text>

                    </View>
                 
                   
                   
                </View>
                    {/* <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
                        {this.renderRecommended()}
                    </ScrollView> */}
                    <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
                        {this.renderMostViewed()}
                    </ScrollView>
                    <View style={{  flex: 1, marginTop: 20 }}>
                    <View style={{flexDirection : 'row' ,margin:10}}>
                        <Text style={{fontFamily:'Montserrat_bold',fontSize:20}}> #Recommended </Text>
                        <Text style={{textAlign:'right',fontFamily:'Montserrat_bold',flex:2}}>See all ></Text>

                    </View>
                 
                   
                   
                </View>
                    <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
                        {this.renderRecommended()}
                       
                    </ScrollView>
                    
            </ScrollView>
  
          </View>
           
        )
    }
    
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin:10
    }

})