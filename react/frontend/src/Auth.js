const Auth = {
    myRule: "",
    isAuthenticated: false,
    authenticate(rule) {
        localStorage.setItem('myRule', rule);
        localStorage.setItem('isAuthenticated', true);
    },
    signout() {
        localStorage.clear();
    },
    getAuth() {
        return localStorage.getItem('isAuthenticated');
    },
    getRule() {
        return localStorage.getItem('myRule');
    }
};
export default Auth;