const TOKEN = 'token';


export default class tokenStorage{
    saveToken(token){
        localStorage.setItem(TOKEN,token)              //노드 자체 내의 Storage가 localStorage
    }

    getToken(){
        return localStorage.getItem(TOKEN)
    }

    clearToken(){
        localStorage.clear(TOKEN)
    }

}
