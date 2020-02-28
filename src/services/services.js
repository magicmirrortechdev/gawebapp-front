import axios from 'axios'
import Global from "../global";

const baseURL = Global.url;

class AuthService {
    constructor() {
        this.service = axios.create({
            baseURL,
            withCredentials: true
        })
    }
    signup(data) {
        return this.service.post('/signup', data)
    }
    login(data) {
        return this.service.post('/login', data)
    }
    logout() {
        return this.service.get('/logout')
    }
    addClient(data) {
        return this.service.post('/createclient', data)
    }
    addJob(data) {
        return this.service.post('/createjob', data)
    }
    addWorker(data) {
        return this.service.post('/addworker', data)
    }
    addEstimate(data) {
        return this.service.post('/addestimate', data)
    }
    convertInvoice(data) {
        return this.service.patch(`/convertinvoice/${data}`)
    }
    convertJob(data) {
        return this.service.patch(`/convertjob/${data}`)
    }
    paidInvoice(data) {
        return this.service.patch(`/paidinvoice/${data}`)
    }
    decline(data) {
        return this.service.patch(`/estimatedecline/${data}`)
    }
    estimateDelete(data) {
        return this.service.delete(`/estimatedelete/${data}`)
    }
    invoiceDelete(data) {
        return this.service.patch(`/invoicedelete/${data}`)
    }
    workerDelete(data) {
        return this.service.delete(`/deleteworker/${data}`)
    }
    clientDelete(data) {
        return this.service.delete(`/deleteclient/${data}`)
    }

}

export default AuthService