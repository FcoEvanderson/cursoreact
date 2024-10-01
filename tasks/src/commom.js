import { Alert, Platform } from "react-native";

const server = Platform.OS === 'ios'
    ? 'http://localhost:3000'
    : 'http://192.168.0.133:3000'
    
    //192.168.0.133:3000
    //192.168.1.103:3000

function showError(err) {
    if (err.response && err.response.data) {
        Alert.alert('Eita! Algo Deu Errado!', `Erro: ${err.response.data}`)
    } else {
        Alert.alert('Eita! Algo Deu Errado!', `Erro: ${err}`)
    }
}

function showSucess(msg){
    Alert.alert('Deu bom!', msg)
}

export { server, showError, showSucess}