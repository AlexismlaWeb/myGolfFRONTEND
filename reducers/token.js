export default function(token = '', action){
    if(action.type == 'addToken'){
        console.log(action)
        return action.token
    } else {
        return token
    }
}