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

    //users
    getUsers() {
        return this.service.get('/getusers')
    }
    addWorker(data) {
        return this.service.post('/addworker', data)
    }
    updateWorker(id, data) {
        return this.service.patch('updateworker/' + id, data)
    }
    workerDelete(data) {
        return this.service.delete(`/deleteworker/${data}`)
    }

    //estimates
    addEstimate(data) {
        return this.service.post('/addestimate', data)
    }
    convertInvoice(data) {
        return this.service.patch(`/convertinvoice/${data}`)
    }
    convertJob(data) {
        return this.service.get(`/convertjob/${data}`)
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
    clientDelete(data) {
        return this.service.delete(`/deleteclient/${data}`)
    }
    closeJob(data) {
        return this.service.patch(`/closejob/${data}`)
    }
    pullWorker(data) {
        return this.service.patch(`/pullworker  /${data}`)
    }

}

export default AuthService
