import React from 'react';
import {Button, Card, Table, UncontrolledCollapse} from "reactstrap";
import CardBody from "reactstrap/es/CardBody";


class ReportWorkers extends React.Component{
    render() {
        return (
            <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                <tr>
                    <th></th>
                    <th scope="col">Worker</th>
                    <th scope="col">Payroll Expenses</th>
                    <th scope="col">Labor Expense (Effective Rate)</th>
                    <th scope="col">Hours</th>
                    <th scope="col">Total</th>
                </tr>
                </thead>

                {this.props.workers.length === 0 ? <tbody>
                    <tr>
                        <td>No workers register</td>
                    </tr>
                    </tbody> :
                    this.props.workers.map((e, i) => {
                        let totalExpenses = 0;
                        let hours = 0;
                        let expenses = [];
                        let jobs = [];
                        e.works.forEach(works => {
                            if(works.workId && works.workId.expenses){
                                works.workId.expenses.forEach(expense => {
                                    if(expense.workerId && expense.workerId._id === e._id){
                                        expense.jobName = works.workId.jobName;
                                        expenses.push(expense);
                                        totalExpenses += expense.total;
                                    }
                                });
                            }

                            if(works.workId && works.workId.workers){
                                works.workId.workers.forEach(worker => {
                                    if(worker.workerId && worker.workerId._id === e._id){
                                        var hourJob = 0
                                        worker.workerId.works.forEach(wor =>{
                                            hourJob = wor.time.reduce((acc, current) => acc + current, 0);
                                            hours += hourJob
                                        });
                                        jobs.push({
                                            jobName : works.workId.jobName,
                                            hours: hourJob,
                                            date: works.workId.dateStart + " to " + works.workId.dateEnd,
                                            payroll: e.payment * hours,
                                            effective : e.effective * hours
                                        });
                                    }
                                });
                            }

                        });

                        return (
                            <tbody key={i}>
                            <tr>
                                <td>
                                    <Button id={"toggle" + i} color="primary"><i
                                        className="ni ni-bold-down"></i></Button>
                                </td>
                                <td>{e.name}</td>
                                <td align="right">$ {e.payment * hours} USD</td>
                                <td align="right">$ {e.effective * hours} USD</td>
                                <td> {hours} </td>
                                <td align="right">$ {e.effective * hours} USD</td>
                            </tr>
                            <tr>
                                <td colSpan={7}>
                                    <UncontrolledCollapse toggler={"#toggle" + i}>
                                        <Card>
                                            <CardBody>

                                                <h3>- Labor</h3>
                                                <Table
                                                    className="align-items-center table-flush col-md-6 col-xs-12"
                                                    responsive>
                                                    <thead className="thead-light">
                                                    <tr>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">Payroll Expense</th>
                                                        <th scope="col">Labor Expense
                                                            (Efective Rate)
                                                        </th>
                                                        <th scope="col">Hours</th>
                                                        <th scope="col">Job</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {jobs.map((wx, i) => {
                                                        return (
                                                            <tr>
                                                                <td>{wx.date}</td>
                                                                <td align="right">$ {wx.payroll}  USD</td>
                                                                <td align="right">$ {wx.effective} USD</td>
                                                                <td>{wx.hours}</td>
                                                                <td>{wx.jobName}</td>
                                                            </tr>
                                                        )
                                                        }
                                                    )}
                                                    </tbody>
                                                </Table>

                                                {/*<h3>- Expenses</h3>
                                                <Table
                                                    className="align-items-center table-flush col-md-8 col-xs-12"
                                                    responsive>
                                                    <thead className="thead-light">
                                                    <tr>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">Expense Type</th>
                                                        <th scope="col">Amount</th>
                                                        <th scope="col">Vendor</th>
                                                        <th scope="col">Job</th>
                                                        <th scope="col">Description</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {expenses.map((ex, i) => {
                                                        return (
                                                            <tr>
                                                                <td>{ex.date}</td>
                                                                <td>{ex.category}</td>
                                                                <td align="right">$ {ex.total} USD</td>
                                                                <td>{ex.vendor}</td>
                                                                <td>{ex.jobName}</td>
                                                                <td>{ex.description}</td>
                                                            </tr>
                                                        )
                                                    }
                                                    )}
                                                    </tbody>
                                                </Table>
                                                */}
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

export default ReportWorkers;