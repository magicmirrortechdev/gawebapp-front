import axios from 'axios'
import Global from "../global";

const baseURL = Global.urlArgyle;
let argyleUser;

class argyleService {
    constructor() {
        this.argyleUser = JSON.parse(localStorage.getItem("ArgyleUser"))
        this.argyleservice = axios.create({
            baseURL
        })
    }

    checkArgyleUser(email, name) {
        this.argyleUser = JSON.parse(localStorage.getItem("ArgyleUser"))
        let _this = this;
        return new Promise(function(resolve, reject){
            if(!argyleUser){
                let data = {
                    username: email,
                    password: 'secret123'
                }
                _this.login(data)
                    .then(responseSignin => {
                        console.log("Argyle response: ", responseSignin)
                        localStorage.setItem("ArgyleUser", JSON.stringify(responseSignin.data.data))
                        resolve({ok:1});
                    })
                    .catch(err => {
                        if(err.response && err.response.data ){
                            console.log("user not found:: ", err.response.data)
                            if (err.response.data.code === "E_USER_NOT_FOUND"){
                                let data = {
                                    username: email,
                                    email: email,
                                    firstName: name,
                                    lastName: " - Grean Acorn App",
                                }
                                _this.signup(data).then(responseSignup => {
                                    localStorage.setItem("ArgyleUser", JSON.stringify(responseSignup))
                                    resolve({ok:1});
                                });
                            }
                        }
                    })
            }
        })
    }

    login(data) {
        return this.argyleservice.post('/v1/auth/signin',data);
    }

    signup(data) {
        return this.argyleservice.post('/v1/auth/signup', data)
    }

    addCharge(data) {

        let userArgyle = JSON.parse(localStorage.getItem('ArgyleUser'));
        let dataArgyle = {
            environment: Global.urlEnvironment,
            active: true,
            chargedTo: userArgyle.user.id,
            venue: Global.merchantId,
            dateOfPayment: data.date.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
            amount: data.total,
            chargesData: JSON.stringify([{
                name: data.description,
                amount: data.total
            }]),
            extraData: data.extraData
        };

        return this.argyleservice.post('/v1/users/addcharge', dataArgyle, {
            headers: {
                'Authorization' : 'JWT ' + userArgyle.token
            }
        })
    }

    removeCharge(chargeId) {
        console.log("eliminando charge ", chargeId);
        let userArgyle = JSON.parse(localStorage.getItem('ArgyleUser'));
        let dataArgyle = {
            chargeId: chargeId,
        };

        return this.argyleservice.post('/v1/users/deletecharge', dataArgyle, {
            headers: {
                'Authorization' : 'JWT ' + userArgyle.token
            }
        })
    }
}

export default argyleService;
