import React, { Component } from "react";
import {
  Text,
  Image,
  StatusBar,
  Platform,
  ImageBackground,
  TouchableOpacity,
  View,
  ListView,
  BackHandler,
  I18nManager,
  AsyncStorage
} from "react-native";
import {
  Container,
  Button,
  Right,
  Left,
  Content,
  Body,
  Header,
  Icon,
  Title
} from "native-base";
import {Font } from 'expo';
// import ReadMore from "react-native-read-more-text";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";

const profileImg =
  "https://www.midlandgroup.com/wp-content/uploads/2013/03/midland-icons-self-pay.png";

export default class ProfileAccountInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user : '',
    };
  }
  componentDidMount() {
     
    this._retrieveData();
  
    
   }
   _retrieveData = async () => {
     try {
       const value = await AsyncStorage.getItem('userData');
       this.setState({user:JSON.parse(value)});
       
      } catch (error) {
        // Error retrieving data
      }
   } 
  
  signOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth')
}


  render() {
    // StatusBar.setBarStyle("light-content", true);
    // if (Platform.OS === "android") {
    //   StatusBar.setBackgroundColor("#2d324f", true);
    //   StatusBar.setTranslucent(true);
    // }

    return (
      <Container style={styles.main}>
        
        <Content>
          <Image source={{ uri: profileImg }} style={styles.profileImg} />
          <Text style={styles.nameTxt}>{this.state.user.fname} {this.state.user.lname}</Text>
          {/* <Text style={styles.designationTxt}>Graphic Design</Text> */}
          <Text style={styles.descTxt}>
            
          </Text>
          {/* <TouchableOpacity
            style={styles.connectWithTwitterBg}
            onPress={() => alert("Connect with Twitter")}
          >
            <Text style={styles.connectWithTwitterFbTxt}>
              Connect with Twitter
            </Text>
          </TouchableOpacity>
           */}
          <View style={styles.dividerHorizontal} />
          <View style={styles.accountInfoBg}>
            <Text style={styles.accountInfoTxt}>ACCOUNT INFORMATION</Text>
          </View>
          <View style={styles.dividerHorizontal} />
          <View style={{ flexDirection: "column" }}>
            <View style={styles.infoFieldBg}>
              <Text style={styles.infoFieldTitleTxt}>Name</Text>
              <Text style={styles.infoFieldDetailTxt}>{this.state.user.fname} {this.state.user.lname}</Text>
            </View>
            <View style={styles.fieldDivider} />
          </View>
          <View style={{ flexDirection: "column" }}>
            <View style={styles.infoFieldBg}>
              <Text style={styles.infoFieldTitleTxt}>Email</Text>
              <Text style={styles.infoFieldDetailTxt}>
                {this.state.user.email}
              </Text>
            </View>
            <View style={styles.fieldDivider} />
          </View>
          <View style={{ flexDirection: "column" }}>
            <View style={styles.infoFieldBg}>
              <Text style={styles.infoFieldTitleTxt}>Age</Text>
              <Text style={styles.infoFieldDetailTxt}>{this.state.user.age}</Text>
            </View>
            <View style={styles.fieldDivider} />
          </View>
          <View style={{ flexDirection: "column" }}>
            <View style={styles.infoFieldBg}>
              <Text style={styles.infoFieldTitleTxt}>Expensive</Text>
              <Text style={styles.infoFieldDetailTxt}>{this.state.user.expensive}</Text>
            </View>
            <View style={styles.fieldDivider} />
          </View>
          <View style={{ flexDirection: "column" }}>
            <View style={styles.infoFieldBg}>
              <Text style={styles.infoFieldTitleTxt}>Gender</Text>
              <Text style={styles.infoFieldDetailTxt}>{this.state.user.gender}</Text>
            </View>
            <View style={styles.fieldDivider} />
          </View>
          <View style={{ flexDirection: "column" }}>
            <View style={styles.infoFieldBg}>
              <Text style={styles.infoFieldTitleTxt}>Crowded</Text>
              <Text style={styles.infoFieldDetailTxt}>{this.state.user.crowded}</Text>
            </View>
            <View style={styles.fieldDivider} />
          </View>
          <View style={styles.infoFieldBg}>
            <Text style={styles.infoFieldTitleTxt}>Alone</Text>
            <Text style={styles.infoFieldDetailTxt}>
              {this.state.user.alone}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.connectWithFacebookBg}
            onPress={() => this.signOut()}
          >
            <Text style={styles.connectWithTwitterFbTxt}>
              Logout
            </Text>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
  _renderTruncatedFooter = handlePress => {
    return (
      <Text style={styles.viewMoreLessTxt} onPress={handlePress}>
        View more
      </Text>
    );
  };

  _renderRevealedFooter = handlePress => {
    return (
      <Text style={styles.viewMoreLessTxt} onPress={handlePress}>
        View less
      </Text>
    );
  };
}
