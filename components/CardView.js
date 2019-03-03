import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

class CardView extends Component {
    render() {
        return (
            <View style={{ elevation:1.4,height:180,backgroundColor:'#ffffff', width: 170, margin:10}}>
                <View  style={{ flex: 2 }}>
                    <Image source={{uri:this.props.imageUri}} style={{  flex: 2, width: null, height: null, resizeMode: 'cover' }}
                    />
                </View>
                <View  style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
                    <Text   style={{fontWeight:'bold'}}>{this.props.name}</Text>
                </View>
            </View>
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