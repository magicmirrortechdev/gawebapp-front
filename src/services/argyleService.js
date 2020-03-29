import axios from 'axios'
import Global from "../global";
import moment from "moment";

const baseURL = Global.urlArgyle;
let argyleUser;

class argyleService {
    constructor() {
        this.argyleUser = JSON.parse(localStorage.getItem("ArgyleUser"))
        this.argyleservice = axios.create({
            baseURL
        })
    }

    checkArgyleUser(loggedUser) {
        this.argyleUser = JSON.parse(localStorage.getItem("ArgyleUser"))
        if(!argyleUser){
            let data = {
                username: loggedUser.email,
                password: 'secret123'
            }
            this.login(data)
                .then(responseSignin => {
                    console.log("Argyle response: ", responseSignin)
                    localStorage.setItem("ArgyleUser", JSON.stringify(responseSignin.data.data))
                })
                .catch(err => {
                    if(err.response && err.response.data ){
                        console.log("user not found:: ", err.response.data)
                        if (err.response.data.code === "E_USER_NOT_FOUND"){
                            let data = {
                                username: loggedUser.email,
                                email: loggedUser.email,
                                firstName: loggedUser.name,
                                lastName: "Grean Acorn App",
                            }
                            this.signup(data).then(responseSignup => {
                                localStorage.setItem("ArgyleUser", JSON.stringify(responseSignup))
                            });
                        }
                    }
                })
        }
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
                'Authorization' : 'JWT ' + this.argyleUser.token
            }
        })
    }
}

export default argyleService;