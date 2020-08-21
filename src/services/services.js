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

    //clients
    getClients() {
        return this.service.get('/checkclients')
    }
    addClient(data) {
        return this.service.post('/createclient', data)
    }
    updateClient(id, data) {
        return this.service.patch('updateclient/' + id, data)
    }
    deleteClient(data) {
        return this.service.delete(`/deleteclient/${data}`)
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
    deleteWorker(data) {
        return this.service.delete(`/deleteworker/${data}`)
    }

    //estimates
    getEstimates(id = ""){
        return this.service.get('/checkestimates/'+ id)
    }
    getEstimate(id = ""){
        return this.service.get('/estimatedetail/'+ id)
    }
    addEstimate(data) {
        return this.service.post('/addestimate', data)
    }
    decline(data) {
        return this.service.patch(`/estimatedecline/${data}`)
    }
    deleteEstimate(data) {
        return this.service.delete(`/estimatedelete/${data}`)
    }
    sendEstimates(data){
        return this.service.post('/sendestimate', data)
    }
    updateEstimate(id, data) {
        return this.service.patch('/estimateupdate/' + id, data)
    }

    invoiceDelete(data) {
        return this.service.patch(`/invoicedelete/${data}`)
    }
    paidInvoice(data) {
        return this.service.patch(`/paidinvoice/${data}`)
    }
    convertInvoice(data) {
        return this.service.patch(`/convertinvoice/${data}`)
    }

    //jobs
    getJobs() {
        return this.service.get('/checkjobs')
    }
    openJobs() {
        return this.service.get('/openjobs')
    }
    closeJobs(){
        return this.service.get('/closeJobs')
    }
    addJob(data) {
        return this.service.post('/createjob', data)
    }
    convertJob(data) {
        return this.service.get(`/convertjob/${data}`)
    }
    closeJob(data) {
        return this.service.patch(`/closejob/${data}`)
    }
    pullWorker(data) {
        return this.service.patch(`/pullworker  /${data}`)
    }

}

export default AuthService
