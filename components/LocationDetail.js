import React from 'react';
import { View, Linking,StyleSheet, ScrollView, ActivityIndicator, Picker, RefreshControl, AsyncStorage, ImageBackground } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right, Icon, Switch, Button } from 'native-base';
import axios from 'axios';
import { LinearGradient } from 'expo';
import GradientButton from 'react-native-gradient-buttons';
import Divider from 'react-native-divider';
import Icon2 from 'react-native-vector-icons/Entypo';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


export default class LocationDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            loading: true,
            refreshing: false,
            data: '',
            netWorkError: false,
        }
    }
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.locationName}`,
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#6FB9F7'
        },
    });
    componentDidMount(){
        this.getLocationData();
    }
    opengoogleMap(long,lat){
        const url = `https://www.google.com/maps/search/?api=1&query=${lat},${long}`;
        Linking.openURL(url);
    }
    renderViewlocation = () =>{
        if(this.state.data.longitude!="" && this.state.data.latitude!=""){
            return (
                <View style={{ alignContent: 'center' }}>

                <GradientButton
                    style={{ margin: 10 }}
                    textSyle={{ fontSize: 5 }}
                    gradientBegin="#6FB9F7"
                    gradientEnd="#CADBFA"
                    gradientDirection="diagonal"
                    height={50}

                    radius={5}
                    onPressAction={() => { this.opengoogleMap(this.state.data.longitude,this.state.data.latitude) }}
                >
                    <Text style={{ fontSize: 17, color: 'white' }}> View Location </Text>
                    <Icon2 name="location-pin" size={20} color={'#ffffff'} />
                </GradientButton>

            </View>
            )
        }
        else{
            return (
                <View style={{ alignContent: 'center' }}>

                <GradientButton
                    style={{ margin: 10 }}
                    textSyle={{ fontSize: 5 }}
                    gradientBegin="#6FB9F7"
                    gradientEnd="#CADBFA"
                    gradientDirection="diagonal"
                    height={50}

                    radius={5}
                    
                >
                    <Text style={{ fontSize: 15, color: 'white' }}> Location Not Maintained </Text>
                    <Icon2 name="location-pin" size={20} color={'#ffffff'} />
                </GradientButton>

            </View>
            )
        }
    }
    getLocationData(){
   

    this.setState({ loading: true });
    axios.post(`http://wasayhere-002-site1.itempurl.com/api/location/search/${this.props.navigation.getParam('locationId','No-Id')}`).then(res => {
      const data = res.data[0];

      this.setState({ data: data, loading: false,netWorkError:false });
    //   alert(JSON.stringify(data));




    }).catch(error => {
      this.setState({ loading: false, netWorkError: true });
      // ToastAndroid.show('Some thing went wrong', ToastAndroid.LONG);
    })
    }
    timings=()=>{
        if(this.state.data.timing.trim()=="2"){
            return "Open at night"
        }
        if(this.state.data.timing.trim()=="1"){
            return "Open at Morning"
        }
        if(this.state.data.timing.trim()=="3"){
            return "Open Full Day"
        }
    }
    isExpensive=()=>{
        if(this.state.data.pricing.trim()=="2"){
            return "No"
        }
        if(this.state.data.pricing.trim()=="3"){
            return "Yes"
        }
    }
    render() {
        const { navigation } = this.props;
        if (this.state.loading === true) {
            return (
              <View style={{ flex: 1, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' }}>
      
                <ActivityIndicator size="large" color="#6FB9F7" />
      
              </View>
            )
          }
          if (this.state.netWorkError === true ) {
            return (
              <View style={{ flex: 1, alignItems: 'center',backgroundColor: '#ffffff', justifyContent: 'center' }}>
                <Text>Some thing went wrong</Text>
                <Text onPress={()=>{this.getLocationData();}} style={{color:'red'}}> Retry </Text>
               
      
              </View>
            )
          }
          else {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>





                <Container>

                    <Content>
                        <ImageBackground style={{ height: hp('30%'), margin: 10, alignItems: 'center', alignContent: 'center', justifyContent: 'center' }} imageStyle={{ borderRadius: 10 }} source={require('../assets/imgbg.png')}>

                            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', fontFamily: 'Montserrat_bold' }}> {navigation.getParam('locationName', 'No-ID')}</Text>

                        </ImageBackground>
                        
                        <View style={{ elevation:1.4,backgroundColor:'#ffffff', margin:10,borderRadius:10}}>
                        
                        <Divider borderColor="#B9B9B6" color="#B9B9B6" orientation="center">
                            <Text style={{fontSize:12,color:"#B9B9B6"}}> Description </Text>
                        </Divider>
                        <Text style={{fontSize:12,color:"#B9B9B6",fontFamily:'Montserrat_bold',padding:10,textAlign:'center'}}>{this.state.data.description}</Text>
                        <Divider borderColor="#B9B9B6" color="#B9B9B6" orientation="center">
                            <Text style={{fontSize:12,color:"#B9B9B6"}}> Tags: #{this.state.data.tags}, Expensive: {this.isExpensive()}, Views: {this.state.data.View}</Text>
                        </Divider>
                        </View>
                       
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ height: 50, width: wp('51%'), margin: 5 }}>

                            </View>
                            <View style={{ alignContent: 'center' }}>
                                <GradientButton
                                    style={{ margin: 5 }}
                                    textSyle={{ fontSize: 5 }}
                                    gradientBegin="#F19147"
                                    gradientEnd="#F5BC90"
                                    gradientDirection="diagonal"
                                    height={50}
                                    width={wp('40%')}
                                    radius={5}
                                   
                                >   
                                <Icon2 name="clock" size={15} color={'#ffffff'} />
                                    <Text style={{ fontSize: 14, color: 'white' }}> {this.timings()} </Text>
                                    
                                </GradientButton>
                            </View>

                        </View>
                        {this.renderViewlocation()}
                       
                      


                    </Content>
                </Container>




            </View>
        )
    }
}
}