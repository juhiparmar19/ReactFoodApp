import { StyleSheet } from 'react-native';
import colors from '../config/colors'
import dimen from '../config/dimen';

const baseStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    flexDirection:'column'
  },
  maincontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d3d3d3',
    flexDirection:'column'
  },
  verticalView: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    margin:5
  },
  horizontalView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign:'center',
    fontSize: 18,
    fontWeight:"bold",
    borderColor: 'gray',
    backgroundColor: colors.buttonBg,
    borderWidth: 1,
    borderRadius: 5,
    width:"80%",
    color:'white',
    padding:10
  },
  input: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 18,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#FFFFFF',
    width:"80%"
  },
  image: {
    width: 100,
    height: 100,
    margin: 10
  },
  commanButton: {
    backgroundColor: colors.colorPrimary,
    paddingLeft: dimen.paddingMedium,
    paddingRight: dimen.paddingMedium,
    // color:colors.colorPrimaryDark
  },
  borderContainer: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 3,
    elevation: 1
  },
  modalContent: {
    backgroundColor: colors.white,
    padding: dimen.paddingSmall,
    // justifyContent: "center",
    // alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  rowMainContainer: {
    padding: dimen.marginSmall,
    marginBottom: dimen.marginSmall,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.textValueGray,
    borderRadius: 4,
    elevation: 3
  },
  roundedImage: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "gray"
  },
  smallImage: {
    width: 40,
    height: 40,
    margin: 10
  },
  inputContainer: {
    width: "80%",
    flex:1,
    color:'#000',
    margin: dimen.marginMedium,
    justifyContent:'flex-end',
    alignItems:'flex-end',
    fontSize: 20,
    fontWeight : 'bold' ,
    bottom:0
  },
  inputData: {
    width: "80%",
    flex:1,
    color:'#000000',
    justifyContent:'flex-end',
    alignItems:'flex-end',
    margin:5,
    fontSize: 20,
    fontWeight : 'bold' ,
  },
  inputDataNormal: {
    color:'#000000',
    justifyContent:'flex-end',
    alignItems:'flex-end',
    marginTop:5,
    marginStart:8,
    marginEnd:8, 
       fontSize: 15,
    fontWeight : 'normal' ,
  },
  inputDataBold: {
    color:'#000000',
    justifyContent:'flex-end',
    alignItems:'flex-end',
    marginTop:5,
    marginStart:8,
    marginEnd:8,
    fontSize: 15,
    fontWeight : 'bold' ,
  },
  buttonstyle: {
    width:'100%',
    alignItems: 'stretch',
    marginTop:dimen.marginSmall,
    marginBottom:dimen.marginSmall,
    backgroundColor:colors.colorPrimary,
  },
   
  commonInputStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    color: 'black',
    fontSize: dimen.fontNormal,
    minHeight: 40,
  },
  buttonDisableStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign:'center',
    fontSize: 18,
    fontWeight:"bold",
    borderColor: 'gray',
    backgroundColor: colors.buttonDisableBg,
    borderWidth: 1,
    borderRadius: 5,
    width:"80%",
    padding:10,
    color:'white'
  },
 
heading: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
},
menuItem:{
    padding: 10,
    borderWidth: 0.5,
    borderColor: '#d6d7da'
},
imagebgcontainer: {
  flex: 1,
  height:230,
  margin:5,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white'
},
 horizontalBottom:{
  flexDirection: 'row',
  alignItems: 'flex-end',
  justifyContent:'flex-end',
  flex:1
 }

})

export default baseStyles;