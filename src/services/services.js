import axios from 'axios'
const baseURL = 'http://localhost:3000'

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
    addExpense(data) {
        return this.service.post('/addexpense', data)
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
    decline(data) {
        return this.service.patch(`/estimatedecline/${data}`)
    }

}

export default AuthService