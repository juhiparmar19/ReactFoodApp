import React, { Component } from "react";
import { View, StyleSheet,PermissionsAndroid, TouchableOpacity, Text, Picker, FlatList, Image, Alert } from "react-native";
import BaseStyle from '../../common/BaseStyle'
import { OutlinedTextField } from 'react-native-material-textfield';
import { ScrollView } from "react-native-gesture-handler";
import validationInput from '../../utils/validation';
import colors from '../../config/colors'
import { Button } from "react-native-paper";
import ApiManager from '../../service/ApiManager';
import AsyncStorage from '@react-native-community/async-storage';
import LoadingComponent from "../../common/LoadingComponent";
import ImagePicker from 'react-native-image-picker'
import Permissions from 'react-native-permissions'

export default class AddReceipeComponent extends Component {

    ingredientArray = [];
    instructionArray = [];
    metaTagArray = [];
    
    constructor(props) {
        super(props);
        this.state = {
            ingredient: '',
            controls: {
                name: {
                    value: "Khoya Kaju",
                    valid: false,
                    validationRules: {
                        isEmpty: true
                    },
                },
                preparationTime: {
                    value: "2hr",
                    valid: false,
                    validationRules: {
                        isEmpty: true
                    },
                },
                serves: {
                    value: "4",
                    valid: false,
                    validationRules: {
                        isEmpty: true
                    },
                },

                ytUrl: {
                    value: "https://www.youtube.com/watch?v=XvxiiVpUAb4",
                    valid: true,
                    validationRules: {
                        isEmpty: true
                    },
                },
                ingredient: {
                    value: "",
                    valid: false,
                    validationRules: {
                        isEmpty: true
                    },
                },
                instruction: {
                    value: "",
                    valid: false,
                    validationRules: {
                        isEmpty: true
                    },
                },

            },
            complexity: "Easy",
            metaTag: "",
            isButtonEnable: false,
            metaTagList: [],
            ingredientList: [],
            instructionList: [],
            loading: false,
            recipeUri: "",
            recipePath: "",
            recipeData: "",
            cameraPermission : false,
            photoPermission : false


        };

        this.checkCameraAndPhotos()
    }
    componentDidMount () {
        this._onFocusListener = this.props.navigation.addListener('didFocus', (payload) => {
            this.clearData()
         
        });
    }
    componentWillUnmount(){
        this._onFocusListener.remove();
    }
    checkCameraAndPhotos = () => {
        // Permissions.check(Permissions.AN)
        // Permissions.checkMultiple(['camera', 'photo']).then(response => {
        //   //response is an object mapping type to permission
        //   this.setState({
        //     cameraPermission: response.camera,
        //     photoPermission: response.photo,
        //   })
        // })
      }
    addMetatagItems = () => {
        if (this.state.metaTag.length > 0) {
            this.metaTagArray.push(this.state.metaTag)
            this.setState({ metaTagList: this.metaTagArray })
            this.MetaTag.clear()
        }
    }
    removeMetatagItems = (item) => {
        var checked = this.metaTagArray;
        var values = this.metaTagArray.indexOf(item)
        checked.splice(values, 1);
        this.setState({ metaTagList: checked })
    }
    addInstructionItems = () => {
        if (this.state.controls.instruction.valid) {
            this.instructionArray.push(this.state.controls.instruction.value)
            this.setState({ instructionList: this.instructionArray })
            this.Instruction.clear()
        }
    }
    removeInstructionItems = (item) => {
        var checked = this.instructionArray;
        var values = this.instructionArray.indexOf(item)
        checked.splice(values, 1);
        this.setState({ instructionList: checked })
    }
    addIngredientItems = () => {
        if (this.state.controls.ingredient.valid) {
            this.ingredientArray.push(this.state.controls.ingredient.value)
            this.setState({ ingredientList: this.ingredientArray })
            this.Ingredient.clear()
        }
    }
    removeIngredientItems = (item) => {
        var checked = this.ingredientArray;
        var values = this.ingredientArray.indexOf(item)
        checked.splice(values, 1);
        this.setState({ ingredientList: checked })
    }
    isButtonEnable = () => {
        if (this.state.controls.name.valid
            && this.state.controls.preparationTime.valid
            && this.state.controls.serves.valid
            && this.state.controls.ytUrl.valid
            && (this.state.metaTagList.length > 0)
            && (this.state.instructionList.length > 0)
            && (this.state.ingredientList.length > 0)) {
            this.setState({ isButtonEnable: true })
        } else {
            this.setState({ isButtonEnable: false })
        }
    }
    addRecipeImage = () => {

    }
    onSubmit = () => {
        AsyncStorage.getItem('accesstoken').then((token) => {
            if (token != undefined) {
               this.addRecipeCall(token)
                         
            }
        })
    };

