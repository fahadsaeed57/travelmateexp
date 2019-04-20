import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator,  Picker,RefreshControl, AsyncStorage, ToastAndroid } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left,Body, Right, Icon, Switch, Button } from 'native-base';
import Icon2 from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import { Bubbles } from 'react-native-loader';
export default class SearchScreen extends Component {
  static navigationOptions = {
    title: 'Travel Guide',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#6FB9F7'
    },
  };
  constructor(props) {

    super(props);

    this.state = {
      user: '',
      loading: true,
      refreshing: false,
      data: '',
      netWorkError: false,
      selected1: "key1",
    }
  }
  onValueChange(value) {
    this.setState({
      selected1: value
    });
  }

  getData(){
   
    const { navigation } = this.props;
    const user = navigation.getParam('fname', 'NO-ID');
    const datatopost = {
      username: navigation.getParam('username', 'NO-ID'),
      email: navigation.getParam('email', 'NO-ID'),
      fname: navigation.getParam('fname', 'NO-ID'),
      lname: navigation.getParam('lname', 'NO-ID'),
      pass: navigation.getParam('pass', 'NO-ID'),
      age: navigation.getParam('age', 'NO-ID'),
      alone: navigation.getParam('alone', 'NO-ID'),
      expensive: navigation.getParam('expensive', 'NO-ID'),
      gender: navigation.getParam('gender', 'NO-ID'),
      crowded: navigation.getParam('crowded', 'NO-ID')
    }

    this.setState({ loading: true });
    axios.post(`http://wasayhere-002-site1.itempurl.com/api/Location/Post`, datatopost).then(res => {
      const data = res.data;

      this.setState({ data: data, loading: false,netWorkError:false });
      // alert(JSON.stringify(data));




    }).catch(error => {
      this.setState({ loading: false, netWorkError: true });
      // ToastAndroid.show('Some thing went wrong', ToastAndroid.LONG);
    })
  }
  componentWillUnmount() {

  }
  componentDidMount() {
    
      this.getData();
  }
  viewLocation(locationid,locationname){
    locationdata = {
      locationId : locationid,
      locationName : locationname
    }
    this.props.navigation.navigate('LocationDetails',locationdata);

  }
 


  render() {
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
          <Text onPress={()=>{this.getData();}} style={{color:'red'}}> Retry </Text>
         

        </View>
      )
    }
    else {
      return (

        <View style={{ flex: 1, backgroundColor: 'white' }}>



          <ScrollView style={{ color: 'blue' }} refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
              colors={['#6FB9F7', '#000000']}
            />
          }>
            <Container>

              <Content>
                <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold', padding: 10, textAlign: 'center' }}> City : {this.state.data.city}</Text>
                <ListItem icon onPress={()=>{this.viewLocation(this.state.data.locid1,this.state.data.loc1)}}>
                  <Left>
                    <Button style={{ backgroundColor: "#007AFF" }}>
                      <Icon2 name="location" size={15} color={'#ffffff'} />
                    </Button>
                  </Left>
                  <Body >
                    <Text>Location 1 : {this.state.data.loc1}</Text>
                  </Body>
                  <Right>

                    <Icon active name="arrow-forward" />
                  </Right>
                </ListItem>
                <ListItem icon onPress={()=>{this.viewLocation(this.state.data.locid2,this.state.data.loc2)}}>
                  <Left>
                    <Button style={{ backgroundColor: "#007AFF" }}>
                      <Icon2 name="location" size={15} color={'#ffffff'} />
                    </Button>
                  </Left>
                  <Body>
                    <Text>Location 2 : {this.state.data.loc2}</Text>
                  </Body>
                  <Right>

                    <Icon active name="arrow-forward" />
                  </Right>
                </ListItem>
                <ListItem icon onPress={()=>{this.viewLocation(this.state.data.locid3,this.state.data.loc3)}}>
                  <Left>
                    <Button style={{ backgroundColor: "#007AFF" }}>
                      <Icon2 name="location" size={15} color={'#ffffff'} />
                    </Button>
                  </Left>
                  <Body>
                    <Text>Location 3 : {this.state.data.loc3}</Text>
                  </Body>
                  <Right>

                    <Icon active name="arrow-forward" />
                  </Right>
                </ListItem>
                <ListItem icon onPress={()=>{this.viewLocation(this.state.data.locid4,this.state.data.loc4)}}>
                  <Left>
                    <Button style={{ backgroundColor: "#007AFF" }}>
                      <Icon2 name="location" size={15} color={'#ffffff'} />
                    </Button>
                  </Left>
                  <Body>
                    <Text>Location 4 : {this.state.data.loc4}</Text>
                  </Body>
                  <Right>

                    <Icon active name="arrow-forward" />
                  </Right>
                </ListItem>
                <ListItem icon onPress={()=>{this.viewLocation(this.state.data.locid5,this.state.data.loc5)}}>
                  <Left>
                    <Button style={{ backgroundColor: "#007AFF" }}>
                      <Icon2 name="location" size={15} color={'#ffffff'} />
                    </Button>
                  </Left>
                  <Body>
                    <Text>Location 5 : {this.state.data.loc5}</Text>
                  </Body>
                  <Right>

                    <Icon active name="arrow-forward" />
                  </Right>
                </ListItem>
               
              </Content>
            </Container>
            

          </ScrollView>

        </View>
      )
    }

  }
}
const styles = StyleSheet.create({

})
