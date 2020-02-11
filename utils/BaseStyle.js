import { StyleSheet } from 'react-native';
import colors from '../config/colors'
import dimen from '../config/dimen';

const baseStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  verticalView: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    flexDirection: 'column'
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
  inputContainer: {
    width: "80%",
    margin: dimen.marginTiny,
    alignItems: 'center',

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
    flex: 1,
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
    padding:10
  },
})

export default baseStyles;