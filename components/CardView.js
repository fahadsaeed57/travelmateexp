import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from "react-native";
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Circle';
import Touchable from 'react-native-platform-touchable';

class CardView extends Component {
    renderImage = ()=>{
        if(this.props.imageUri==""){
            return (
                <Image source={{ uri:'https://www.independentpakistan.com/digital_images/large/2018-06-26/lulusar-lake-jheel-natural-beauty-of-pakistan-1529960402-5567.jpg'}} indicator={ProgressBar} style={{  flex: 2, width: null, height: null, resizeMode: 'cover',borderTopLeftRadius:10,borderTopRightRadius:10 }} imageStyle={{borderTopLeftRadius:10,borderTopRightRadius:10 }} />
            )
        }
        else{
            return (
                <Image source={{ uri:this.props.imageUri}} indicator={ProgressBar} style={{  flex: 2, width: null, height: null, resizeMode: 'cover',borderTopLeftRadius:10,borderTopRightRadius:10 }} imageStyle={{borderTopLeftRadius:10,borderTopRightRadius:10 }} />
            )
        }
    }
    viewLocation(){
        locationdata = {
            locationId : this.props.locationId,
            locationName : this.props.name
          }
          this.props.navigation.navigate('LocationDetails',locationdata);
    }
    viewPost(){
        postData = {
            postid : this.props.postID
        }
        
        this.props.navigation.navigate('PostDetails',postData);
        
    }
    render() {
        return (
            <TouchableHighlight onPress={()=>{this.props.isTopLoc==true ? this.viewLocation():this.viewPost()}} >
            <View style={{ elevation:1.4,height:this.props.height,backgroundColor:'#ffffff', width: this.props.width, margin:10,borderRadius:10}}>
                <View  style={{ flex: 2 ,borderTopLeftRadius:10,borderTopRightRadius:10}}>
                    
                    {this.renderImage()}
                </View>
                <View  style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
                    <Text   style={{fontWeight:'bold'}}>{this.props.name}</Text>
                </View>
            </View>
            </TouchableHighlight>
        );
    }
}
export default CardView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});