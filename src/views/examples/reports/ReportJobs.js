import React from 'react';
import {Button, Card, Table, UncontrolledCollapse} from "reactstrap";
import CardBody from "reactstrap/es/CardBody";
import Moment from 'react-moment'

class ReportJobs extends React.Component{
    render() {
        return (
            <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                <tr>
                    <th></th>
                    <th scope="col">Job Name</th>
                    <th scope="col">Invoices</th>
                    <th scope="col">Expenses</th>
                    <th scope="col">Effective Labor</th>
                    <th scope="col">Profit</th>
                </tr>
                </thead>

                {this.props.jobs.length === 0 ? <tbody>
                    <tr>
                        <td>No Jobs register</td>
                    </tr>
                    </tbody> :
                    this.props.jobs.map((e, i) => {
                        if(!e.clientId) return <th>Client Delete</th>
                        let totalEstimate = e.items.reduce((acc, cv, i)=> acc +cv.subtotal,0)
                        let totalExpenses = e.expenses ? (e.expenses.reduce((acc, current, i) => acc + current.total, 0)) : 0;
                        let clientName = e.clientId.name
                        let totalInvoices = e.invoices ? e.invoices.reduce((acc,cv,i)=> acc + cv.total,0) : 0
                        let time = []
                        let payment = []
                        let effective = []
                        let effectiveTotal = []
                        let timeTotal = []

                        let totalTime = 0
                        let totalEffective = 0
                        e.workers.map((wx, i) => {
                            let timeWx
                            let paymentWx
                            let effectiveWx
                            let effectiveWxTotal
                            let paymentWxTotal

                            if(!wx.workerId) return 'Worker Delete'
                            timeWx = wx.time.reduce((acc, current, i) => acc + current.hours, 0);
                            paymentWx = wx.workerId.payment
                            effectiveWx = wx.workerId.effective

                            effectiveWxTotal = timeWx * effectiveWx
                            paymentWxTotal = timeWx * paymentWx
                            timeTotal.push(paymentWxTotal)
                            effectiveTotal.push(effectiveWxTotal)
                        
                            payment.push(paymentWx)
                            effective.push(effectiveWx)
                            time.push(timeWx)

                            return {time, payment, effective, effectiveTotal, paymentWxTotal}
                        }
                        )
                        totalEffective = effectiveTotal.reduce((acc,cv) => acc+cv,0)
                        totalTime = timeTotal.reduce((acc,cv)=> acc+cv,0)
                        let totalProfit = !totalEffective ? totalInvoices - totalExpenses : totalInvoices - totalExpenses - totalEffective;
                        let jobName = e.jobName
                        let nameClient = jobName.split('-')[0]
                        return (
                            <tbody key={i}>
                            <tr>
                                <td>
                                    <Button id={"toggle" + i} color="primary"><i
                                        className="ni ni-bold-down"></i></Button>
                                </td>
                                <td>{e.jobName}<br/> <b>Estimate total:</b> ${parseFloat(Math.round(totalEstimate * 100) / 100).toFixed(2)} USD</td>
                                <td>${parseFloat(Math.round(totalInvoices * 100) / 100).toFixed(2)} USD</td>
                                <td>${parseFloat(Math.round(totalExpenses * 100) / 100).toFixed(2)} USD</td>
                                <td>${!totalTime ? 0 :  parseFloat(Math.round(totalEffective * 100) / 100).toFixed(2)} USD</td>
                                <td>${parseFloat(Math.round(totalProfit * 100) / 100).toFixed(2)} USD</td>
                            </tr>
                            <tr>
                                <td colSpan={7}>
                                    <UncontrolledCollapse toggler={"#toggle" + i}>
                                        <Card>
                                            <CardBody>
                                                <h3>- Invoices</h3>
                                                <Table
                                                    className="align-items-center table-flush col-md-6 col-xs-12"
                                                    responsive>
                                                    <thead className="thead-light">
                                                    <tr>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">Client Name</th>
                                                        <th scope="col">Total</th>
                                                        <th scope="col">Status</th>

                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {   !e.invoices ? <tbody><tr><td>No invoices register</td></tr></tbody>:
                                                        e.invoices.length === 0 ? <tbody><tr><td>No invoices register</td></tr></tbody>:e.invoices.map((e, i)=>{
                                                        
                                                        return(
                                                        <tr>
                                                            <td><Moment format={"MMM D, YY"}>{e.date}</Moment></td>
                                                            <td>{clientName ? clientName : nameClient}</td>
                                                            <td align="right">$ {parseFloat(Math.round(e.total * 100) / 100).toFixed(2)} USD</td>
                                                            <td>{e.status}</td>
                                                        </tr>
                                                        
                                                        )
                                                    })
                                                        
                                                    }
                                                        <tr>
                                                            <td></td>
                                                            <td>Total:</td>
                                                            <td align="right">$ {parseFloat(Math.round(totalInvoices * 100) / 100).toFixed(2)} USD</td>
                                                        </tr>
                                                    </tbody>
                                                </Table>

                                                <h3>- Labor</h3>
                                                <Table
                                                    className="align-items-center table-flush col-md-6 col-xs-12"
                                                    responsive>
                                                    <thead className="thead-light">
                                                    <tr>
                                                        <th></th>
                                                        <th scope="col">Worker</th>
                                                        <th scope="col">Payroll Expense</th>
                                                        <th scope="col">Labor Expense
                                                            (Efective Rate)
                                                        </th>
                                                        <th scope="col">Hours</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {e.workers.length === 0 ? <tr><td>No workers</td></tr>: e.workers.map((wx, i) => {
                                                            if(!wx.workerId)return <td>Worker Delete</td>
                                                            let time = wx.time ? (wx.time.reduce((acc, current, i) => acc + current.hours, 0)) : 0;
                                                            let time2 = []
                                                            let hoursA 
                                                            time2.push(time)
                                                            time2.reduce((ac,cv)=> ac + cv, 0)
                                                            let effective = wx.workerId.effective ? wx.workerId.effective : 0;
                                                            let payment = wx.workerId.payment ? wx.workerId.payment : 0;
                                                            let hoursWor = wx.time.map((e,i)=>{ return e.hours})
                                                            hoursA = hoursWor.map(e=>e)
                                                            return (
                                                                <>
                                                                <tr>
                                                                    <td>
                                                                        <Button id={"toggle" + wx._id} color="primary"><i
                                                                            className="ni ni-bold-down"></i></Button>
                                                                    </td>
                                                                    <td>{wx.workerId.name}</td>
                                                                    <td align="right">$ {isNaN(parseFloat(Math.round((payment*time) * 100) / 100).toFixed(2)) ? 0 : parseFloat(Math.round((payment*time) * 100) / 100).toFixed(2)} USD</td>
                                                                    <td align="right">$ {isNaN(parseFloat(Math.round((effective*time) * 100) / 100).toFixed(2)) ? 0 : parseFloat(Math.round((effective*time) * 100) / 100).toFixed(2)} USD</td>
                                                                    <td align="right">{isNaN(time) ? 0 : time}</td>
                                                                </tr>
                                                                <tr>
                                                                <td colSpan={7}>
                                                                    <UncontrolledCollapse toggler={"#toggle" + wx._id}>
                                                                        <Card>
                                                                            <CardBody>
                                                                            <Table
                                                                                className="align-items-center table-flush col-md-6 col-xs-12"
                                                                                responsive>
                                                                                <thead className="thead-light">
                                                                                <tr>
                                                                                    <th scope="col">Date</th>
                                                                                    <th scope="col">Hours</th>


                                                                                </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {wx.time.map((e)=>{
                                                                                        return(
                                                                                            <tr>
                                                                                            <td><Moment format={"MMM D, YY"}>{e.date}</Moment></td>
                                                                                            <td>{e.hours}</td>
                                                                                            </tr>
                                                                                             
                                                                                        )})}
                                                                                </tbody>
                                                                            </Table>
                                                                            </CardBody>
                                                                        </Card>
                                                                    </UncontrolledCollapse>
                                                                </td>
                                                                </tr>
                                                                </>
                                                            )
                                                        }
                                                    )}
                                                                <tr>
                                                                    <td>Total:</td>
                                                                    <td align="right">${!totalTime ? 0 :  parseFloat(Math.round(totalTime * 100) / 100).toFixed(2)} USD</td>
                                                                    <td align="right">${!totalEffective ? 0 :  parseFloat(Math.round(totalEffective * 100) / 100).toFixed(2)} USD</td>
                                                                    <td align="right">{isNaN(time )? 0 :time.reduce((ac,cv)=>ac+cv,0)}</td>
                                                                </tr>
                                                    </tbody>
                                                </Table>

                                                <h3>- Expenses</h3>
                                                <Table
                                                    className="align-items-center table-flush col-md-8 col-xs-12"
                                                    responsive>
                                                    <thead className="thead-light">
                                                    <tr>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">Expense Type</th>
                                                        <th scope="col">Amount</th>
                                                        <th scope="col">Vendor</th>
                                                        <th scope="col">Description</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {e.expenses.length === 0 ? <tbody><tr><td>No expenses register</td></tr></tbody>:e.expenses.map((ex, ix) => {
                                                            return (
                                                                <tr>
                                                                    <td >
                                                                    <Moment format={"MMM D, YY"}>
                                                                    {ex.date}
                                                                    </Moment>
                                                                    </td>
                                                                    <td>{ex.category}</td>
                                                                    <td align="right">$ {parseFloat(Math.round(ex.total * 100) / 100).toFixed(2)} USD</td>
                                                                    <td>{ex.vendor}</td>
                                                                    <td>{ex.description}</td>
                                                                </tr>
                                                            )
                                                        }
                                                    )}
                                                                <tr>
                                                                    <td></td>
                                                                    <td>Total:</td>
                                                                    <td align="right">$ {!totalExpenses ? 0 :  parseFloat(Math.round(totalExpenses * 100) / 100).toFixed(2)} USD</td>
                                                                </tr>
                                                    </tbody>
                                                </Table>
                                            </CardBody>
                                        </Card>
                                    </UncontrolledCollapse>
                                </td>
                            </tr>

                            </tbody>
                        )
                    })}
            </Table>
        )
    }
}

export default ReportJobs;