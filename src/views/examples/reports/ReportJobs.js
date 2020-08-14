import React from 'react';
import {Button, Card, Table, UncontrolledCollapse, Row, Col} from "reactstrap";
import CardBody from "reactstrap/es/CardBody";
import Moment from 'react-moment'
import {compareValues} from  "../../../global";

const DropDownExpense = (props) =>{
    return(
        <UncontrolledCollapse key={props.id} toggler={"#toggle" + props.id}>
            {!props.isMobileVersion?
                <Card>
                    <CardBody>
                        <Table
                            className="align-items-center table-flush col-md-6 col-xs-12"
                            responsive>
                            <thead className="thead-light">
                            <tr>
                                <th>Date</th>
                                <th>Hours</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                props.time.sort(compareValues('date','desc')).map((e, i)=>{
                                    return(
                                        <tr key={i}>
                                            <td><Moment add={{days: 1}} format={"MMM D, YY"}>{e.date}</Moment></td>
                                            <td>{e.hours}</td>
                                        </tr>

                                    )})}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
                :
                <>
                    <ul style={{"list-style-type": "none"}}>
                        {
                        props.time.sort(compareValues('date','desc')).map((e, i)=>{
                            return(
                                <li key={i}>
                                    Date:<b> <Moment add={{days: 1}} format={"MMM D, YY"}>{e.date}</Moment></b> -
                                    Hours:<b> {e.hours}</b>
                                </li>
                            )})
                        }
                    </ul>
                </>
            }
        </UncontrolledCollapse>
    )
}

class ReportJobs extends React.Component{

    handleModal = (estimateId, expenseId ) => (e) =>{
        this.props.openModal(estimateId, expenseId)
    }

