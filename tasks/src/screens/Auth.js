import React, { Component } from "react";
import { 
    ImageBackground,
    StyleSheet, 
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import axios from "axios";

import backgroundImage from "../../assets/imgs/login.jpg";
import commonStyles from "../commonStyles";
import AuthInput from "../components/AuthInput";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { server, showError, showSucess } from "../commom";

const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    stageNew: false 
}


export default class Auth extends Component {

    state = {
        ...initialState
    }

    signinOrSignup = () => {
        if (this.state.stageNew) {
            this.signUp()
        } else {
            this.signIn()
        }
    }

    signUp = async () => {
        try {
            await axios.post(`${server}/signup`, {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
            })

            showSucess('User Registered!')
            this.setState({...initialState})
        } catch(e) {
            showError(e)
        }
    }

    signIn = async () => {
        try {
            const res = await axios.post(`${server}/signin`, {
                email: this.state.email,
                password: this.state.password,
            })

            AsyncStorage.setItem('userData', JSON.stringify(res.data))
            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
            this.props.navigation.navigate('Home', res.data)
            
        } catch(e) {
            showError(e)
        }
    }
    
    render() {

        const validations = []
        validations.push(this.state.email && this.state.email.includes('@'))
        validations.push(this.state.password && this.state.password.length >= 6)

        if (this.state.stageNew) {
            validations.push(this.state.name && this.state.name.trim().length >= 3)
            validations.push(this.state.password === this.state.password)
        }

        const validForm = validations.reduce((t,a) => t && a)

        return(
            <ImageBackground source={backgroundImage}
                style={styles.background}>
                <Text style={styles.title}>Tasks</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subtitle}>
                        {this.state.stageNew 
                            ? 'Create your account' 
                            : 'Enter your data'
                        }
                    </Text>
                    {this.state.stageNew &&
                        <AuthInput icon='person-outline' placeholder="Name" placeholderTextColor={'black'} 
                            value={this.state.name}
                            style={styles.input} 
                            onChangeText={name => this.setState({name})}/>
                    }
                    <AuthInput icon='at-outline' placeholder="E-mail" placeholderTextColor={'black'} 
                        value={this.state.email}
                        style={styles.input} 
                        onChangeText={email => this.setState({email})}/>
                    
                    <AuthInput icon='lock-closed-outline' placeholder="Password" placeholderTextColor={'black'}
                        secureTextEntry={true}
                        value={this.state.password}
                        style={styles.input} 
                        onChangeText={password => this.setState({password})}/>

                    {this.state.stageNew &&
                        <AuthInput icon='checkbox-outline' placeholder="Confirm Password" placeholderTextColor={'black'}
                            secureTextEntry={true}
                            value={this.state.confirmPassword}
                            style={styles.input} 
                            onChangeText={confirmPassword => this.setState({confirmPassword})}/>
                    }
                    
                    <TouchableOpacity onPress={this.signinOrSignup}
                        disabled={!validForm}>
                        <View style={[styles.button, validForm ? {} : {backgroundColor: '#AAA'}]}>
                            <Text style={styles.buttonText}>
                                {this.state.stageNew ? 'Sign Up' : 'Sign In'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{padding: 10}}
                    onPress={() => this.setState({stageNew: !this.state.stageNew})}>
                    <Text style={styles.buttonText}>
                        {this.state.stageNew ? 'Already have account?' : 'Haven\'t account?'}
                    </Text>
                </TouchableOpacity>
            </ImageBackground>           
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 70,
        marginBottom: 10
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    },
    formContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 20,
        width: '90%',
        borderRadius: 10
    },
    input: {
        marginTop: 10,
        backgroundColor: '#FFF',
        color: '#000'
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 10
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20
    },
})