    addRecipeCall = async (token) => {
        this.setState({ loading: true })

        await ApiManager.addRecipeApi(this.state.controls.name.value.trim(), this.state.controls.preparationTime.value.trim(), this.state.controls.serves.value.trim(), this.state.complexity, this.state.metaTagList, this.state.controls.ytUrl.value.trim(), token).then((response) => {
            this.setState({ loading: false })
            if (response != undefined && response.status == 200) {
                return response.json()
            }
            else {
                const { error } = response
                if (error != undefined) {
                    Alert.alert('FoodApp', error, [
                        {
                            text: 'Ok',
                            style: 'cancel'
                        },
                    ])
                }
            }
        }).then((responseJSON) => {
            const { id } = responseJSON
            console.log("==responseJSON==", responseJSON)
            if (responseJSON != undefined) {
                

                if (this.state.ingredientList.length > 0) {
                    this.state.ingredientList.map(item => {
                        this.addIngredientsCall(id, item, token)
                    })
                }      
              if (this.state.instructionList.length > 0) {
                    this.state.instructionList.map(item => {
                        this.addInstructionCall(id, item, token)
                    })
                } 
                if(this.state.recipeUri.length > 0){
                    this.addRecipeImageCall(id,this.state.recipeUri,token)
                }
            }
        });
    }
    addIngredientsCall = async (recipeId, ingredient, token) => {
        this.setState({ loading: true })
        await ApiManager.addIngredient(recipeId, ingredient, token).then((response) => {
            this.setState({ loading: false })
            if (response != undefined && response.status == 200) {
                return response.json()
            }
            else {
                const { error } = response
                if (error != undefined) {
                    Alert.alert('FoodApp', error, [
                        {
                            text: 'Ok',
                            style: 'cancel'
                        },
                    ])
                }
            }
        }).then((responseJSON) => {
            if (recipeId != undefined) {
                console.log("==responseJSON==", responseJSON)
    
            }
        });
    }

    addInstructionCall = async (recipeId, instruction, token) => {
        this.setState({ loading: true })
        await ApiManager.addInstruction(recipeId, instruction, token).then((response) => {
            this.setState({ loading: false })
            if (response != undefined && response.status == 200) {
                return response.json()
            }
            else {
                const { error } = response
                Alert.alert('FoodApp', error, [
                    {
                        text: 'Ok',
                        style: 'cancel'
                    },
                ])
            }
        }).then((responseJSON) => {
            if (responseJSON != undefined) {
                console.log("==responseJSON==", responseJSON)
              
            }
        });
    }
    addRecipeImageCall = async (recipeId,imageUri, token) => {
        this.setState({ loading: true })
        await ApiManager.addRecipeImageApi(recipeId,imageUri, token).then((response) => {

            this.setState({ loading: false })
            if (response != undefined && response.status == 200) {
                return response.json()
            }
            else {
                const { error } = response
                Alert.alert('FoodApp', error, [
                    {
                        text: 'Ok',
                        style: 'cancel'
                    },
                ])
            }
        }).then((responseJSON) => {
            const { msg } = responseJSON
            console.log("res==", responseJSON)
            Alert.alert('FoodApp', msg, [
                {
                    text: 'Ok',
                    style: 'cancel'
                },
            ])
        });
    }


    onDeletePress = (placeHolder, item) => {
        switch (placeHolder) {
            case "Ingredient":
                this.removeIngredientItems(item)
                break;
            case "Instruction":
                this.removeInstructionItems(item)
                break;
            case "MetaTag":
                this.removeMetatagItems(item)
                break;
            default:
                break;
        }
    }

