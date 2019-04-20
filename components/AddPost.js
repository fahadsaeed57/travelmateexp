import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    ActivityIndicator,
    AsyncStorage,
    Alert,
    ToastAndroid

} from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as dp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo';
import GradientButton from 'react-native-gradient-buttons';
import Loader from './Loader';
import { Item, Input, Icon, Textarea,Picker } from 'native-base';
import Icon2 from 'react-native-vector-icons/Entypo';
import axios from 'axios';
class AddPost extends Component {

    state = { isAddingPost:false,loading: true, user: '',locations:'',netWorkError:false ,selectedLocation:'' ,message:''}
    static navigationOptions = {
        headerVisible: true,
        headerTransparent: true,
        headerStyle: {

            backgroundColor: 'transparent',
            zIndex: 100,

            elevation: 0,
            shadowOpacity: 0,
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }
    _retrieveData = async () => {
        
      try {
        const value = await AsyncStorage.getItem('userData');
        this.setState({user:JSON.parse(value)});
        
       } catch (error) {
         alert(error);
       }
    }
    componentDidMount(){
        this._retrieveData();
        this.getAllLocations();
    }
    getAllLocations(){
        this.setState({ loading: true });
        const URL =`http://wasayhere-002-site1.itempurl.com/api/location/getall`
        axios.get(URL).then(res => {
          const data = res.data;
    
          this.setState({ locations: data, loading: false,netWorkError:false, selectedLocation:data[0].locationID});
        //   console.log(this.state.locations)
    
    
    
    
        }).catch(error => {
          this.setState({ loading: false, netWorkError: true });
          // ToastAndroid.show('Some thing went wrong', ToastAndroid.LONG);
        })
    }
    renderPickerItems(){
        return(
            <Picker
            selectedValue={this.state.selectedLocation}
 
            onValueChange={(itemValue, itemIndex) => this.setState({selectedLocation: itemValue})} >
 
            { this.state.locations.map((item, key)=>(
            <Picker.Item label={item.description} value={item.locationID} key={key} />)
            )}
    
          </Picker>
        )
    }
    addPost(){
        
        if(this.state.message.trim()!=''){
            this.setState({ isAddingPost:true });
            axios.post(`http://wasayhere-002-site1.itempurl.com/api/Post/addpost/userid/22/massage/${this.state.message}/locationid/${this.state.selectedLocation}`).then(res => {
                const data = res.data;
          
                this.setState({ isAddingPost:false });
                console.log(data)
                ToastAndroid.show('Post Added Successfully', ToastAndroid.LONG);
                this.props.navigation.navigate('Home');
          
          
          
              }).catch(error => {
                this.setState({ isAddingPost:false });
                ToastAndroid.show('Some thing went wrong', ToastAndroid.LONG);
              })
        }
        else{
            Alert.alert("Error" , "Please add a message to your post!");
        }
    }
    render() {
        if (this.state.loading === true) {
            return (
              <LinearGradient
              colors={['#6FB9F7', '#A1D0F8']} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      
                <ActivityIndicator size="large" color="white" />
      
              </LinearGradient>
            )
          }
          if (this.state.netWorkError === true ) {
            return (
              <LinearGradient
              colors={['#6FB9F7', '#A1D0F8']} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Some thing went wrong</Text>
                <Text onPress={()=>{this.getLocationData();}} style={{color:'red'}}> Retry </Text>
               
      
              </LinearGradient>
            )
          }
          else {
        return (
            <LinearGradient
                colors={['#6FB9F7', '#A1D0F8']} style={styles.container}>
                <View style={{ backgroundColor: 'white', borderRadius: 20, padding:30,width: dp('90%'), height: hp('50%'), alignItems: 'center', position: 'relative' }}>
                    <GradientButton
                        style={{ borderRadius: 30, position: 'absolute', zIndex: 100, marginTop: -40 }}
                        textSyle={{ fontSize: 5 }}
                        gradientBegin="#F19147"
                        gradientEnd="#F5BC90"
                        gradientDirection="diagonal"
                        height={80}
                        width={200}
                        radius={30}
                        
                    >
                        <Text style={{ fontSize: 20, color: 'white' }}>
                            <Icon2 name="paper-plane" size={20} style={{ color: 'white' }} /> {"  "}
                            Add Post </Text>
                    </GradientButton>

                    <Item style={{ }}>
                        <Icon2 name="location-pin" size={15} style={{ color: '#D5DBE1' }} />
                        {this.renderPickerItems()}
                    </Item>

                    <Textarea rowSpan={5} style={{ width: dp('88%') }} onChangeText={(message)=>{this.setState({message})}} bordered placeholder="What's on your mind?" placeholderTextColor="#D5DBE1" />



                    <GradientButton
                        style={{ marginVertical: 8, marginTop: 70 }}
                        textSyle={{ fontSize: 5 }}
                        gradientBegin="#F19147"
                        gradientEnd="#F5BC90"
                        gradientDirection="diagonal"
                        height={50}
                        width={200}
                        radius={30}
                        onPressAction={() => { this.addPost() }}
                    >
                        <Text style={{ fontSize: 10 }}> Add Post </Text>
                    </GradientButton>

                </View>
                { this.state.isAddingPost && <Loader
                            modalVisible={this.state.isAddingPost}
                            animationType="slide"
                        /> }
            </LinearGradient>
        );
    }
    }
}
export default AddPost;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        color: 'gray',
        borderColor: '#D5DBE1',
        fontSize: 15,
        margin: 10,
        padding: 10

    },
});