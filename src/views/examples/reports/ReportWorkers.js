import React from 'react';
import {Button, Card, Table, UncontrolledCollapse, Badge} from "reactstrap";
import CardBody from "reactstrap/es/CardBody";
import Moment from "react-moment";

class ReportWorkers extends React.Component{
    render() {
        if(!this.props.workers) return <p>Loading</p>
        return (
            <Table className="align-items-center table-flush">
                <thead className="thead-light">
                <tr>
                    <th style={{width: "100px"}}></th>
                    <th scope="col">Worker</th>
                    {/*
                        
                    <th scope="col">Payroll Expenses</th>
                    <th scope="col">Labor Expense (Effective Rate)</th>
                    <th scope="col">Hours</th>
                    <th scope="col">Total</th>
                    */}
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
                        let dateTime = []
                        let hoursFull = []

                        e.works.map((e, i) => {
                            e.time.map((time, i) => {
                                hoursTime += time.hours;
                                hoursFull.push({hoursT: time.hours, date: time.date})
                                dateTime.push(time.date)
                                hoursPerJob.push({works: e._id,  time: time.hours, date: dateTime, hours: hoursFull})
                            })
                        })

                        e.works.map(works => {
                            console.log(works.workId instanceof Array);
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
                                            }
                                        });

                                        jobs.push({
                                            jobName : work.jobName,
                                            hours: hours,
                                            hoursT: hoursT,
                                            payroll: e.payment * hours,
                                            effective : e.effective * hours,
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
                                                }
                                            });

                                            jobs[works.workId.jobName] = {
                                                jobName: works.workId.jobName,
                                                hours: hours,
                                                hoursT: hoursT,
                                                payroll: e.payment * hours,
                                                effective: e.effective * hours,
                                                checked: false
                                            };
                                        }
                                    });
                                }
                            }
                        });

                        e.expenses.map(expenses =>{
                            if (jobs[expenses.jobName] != null) {
                                reports.push({
                                    jobName: jobs[expenses.jobName].jobName,
                                    hours: jobs[expenses.jobName].hours,
                                    hoursT: jobs[expenses.jobName].hoursT,
                                    payroll: jobs[expenses.jobName].payroll,
                                    effective: jobs[expenses.jobName].effective,
                                    date: expenses.date,
                                    category: expenses.category,
                                    total: expenses.total,
                                    vendor: expenses.vendor,
                                    description: expenses.description
                                });
                                jobs[expenses.jobName].checked = true;
                            } else {
                                reports.push({
                                    jobName: expenses.jobName,
                                    date: expenses.date,
                                    category: expenses.category,
                                    total: expenses.total,
                                    vendor: expenses.vendor,
                                    description: expenses.description
                                });
                            }
                        });

                        e.works.map(works => {
                            if (works.workId != null &&
                                jobs[works.workId.jobName] != null &&
                                jobs[works.workId.jobName].checked === false){
                                reports.push({
                                    jobName: jobs[works.workId.jobName].jobName,
                                    hours: jobs[works.workId.jobName].hours,
                                    hoursT: jobs[works.workId.jobName].hoursT,
                                    payroll: jobs[works.workId.jobName].payroll,
                                    effective: jobs[works.workId.jobName].effective,
                                    date: ''
                                });
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
                                                    <h3>- Reports</h3>
                                                    <Table
                                                        className="align-items-center table-flush col-md-6 col-xs-12 table-reports"
                                                        responsive>
                                                        <thead className="thead-light">
                                                        <tr>
                                                            <th scope="col">Expense Date</th>
                                                            <th scope="col">Expense Type</th>
                                                            <th scope="col">Expense Amount</th>
                                                            <th scope="col">Expense Vendor</th>
                                                            <th scope="col">Expense Description</th>
                                                            <th scope="col">Job</th>
                                                            <th scope="col">Payroll Expense</th>
                                                            <th scope="col">Labor Expense(Efective Rate)</th>
                                                            <th scope="col">Hours</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {reports.map((re, i) => {
                                                            return(
                                                                <>
                                                                    <tr>
                                                                        <td><Moment add={{days:1}} format={"MMM D, YY"}>{re.date}</Moment></td>
                                                                        <td>{re.category}</td>
                                                                        <td align="right">$ {re.total}</td>
                                                                        <td>{re.vendor}</td>
                                                                        <td>{re.description}</td>
                                                                        <td>{re.jobName}</td>
                                                                        <td align="right">$ {isNaN(parseFloat(Math.round(re.payroll * 100) / 100).toFixed(2)) ? 0 : parseFloat(Math.round(re.payroll * 100) / 100).toFixed(2)}  </td>
                                                                        <td align="right">$ {isNaN(parseFloat(Math.round(re.effective * 100) / 100).toFixed(2)) ? 0 : parseFloat(Math.round(re.effective * 100) / 100).toFixed(2)} </td>
                                                                        <td>{isNaN(parseFloat(Math.round(re.hours * 100) / 100).toFixed(2)) ? 0 : parseFloat(Math.round(re.hours * 100) / 100).toFixed(2)} </td>
                                                                    </tr>
                                                                </>
                                                            )
                                                        })}

                                                        <tr>
                                                            <td colSpan={5}></td>
                                                            <td align="right">Total:</td>
                                                            <td align="right">$ {isNaN(parseFloat(Math.round(totalPayroll.reduce((ac,cv)=> ac+cv,0) * 100) / 100).toFixed(2)) ? 0 : parseFloat(Math.round(totalPayroll.reduce((ac,cv)=> ac+cv,0) * 100) / 100).toFixed(2)}</td>
                                                            <td align="right">$ {isNaN(parseFloat(Math.round(totalEffective.reduce((ac,cv)=> ac+cv,0) * 100) / 100).toFixed(2)) ? 0 : parseFloat(Math.round(totalEffective.reduce((ac,cv)=> ac+cv,0) * 100) / 100).toFixed(2)}</td>
                                                            <td>{isNaN(totalHours.reduce((ac,cv)=> ac+cv,0)) ? 0 : totalHours.reduce((ac,cv)=> ac+cv,0)}</td>

                                                        </tr>
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
        )
    }
}

export default ReportWorkers;
