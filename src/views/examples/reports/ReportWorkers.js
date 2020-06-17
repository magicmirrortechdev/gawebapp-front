import React from 'react';
import {Button, Card, Table, UncontrolledCollapse, Badge} from "reactstrap";
import CardBody from "reactstrap/es/CardBody";
import Moment from "react-moment";

class ReportWorkers extends React.Component{
    render() {
        if(!this.props.workers) return <p>Loading</p>
        return (
            <div className="div_workers">
                <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                    <tr>
                        <th style={{width: "100px"}}></th>
                        <th scope="col">Worker</th>
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
                            let jobs = [];
                            let reports = [];
                            let hoursPerJob = []
                            let hoursTime = 0
                            let hoursFull = []

                            e.works.map((e, i) => {
                                e.time.map((time, i) => {
                                    hoursTime += time.hours;
                                    hoursFull.push({hoursT: time.hours, date: time.date})
                                    hoursPerJob.push({works: e._id,  time: time.hours, date: time.date, hours: hoursFull})
                                })
                            })

                            e.works.map(works => {
                                if(works.workId instanceof Array ){ //search

                                    works.workId.map(work => {
                                        if(works.time.length > 0){
                                            let hours = 0
                                            let date
                                            let hoursT
                                            hoursPerJob.map(hoursTime => {
                                                if(hoursTime.works == work._id){
                                                    hours += hoursTime.time
                                                    date = hoursTime.date
                                                    hoursT = hoursTime.hours

                                                    jobs.push({
                                                        date: hoursTime.date,
                                                        jobName : work.jobName,
                                                        hours: hoursTime.time,
                                                        hoursT: hoursTime.time,
                                                        payroll: e.payment * hoursTime.time,
                                                        effective : e.effective * hoursTime.time,
                                                    });

                                                }
                                            });
                                        }
                                    });

                                }else{

                                    if(works.workId && works.workId.workers){
                                        works.workId.workers.map(worker => {
                                            if(worker.workerId && worker.workerId._id === e._id ) {
                                                let hours = 0
                                                let date
                                                let hoursT
                                                hoursPerJob.map(hoursTime => {
                                                    if (hoursTime.works == works._id) {
                                                        hours += hoursTime.time
                                                        date = hoursTime.date
                                                        hoursT = hoursTime.hours

                                                        jobs.push({
                                                            date: hoursTime.date,
                                                            jobName : works.workId.jobName,
                                                            hours: hoursTime.time,
                                                            hoursT: hoursTime.time,
                                                            payroll: e.payment * hoursTime.time,
                                                            effective : e.effective * hoursTime.time,
                                                        });

                                                    }
                                                });
                                            }
                                        });
                                    }
                                }
                            });

                            let totalPayroll = []
                            let totalEffective = []
                            let totalHours = []
                            jobs.map((e,i)=>{
                                totalPayroll.push(e.payroll)
                                totalEffective.push(e.effective)
                                totalHours.push(e.hours)

                                return{totalPayroll, totalEffective, totalHours}
                            })
                            return (
                                <tbody key={i}>
                                    <tr>
                                        <td>
                                            <Button id={"toggle" + i} color="primary"><i
                                                className="ni ni-bold-down"></i></Button>
                                        </td>
                                        <td>{e.name} &nbsp; &nbsp; <Badge style={{fontSize:"12px"}} color="info">{e.role}</Badge></td>
                                    </tr>
                                    <tr>
                                        <td colSpan={7}>
                                            <UncontrolledCollapse toggler={"#toggle" + i}>
                                                <Card>
                                                    <CardBody>
                                                        <div className="div_reports">
                                                            <Table
                                                                className="align-items-center table-flush col-md-6 col-xs-12"
                                                                responsive>
                                                                <thead className="thead-light">
                                                                <tr>
                                                                    <th scope="col">Job Date</th>
                                                                    <th scope="col">Job</th>
                                                                    <th scope="col">Payroll Expense</th>
                                                                    <th scope="col">Labor Expense
                                                                        (Effective Rate)
                                                                    </th>
                                                                    <th scope="col">Hours</th>

                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                {jobs.map((wx, i) => {
                                                                        return (
                                                                            <>
                                                                                <tr>
                                                                                    <td><Moment add={{days:1}} format={"MMM D, YY"}>{wx.date}</Moment></td>
                                                                                    <td>{wx.jobName}</td>
                                                                                    <td align="right">$ {isNaN(parseFloat(Math.round(wx.payroll * 100) / 100).toFixed(2)) ? 0 : parseFloat(Math.round(wx.payroll * 100) / 100).toFixed(2)}  </td>
                                                                                    <td align="right">$ {isNaN(parseFloat(Math.round(wx.effective * 100) / 100).toFixed(2)) ? 0 : parseFloat(Math.round(wx.effective * 100) / 100).toFixed(2)} </td>
                                                                                    <td align="right">{isNaN(parseFloat(Math.round(wx.hours * 100) / 100).toFixed(2)) ? 0 : parseFloat(Math.round(wx.hours * 100) / 100).toFixed(2)} </td>
                                                                                </tr>
                                                                            </>
                                                                        )
                                                                    }
                                                                )}
                                                                <tr>
                                                                    <td></td>
                                                                    <td align="right">Total:</td>
                                                                    <td align="right">$ {isNaN(parseFloat(Math.round(totalPayroll.reduce((ac,cv)=> ac+cv,0) * 100) / 100).toFixed(2)) ? 0 : parseFloat(Math.round(totalPayroll.reduce((ac,cv)=> ac+cv,0) * 100) / 100).toFixed(2)}</td>
                                                                    <td align="right">$ {isNaN(parseFloat(Math.round(totalEffective.reduce((ac,cv)=> ac+cv,0) * 100) / 100).toFixed(2)) ? 0 : parseFloat(Math.round(totalEffective.reduce((ac,cv)=> ac+cv,0) * 100) / 100).toFixed(2)}</td>
                                                                    <td align="right">{isNaN(totalHours.reduce((ac,cv)=> ac+cv,0)) ? 0.00 : totalHours.reduce((ac,cv)=> ac+cv,0).toFixed(2)}</td>
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
                                                                    <th scope="col">Job</th>
                                                                    <th scope="col">Description</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                {
                                                                    !e.expenses ? <p>Loading</p> :
                                                                        e.expenses.map((ex, i) => {

                                                                                return (
                                                                                    <tr>
                                                                                        <td><Moment add={{days:1}} format={"MMM D, YY"}>{ex.date}</Moment></td>
                                                                                        <td>{ex.category}</td>
                                                                                        <td align="right">$ {ex.total}</td>
                                                                                        <td>{ex.vendor}</td>
                                                                                        <td>{ex.jobName}</td>
                                                                                        <td>{ex.description}</td>
                                                                                    </tr>
                                                                                )
                                                                            }
                                                                        )}
                                                                </tbody>
                                                            </Table>

                                                        </div>

                                                    </CardBody>
                                                </Card>
                                            </UncontrolledCollapse>
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        })}
                </Table>
            </div>
        )
    }
}

export default ReportWorkers;