    render() {
        return (
            <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                <tr>
                    {!this.props.isMobileVersion ?
                        <>
                            <th></th>
                            <th>Job Name</th>
                            <th>Invoices</th>
                            <th>Expenses</th>
                            <th>Effective Labor</th>
                            <th>Profit</th>
                        </>
                        :
                        <>
                            <th>Details</th>
                        </>
                    }
                </tr>
                </thead>
                <tbody>
                    {this.props.jobs.length === 0 ?
                    <tr>
                        <td>No Jobs register</td>
                    </tr>
                    :
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
                        })
                        totalEffective = effectiveTotal.reduce((acc,cv) => acc+cv,0)
                        totalTime = timeTotal.reduce((acc,cv)=> acc+cv,0)
                        let totalProfit = !totalEffective ? totalInvoices - totalExpenses : totalInvoices - totalExpenses - totalEffective;
                        let jobName = e.jobName
                        let nameClient = jobName.split('-')[0]
                        e.invoices.sort(compareValues('date','desc'))
                        e.expenses.sort(compareValues('date','desc'))

                        return (
                            <React.Fragment key={i}>
                                <tr >
                                    {!this.props.isMobileVersion ?
                                        <React.Fragment key={i}>
                                            <td>
                                                <Button id={"toggle" + i} color="primary"><i className="ni ni-bold-down"></i></Button>
                                            </td>
                                            <td>{e.jobName}<br/> <b>Estimate
                                                total:</b> ${parseFloat(Math.round(totalEstimate * 100) / 100).toFixed(2)}
                                            </td>
                                            <td>${parseFloat(Math.round(totalInvoices * 100) / 100).toFixed(2)}</td>
                                            <td>${parseFloat(Math.round(totalExpenses * 100) / 100).toFixed(2)}</td>
                                            <td>${!totalTime ? 0 : parseFloat(Math.round(totalEffective * 100) / 100).toFixed(2)}</td>
                                            <td>${parseFloat(Math.round(totalProfit * 100) / 100).toFixed(2)}</td>
                                        </React.Fragment>
                                        :
                                        <React.Fragment key={i}>
                                            <td className="tdMobile">
                                                {e.jobName} <br/>
                                                <small>Estimate total: </small><b>${parseFloat(Math.round(totalEstimate * 100) / 100).toFixed(2)}</b><br/>
                                                <Row>
                                                    <Col>
                                                        <small>Invoices: </small><b>${parseFloat(Math.round(totalInvoices * 100) / 100).toFixed(2)}</b>
                                                    </Col>
                                                    <Col>
                                                        <small>Expenses: </small><b>${parseFloat(Math.round(totalInvoices * 100) / 100).toFixed(2)}</b>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <small>Effective Labor: </small><b>${parseFloat(Math.round(totalInvoices * 100) / 100).toFixed(2)}</b>
                                                    </Col>
                                                    <Col>
                                                        <small>Profit: </small><b>${parseFloat(Math.round(totalInvoices * 100) / 100).toFixed(2)}</b>
                                                    </Col>
                                                </Row>
                                                <Button id={"toggle" + i} color="primary"><i className="ni ni-bold-down"></i></Button>
                                            </td>
                                        </React.Fragment>
                                    }
                                </tr>
                                <tr>
                                <td colSpan={this.props.isMobileVersion? 1 : 7}>
                                    <UncontrolledCollapse toggler={"#toggle" + i}>
                                        {!this.props.isMobileVersion ?
                                            <Card>
                                                <CardBody>
                                                    <h3>- Invoices</h3>
                                                    <Table
                                                        className="align-items-center table-flush col-md-6 col-xs-12"
                                                        responsive>
                                                        <thead className="thead-light">
                                                            <tr>
                                                                <th >Date</th>
                                                                <th >Client Name</th>
                                                                <th >Total</th>
                                                                <th >Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {   !e.invoices ?<tr><td>No invoices register</td></tr>:
                                                                e.invoices.length === 0 ? <tr><td>No invoices register</td></tr>
                                                                    : e.invoices.map((e, i)=>{
                                                                    const paid = e.payment.reduce((acc, current, i) => acc + current.paid, 0)
                                                                    return(
                                                                        <tr key={i}>
                                                                            <td><Moment add={{days: 1}} format={"MMM D, YY"}>{e.date}</Moment></td>
                                                                            <td>{clientName ? clientName : nameClient}</td>
                                                                            <td align="right">$ {parseFloat(Math.round(e.total * 100) / 100).toFixed(2)}</td>
                                                                            <td>{ e.total-paid === 0 ? 'Paid' : e.status}</td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                            <tr>
                                                                <td></td>
                                                                <td>Total:</td>
                                                                <td align="right">$ {parseFloat(Math.round(totalInvoices * 100) / 100).toFixed(2)}</td>
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
                                                            <th>Worker</th>
                                                            <th>Payroll Expense</th>
                                                            <th>Labor Expense
                                                                (Efective Rate)
                                                            </th>
                                                            <th>Hours</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {e.workers.length === 0 ? <tr><td>No workers</td></tr>
                                                            : e.workers.sort(compareValues('date','asc')).map((wx, i) => {
                                                                if(!wx.workerId)return <tr><td>Worker Delete</td></tr>
                                                                let time = wx.time ? (wx.time.reduce((acc, current, i) => acc + current.hours, 0)) : 0;
                                                                let time2 = []
                                                                time2.push(time)
                                                                time2.reduce((ac,cv)=> ac + cv, 0)
                                                                let effective = wx.workerId.effective ? wx.workerId.effective : 0;
                                                                let payment = wx.workerId.payment ? wx.workerId.payment : 0;
                                                                return (
                                                                    <React.Fragment key={i}>
                                                                        <tr>
                                                                            <td>
                                                                                <Button id={"toggle" + wx._id} color="primary">
                                                                                    <i className="ni ni-bold-down"></i>
                                                                                </Button>
                                                                            </td>
                                                                            <td>{wx.workerId.name}</td>
                                                                            <td align="right">$ {isNaN(parseFloat(Math.round((payment*time) * 100) / 100).toFixed(2)) ? 0 : parseFloat(Math.round((payment*time) * 100) / 100).toFixed(2)} </td>
                                                                            <td align="right">$ {isNaN(parseFloat(Math.round((effective*time) * 100) / 100).toFixed(2)) ? 0 : parseFloat(Math.round((effective*time) * 100) / 100).toFixed(2)}</td>
                                                                            <td align="right">{isNaN(time) ? 0 : time}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td colSpan={7}>
                                                                                <DropDownExpense key={wx._id} id={wx._id} time={wx.time}></DropDownExpense>
                                                                            </td>
                                                                        </tr>
                                                                    </React.Fragment>
                                                                )
                                                            }
                                                        )}
                                                        <tr>
                                                            <td></td>
                                                            <td>Total:</td>
                                                            <td align="right">${!totalTime ? 0 :  parseFloat(Math.round(totalTime * 100) / 100).toFixed(2)}</td>
                                                            <td align="right">${!totalEffective ? 0 :  parseFloat(Math.round(totalEffective * 100) / 100).toFixed(2)}</td>
                                                            <td align="right">{isNaN(time.reduce((ac,cv)=>ac+cv,0)) ? 0 :time.reduce((ac,cv)=>ac+cv,0)}</td>
                                                        </tr>
                                                        </tbody>
                                                    </Table>
                                                    <h3>- Expenses</h3>
                                                    <Table
                                                        className="align-items-center table-flush col-md-8 col-xs-12"
                                                        responsive>
                                                    <thead className="thead-light">
                                                    <tr>
                                                        <th></th>
                                                        <th >Date</th>
                                                        <th >Expense Type</th>
                                                        <th >Amount</th>
                                                        <th >Vendor</th>
                                                        <th >Description</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {e.expenses.length === 0 ? <tr><td>No expenses register</td></tr>
                                                        : e.expenses.map((ex, ix) => {
                                                            return (
                                                                <tr key={ix}>
                                                                    <td><Button onClick={this.handleModal(e._id, ex._id)}><i className="fas fa-receipt"></i> View</Button> </td>
                                                                    <td>
                                                                        <Moment add={{days: 1}} format={"MMM D, YY"}>
                                                                            {ex.date}
                                                                        </Moment>
                                                                    </td>
                                                                    <td>{ex.category}</td>
                                                                    <td align="right">$ {parseFloat(Math.round(ex.total * 100) / 100).toFixed(2)}</td>
                                                                    <td>{ex.vendor}</td>
                                                                    <td>{ex.description}</td>
                                                                </tr>
                                                            )
                                                        }
                                                    )}
                                                    <tr>
                                                        <td></td>
                                                        <td>Total:</td>
                                                        <td align="right">$ {!totalExpenses ? 0 :  parseFloat(Math.round(totalExpenses * 100) / 100).toFixed(2)}</td>
                                                    </tr>
                                                    </tbody>
                                                </Table>
                                                </CardBody>
                                            </Card>
                                            :
                                            <>
                                                <Table
                                                    className="align-items-center table-flush table-striped col-xs-12">
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th  align="center"><b>Invoices</b></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {   !e.invoices ?<tr><td>No invoices register</td></tr> :
                                                        e.invoices.length === 0 ? <tr><td>No invoices register</td></tr> :
                                                            e.invoices.map((e, i)=>{
                                                            const paid = e.payment.reduce((acc, current, i) => acc + current.paid, 0)
                                                            return(
                                                                <tr key={i}>
                                                                    <td>
                                                                        <Moment add={{days: 1}} format={"MMM D, YY"}>{e.date}</Moment> <b>({ e.total-paid === 0 ? 'Paid' : e.status})</b> $ {parseFloat(Math.round(e.total * 100) / 100).toFixed(2)}<br/>
                                                                        Client: {clientName ? clientName : nameClient}<br/>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                    </tbody>
                                                </Table>
                                                <Table
                                                    className="align-items-center table-flush table-striped col-xs-12">
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th  align="center"><b>Labor</b></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {e.workers.length === 0 ? <tr><td>No workers</td></tr>
                                                        : e.workers.sort(compareValues('date','asc')).map((wx, i) => {
                                                            if(!wx.workerId)return <tr><td>Worker Delete</td></tr>
                                                            let time = wx.time ? (wx.time.reduce((acc, current, i) => acc + current.hours, 0)) : 0;
                                                            let time2 = []
                                                            time2.push(time)
                                                            time2.reduce((ac,cv)=> ac + cv, 0)
                                                            let effective = wx.workerId.effective ? wx.workerId.effective : 0;
                                                            let payment = wx.workerId.payment ? wx.workerId.payment : 0;
                                                            return (
                                                                <React.Fragment key={i}>
                                                                    <tr>
                                                                        <td>
                                                                            <Row>
                                                                                <Col>
                                                                                    Worker: <b>{wx.workerId.name}</b>
                                                                                </Col>
                                                                                <Col>
                                                                                    Hour: <b>{isNaN(time) ? 0 : time}</b><br/>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row>
                                                                                <Col>
                                                                                    Payroll Expense: <b>$ {isNaN(parseFloat(Math.round((payment*time) * 100) / 100).toFixed(2)) ? 0 : parseFloat(Math.round((payment*time) * 100) / 100).toFixed(2)}</b>
                                                                                </Col>
                                                                                <Col>
                                                                                    Labor Expense: <b>$ {isNaN(parseFloat(Math.round((effective*time) * 100) / 100).toFixed(2)) ? 0 : parseFloat(Math.round((effective*time) * 100) / 100).toFixed(2)}</b>
                                                                                </Col>
                                                                            </Row>
                                                                            <Button id={"toggle" + wx._id} color="primary"> <i className="ni ni-bold-down"></i></Button>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td colSpan={7}>
                                                                            <DropDownExpense key={wx._id} id={wx._id} time={wx.time} isMobileVersion={this.props.isMobileVersion}></DropDownExpense>
                                                                        </td>
                                                                    </tr>
                                                                </React.Fragment>
                                                            )
                                                        }
                                                    )}
                                                    </tbody>
                                                </Table>
                                                <Table
                                                    className="align-items-center table-striped table-flush col-xs-12">
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th  align="center"><b>Expenses</b></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {e.expenses.length === 0 ? <tr><td>No expenses register</td></tr>
                                                        : e.expenses.map((ex, ix) => {
                                                            return (
                                                                <tr key={ix}>
                                                                    <td>
                                                                        <Moment add={{days: 1}} format={"MMM D, YY"}>
                                                                            {ex.date}
                                                                        </Moment>&nbsp;
                                                                        <b>({ex.category})</b><br/>
                                                                        $ {parseFloat(Math.round(ex.total * 100) / 100).toFixed(2)}<br/>
                                                                        {ex.vendor}<br/>
                                                                        {ex.description}<br/>
                                                                        <div className="buttonfloat-right buttonfloat-right-times">
                                                                            <Button onClick={this.handleModal(e._id, ex._id)}><i className="fas fa-receipt"></i> View</Button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                    </tbody>
                                                </Table>
                                            </>
                                        }
                                    </UncontrolledCollapse>
                                </td>
                            </tr>
                        </React.Fragment>
                        )
                    })}
                </tbody>
            </Table>
        )
    }
}

export default ReportJobs;