    rowItem = (item, placeHolder) => {
        return <View style={{ width: "100%", marginBottom: 5, borderColor: 'gray', backgroundColor: '#e7e7e7', flex: 1, flexDirection: 'row', padding: 10 }}>
            <Text style={{ width: '95%', fontWeight: 'normal', fontSize: 15, fontWeight: 'bold', justifyContent: 'center' }}> {item} </Text>
            <TouchableOpacity
                onPress={
                    () => this.onDeletePress(placeHolder, item)}
                activeOpacity={0.5} >
                <Image style={{ width: 15, height: 15, resizeMode: 'cover', padding: 5, alignItems: 'flex-end', tintColor: 'black', justifyContent: 'center' }} source={require('../../assets/ic_close.png')} />
            </TouchableOpacity>
        </View>
    }

    render() {
        return (
            <ScrollView contentContainerStyle={baseStyles.container}>
                <LoadingComponent isLoading={this.state.loading} />
                <View style={{ flex: 1, flexDirection: 'column', width: '100%', alignItems: 'center' }}>
                    <View style={{ margin: 15, width: '95%' }} >
                        <OutlinedTextField containerStyle={{ width: '100%' }}
                            label='Name'
                            value={this.state.controls.name.value}
                            returnKeyType={'next'}
                            onChangeText={(val) => this.validateUserInput("name", val)}
                            onSubmitEditing={() => this.PreparationTime.focus()}
                            ref={ref => this.NameRef = ref}
                        />
                        <OutlinedTextField containerStyle={{ width: '100%' }}
                            label='PreparationTime'
                            onSubmitEditing={() => this.Serves.focus()}
                            returnKeyType={'next'}
                            value={this.state.controls.preparationTime.value}
                            ref={ref => this.PreparationTime = ref}
                            onChangeText={(val) => this.validateUserInput("preparationTime", val)} />
                        <OutlinedTextField containerStyle={{ width: '100%' }}
                            label='Serves'
                            returnKeyType={'next'}
                            value={this.state.controls.serves.value}
                            ref={ref => this.Serves = ref}
                            onChangeText={val => this.validateUserInput("serves", val)}
                        />
                        <Text style={{ width: '100%', marginBottom: 10, fontWeight: 'normal', fontSize: 15, fontWeight: 'bold' }}>
                            Set Complexity
                    </Text>
                        <View style={{
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 5, marginBottom: 10
                        }}>
                            <Picker
                                selectedValue={this.state.complexity}
                                onValueChange={(itemValue, itemIndex) =>
                                    setTimeout(() => {
                                        console.log("=itemValue=", itemValue)
                                        this.setState({ complexity: itemValue })
                                    }, 10)}
                            >
                                <Picker.Item label="Easy" value="Easy" />
                                <Picker.Item label="Medium" value="Complex" />
                                <Picker.Item label="Complex" value="Medium" />

                            </Picker>
                        </View>
                        <Text style={{ width: '100%', marginBottom: 10, fontWeight: 'normal', fontSize: 15, fontWeight: 'bold' }}>
                            Add Ingredient
                    </Text>
                        <OutlinedTextField containerStyle={{ width: '100%' }}
                            label='Ingredient'
                            value={this.state.ingredient}
                            ref={ref => this.Ingredient = ref}
                            onSubmitEditing={() => this.addIngredientItems()}
                            onChangeText={val => this.validateUserInput("ingredient", val)} />
                        <FlatList
                            data={this.state.ingredientList}
                            width='100%'
                            extraData={this.state.ingredientList}
                            keyExtractor={(index) => index.toString()}
                            renderItem={({ item }) => this.rowItem(item, 'Ingredient')} />
                        <Text style={{ width: '100%', marginBottom: 10, fontWeight: 'normal', fontSize: 15, fontWeight: 'bold' }}>
                            Add Instruction
                         </Text>
                        <OutlinedTextField style={{ borderColor: colors.buttonBg }} containerStyle={{ width: '100%' }}
                            label='Instruction'
                            backgroundColor={colors.buttonBg}
                            labelTextStyle={colors.buttonBg}
                            value={this.state.controls.instruction.value}
                            ref={ref => this.Instruction = ref}
                            onSubmitEditing={() => this.addInstructionItems()}
                            onChangeText={val => this.validateUserInput("instruction", val)}
                        />
                        <FlatList
                            data={this.state.instructionList}
                            width='100%'
                            extraData={this.state.instructionList}
                            keyExtractor={(index) => index.toString()}
                            renderItem={({ item }) => this.rowItem(item, 'Instruction')} />
                        <View style={{ flex: 1, flexDirection: 'row' }}>

                            <OutlinedTextField style={{ borderColor: colors.buttonBg }} containerStyle={{ flex: 1 }}
                                label='MetaTag'
                                backgroundColor={colors.buttonBg}
                                labelTextStyle={colors.buttonBg}
                                value={this.state.metaTag}
                                onChangeText={val => this.setState({ metaTag: val })}
                                ref={ref => this.MetaTag = ref}
                            />
                            <Button style={{
                                borderColor: 'gray',
                                height: 55,
                                marginStart: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: colors.buttonBg
                            }} color='white' labelStyle={{ fontSize: 30 }} onPress={() => this.addMetatagItems()}>
                                +
                            </Button>
                        </View>

                        <FlatList
                            data={this.state.metaTagList}
                            width='100%'
                            extraData={this.state.metaTagList}
                            keyExtractor={(index) => index.toString()}
                            renderItem={({ item }) => this.rowItem(item, 'MetaTag')} />

                        <OutlinedTextField style={{ borderColor: colors.buttonBg }} containerStyle={{ width: '100%' }}
                            label='Youtube url'
                            backgroundColor={colors.buttonBg}
                            labelTextStyle={colors.buttonBg}
                            value={this.state.controls.ytUrl.value}
                            ref={ref => this.YtUrl = ref}
                            onChangeText={val => this.validateUserInput("ytUrl", val)}
                        />
                        <View style={BaseStyle.horizontalView}>
                            <Image source={this.state.recipeUri ? { uri: this.state.recipeUri } : require('../../assets/ic_default.png')} style={{ height: 150, alignItems: 'flex-start', flex:1, resizeMode: 'cover', margin: 5 }}>

                            </Image>
                            <Button style={{
                                borderColor: 'gray',
                                height: 40,
                                marginStart: 10,
                                justifyContent: 'center',
                                alignItems: 'center',                               
                                backgroundColor: colors.buttonBg
                            }} color='white' upplabelStyle={{ fontSize: 30}} onPress={() => this.launchPicker()}>
                                Upload Image
                            </Button>
                        </View>

                        <View style={{ margin: 10, alignItems: 'center' }}>
                            <TouchableOpacity style={{ width: '100%', alignItems: 'center' }}
                                onPress={() => this.onSubmit()}
                                activeOpacity={0.5} >
                                <Text
                                    style={
                                        (this.state.isButtonEnable)
                                            ? { ...BaseStyle.buttonStyle }
                                            : BaseStyle.buttonDisableStyle
                                    }
                                >Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }

    validateUserInput = (key, val) => {
        let connectedValue = {};
        if (this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            };
        }
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],
                        value: val,
                        valid: validationInput(
                            val,
                            prevState.controls[key].validationRules,
                            connectedValue
                        )
                    }
                }
            };
        });

        this.isButtonEnable();
    }
    clearData = () => {
        this.NameRef.clear()
        this.Serves.clear()
        this.PreparationTime.clear()
        this.YtUrl.clear()
        this.setState({recipeImage:''})
        this.setState({ metaTagList: [] })
        this.setState({ instructionList: [] })
        this.setState({ ingredientList: [] })

    }
 
    launchPicker=()=>{
        let options = {
            title: 'Choose Image',
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
          
          /**
       * The first arg is the options object for customization (it can also be null or omitted for default options),
       * The second arg is the callback which sends object: response (more info in the API Reference)
       */
      ImagePicker.showImagePicker(options, (response) => {
             if (response.didCancel) {
        } else if (response.error) {
        }else {
          const source = { uri: response.uri };
      
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      
          this.setState({
           recipePath: response,
           recipeData: response.data,
           recipeUri: response.uri
          });
        //   AsyncStorage.getItem('accesstoken').then((token) => {
        //     if (token != undefined) {
        //         this.addRecipeImageCall(795,response.uri,token)
        //     }
        // })


        }
      });
      }
     
}


const baseStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
})
