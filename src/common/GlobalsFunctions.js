let getAccessToken = () => {
    try {
        return JSON.parse(localStorage.getItem("user"))["accessToken"];
    } catch (_) {
        return 'no-token';
    }

}

let getUserId = () => {
    try {
        return JSON.parse(localStorage.getItem("user"))["id"];
    } catch (_) {
        return 'no-token';
    }

}

let globalFunctions = { 'getAccessToken': getAccessToken, 'getUserId': getUserId }

export default globalFunctions;

