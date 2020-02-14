import React from 'react';
import {Button, Card, Table, UncontrolledCollapse} from "reactstrap";
import CardBody from "reactstrap/es/CardBody";

class ReportJobs extends React.Component{
    render() {
        return (
            <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                <tr>
                    <th></th>
                    <th scope="col">Job Name</th>
                    <th scope="col">Job Total</th>
                    <th scope="col">Total Invoices</th>
                    <th scope="col">Total A/R</th>
                    <th scope="col">Labor</th>
                    <th scope="col">Expenses</th>
                    <th scope="col">Profit</th>
                </tr>
                </thead>

                {this.props.jobs.length === 0 ? <tbody>
                    <tr>
                        <td>No Jobs register</td>
                    </tr>
                    </tbody> :
                    this.props.jobs.map((e, i) => {
                        let totalInvoices = e.total ? e.total: 0;
                        let totalLabor = 0;
                        let totalExpenses = e.expenses ? (e.expenses.reduce((acc, current, i) => acc + current.total, 0)) : 0;

                        e.workers.map((wx, i) => {
                            let time = wx.time ? (wx.time.reduce((acc, current, i) => acc + current, 0)) : 0;
                            let effective = wx.workerId.effective ? wx.workerId.effective : 0;
                            totalLabor += (time * effective);
                        });

                        let totalAR = e.paid - e.total;
                        let totalProfit = totalInvoices - totalExpenses;
                        return (
                            <tbody key={i}>
                            <tr>
                                <td>
                                    <Button id={"toggle" + i} color="primary"><i
                                        className="ni ni-bold-down"></i></Button>
                                </td>
                                <td>{e.jobName}</td>
                                <td>${totalInvoices} USD</td>
                                <td>{e.paid} USD</td>
                                <td>${totalAR} USD</td>
                                <td>${totalLabor} USD</td>
                                <td>${totalExpenses} USD</td>
                                <td>${totalProfit} USD</td>
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
                                                        <th scope="col">Sent by</th>
                                                        <th scope="col">Total</th>
                                                        <th scope="col">Paid</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>{e.dateCreate}</td>
                                                            <td>{e.clientId.name}</td>
                                                            <td align="right">$ {e.total} USD</td>
                                                            <td align="right">$ {e.paid} USD</td>
                                                        </tr>
                                                    </tbody>
                                                </Table>

                                                <h3>- Labor</h3>
                                                <Table
                                                    className="align-items-center table-flush col-md-6 col-xs-12"
                                                    responsive>
                                                    <thead className="thead-light">
                                                    <tr>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">Worker</th>
                                                        <th scope="col">Payroll Expense</th>
                                                        <th scope="col">Labor Expense
                                                            (Efective Rate)
                                                        </th>
                                                        <th scope="col">Hours</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {e.workers.map((wx, i) => {
                                                            let time = wx.time ? (wx.time.reduce((acc, current, i) => acc + current, 0)) : 0;
                                                            let effective = wx.workerId.effective ? wx.workerId.effective : 0;
                                                            let payment = wx.workerId.payment ? wx.workerId.payment : 0;
                                                            let date = new Date(wx.workerId.updatedAt).toISOString().split('T')[0];
                                                            return (
                                                                <tr>
                                                                    <td key={i}>{date}</td>
                                                                    <td>{wx.workerId.name}</td>
                                                                    <td align="right">$ {payment * time} USD</td>
                                                                    <td align="right">$ {effective * time} USD</td>
                                                                    <td>{time}</td>
                                                                </tr>
                                                            )
                                                        }
                                                    )}
                                                    </tbody>
                                                </Table>

                                                <h3>- Expenses</h3>
                                                <Table
                                                    className="align-items-center table-flush col-md-8 col-xs-12"
                                                    responsive>
                                                    <thead className="thead-light">
                                                    <tr>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">Worker</th>
                                                        <th scope="col">Expense Type</th>
                                                        <th scope="col">Amount</th>
                                                        <th scope="col">Vendor</th>
                                                        <th scope="col">Description</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {e.expenses.map((ex, ix) => {
                                                            return (
                                                                <tr>
                                                                    <td>{ex.date}</td>
                                                                    <td>{ex.workerId.name}</td>
                                                                    <td>{ex.category}</td>
                                                                    <td align="right">$ {ex.total} USD</td>
                                                                    <td>{ex.vendor}</td>
                                                                    <td>{ex.description}</td>
                                                                </tr>
                                                            )
                                                        }
                                                    )}
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