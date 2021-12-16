export default function getAccessToken() {
    try {
        return JSON.parse(localStorage.getItem("user"))["accessToken"];
    } catch (_) {
        return 'no-token';
    }

}