
import { Platform, StyleSheet, Dimensions } from 'react-native';

// Screen Styles
import { Fonts, Metrics, Colors } from '../../Themes/index';

const styles = StyleSheet.create({

  header: {
    backgroundColor: '#2d324f',
    height: Metrics.HEIGHT * 0.1,
    borderBottomWidth: 0,
    paddingTop: (Metrics.HEIGHT * 0.03),
    elevation: 0,
    paddingLeft: (Metrics.WIDTH * 0.05),
    paddingRight: (Metrics.WIDTH * 0.05),
  },
  backArrow: {
    width: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  left: {
    flex: 0.5,
    backgroundColor: Colors.transparent,
  },

  body: {
    flex: 3,
    alignItems: 'center',
    backgroundColor: Colors.transparent
  },

  textTitle: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(16),
    marginTop: (Metrics.HEIGHT * 0.001),
    alignSelf: 'center',
    
  },

  right: {
    flex: 0.5
  },

  main: {
    height: Metrics.HEIGHT,
    width: Metrics.WIDTH,
    backgroundColor: "#F2F2F2",
    flexDirection: 'column'
  },

  lastRowBg: {
    width: (Metrics.WIDTH),
    backgroundColor: Colors.snow,
    justifyContent: 'center'
  },

  rowBg: {
    width: (Metrics.WIDTH),
    backgroundColor: Colors.snow,
    justifyContent: 'center',
    marginBottom: (Metrics.HEIGHT) * 0.018,
  },

  profileImg: {
    width: (Metrics.WIDTH) * 0.12,
    height: (Metrics.WIDTH) * 0.12,
    borderRadius: (Metrics.WIDTH) * 0.06,
    alignSelf: 'flex-start',
  },

  rowPostDescription: {
   
    fontSize: Fonts.moderateScale(17),
    marginTop: (Metrics.HEIGHT) * 0.015,
    width: (Metrics.WIDTH) *0.95,
    alignSelf: 'center',
    textAlign: 'left'
  },

  rowNameTxt: {
    color: "#6f6f6f",
    fontSize: Fonts.moderateScale(17),
   
  },

  rowTimeTxt: {
    color: "#b7b7b7",
    fontSize: Fonts.moderateScale(14),
   
  },

  rowDescTxt: {
    color: "#6f6f6f",
    fontSize: Fonts.moderateScale(13),
    textAlign: 'left'
  },

  dividerHorizontal: {
    width: (Metrics.WIDTH) * 0.95,
    height: (Metrics.HEIGHT) * 0.001,
    backgroundColor: "#F2F2F2",
    alignItems:'center',
    
    marginTop: (Metrics.HEIGHT) * 0.022
  },

  likeCommentShareText: {
    fontSize: Fonts.moderateScale(15),
    marginLeft: (Metrics.WIDTH) * 0.015,
    color: "#6f6f6f"
  },

  likeCommentShareImage: {
    width: (Metrics.WIDTH) * 0.06,
    height: (Metrics.HEIGHT) * 0.03,
    resizeMode: 'contain'
  },

  dividerVertical: {
    width: (Metrics.WIDTH) * 0.003,
    height: (Metrics.HEIGHT) * 0.04,
    backgroundColor: "#F2F2F2",
    alignSelf: 'flex-end',
  },

  rowMainView:{
    width: (Metrics.WIDTH)
  },

  postDescImage:{
    width: (Metrics.WIDTH),
    height: (Metrics.HEIGHT) * 0.35,
    alignSelf: 'center',
    resizeMode:'stretch'
  },

  postDateView:{
    width: (Metrics.WIDTH) * 0.95,
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: (Metrics.HEIGHT) * 0.015,
    alignItems:'center'
  },

  postAuthorDate:{
    fontSize: Fonts.moderateScale(12),
  
  },

  rowDescView:{
    width: (Metrics.WIDTH) * 0.95,
    alignSelf: 'center',
    marginTop: (Metrics.HEIGHT) * 0.015,
  },

  likeCommentShareView:{
    flexDirection: 'row',
    width: (Metrics.WIDTH) * 0.95,
    alignSelf: 'center',
    marginTop: (Metrics.HEIGHT) * 0.015,
    marginBottom: (Metrics.HEIGHT) * 0.015,
  },

  
  commentView:{
    flexDirection: 'row',
    width: (Metrics.WIDTH) * 0.9,
    alignItems: 'center',
    marginLeft: (Metrics.WIDTH) * 0.045
  },


});

export default styles;
