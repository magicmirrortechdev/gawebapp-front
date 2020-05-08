import React from 'react';
import {Button, Card, Table, UncontrolledCollapse, Badge} from "reactstrap";
import CardBody from "reactstrap/es/CardBody";
import Moment from "react-moment";

class ReportWorkers extends React.Component{
    render() {
        if(!this.props.workers) return <p>Loading</p>
        return (
            <Table className="align-items-center table-flush" responsive>
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
                        let expenses = [];
                        let jobs = [];
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
                            if(works.workId instanceof Array ){ //search
                                if(works.workId[0] && works.workId[0].expenses){
                                    works.workId[0].expenses.map(expense => {
                                        if(expense.workerId && expense.workerId === e._id){
                                            expense.jobName = works.workId[0].jobName;
                                            expenses.push(expense);
                                            totalExpenses += expense.total;
                                        }
                                    });
                                }

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

                                if(works.workId && works.workId.expenses){
                                    works.workId.expenses.map(expense => {
                                        if(expense.workerId && expense.workerId._id === e._id){
                                            expense.jobName = works.workId.jobName;
                                            expenses.push(expense);
                                            totalExpenses += expense.total;
                                        }
                                    });
                                }

                                if(works.workId && works.workId.workers){
                                    works.workId.workers.map(worker => {
                                        if(worker.workerId && worker.workerId._id === e._id ){
                                            let hours = 0
                                            let date
                                            let hoursT
                                            hoursPerJob.map(hoursTime => {
                                                if(hoursTime.works == works._id){
                                                    hours += hoursTime.time
                                                    date = hoursTime.date
                                                    hoursT = hoursTime.hours
                                                }
                                            });

                                            jobs.push({
                                                jobName : works.workId.jobName,
                                                hours: hours,
                                                hoursT: hoursT,
                                                payroll: e.payment * hours,
                                                effective : e.effective * hours,
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
                                {/*
                                <td align="right">$ {e.payment * hoursTime} </td>
                                <td align="right">$ {e.effective * hoursTime} </td>
                                <td> {hoursTime} </td>
                                <td align="right">$ {e.effective * hoursTime} </td>
                                 */}
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
                                                        <th scope="col">Job</th>
                                                        <th scope="col">Payroll Expense</th>
                                                        <th scope="col">Labor Expense
                                                            (Efective Rate)
                                                        </th>
                                                        <th scope="col">Hours</th>
                                                        
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {jobs.map((wx, i) => {
                                                        return (
                                                            <>
                                                            <tr>
                                                                {/*
                                                                    <td>
                                                                     <Button id={"toggle" + e._id} color="primary"><i
                                                                        className="ni ni-bold-down"></i></Button>
                                                                    </td>
                                                                */}
                                                                <td>{wx.jobName}</td>
                                                                <td align="right">$ {isNaN(parseFloat(Math.round(wx.payroll * 100) / 100).toFixed(2)) ? 0 : parseFloat(Math.round(wx.payroll * 100) / 100).toFixed(2)}  </td>
                                                                <td align="right">$ {isNaN(parseFloat(Math.round(wx.effective * 100) / 100).toFixed(2)) ? 0 : parseFloat(Math.round(wx.effective * 100) / 100).toFixed(2)} </td>
                                                                <td>{isNaN(parseFloat(Math.round(wx.hours * 100) / 100).toFixed(2)) ? 0 : parseFloat(Math.round(wx.hours * 100) / 100).toFixed(2)} </td>
                                                                
                                                            </tr>
                                                        {/*
                                                            <tr>
                                                                <td colSpan={7}>
                                                                    <UncontrolledCollapse toggler={"#toggle" + e._id}>
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
                                                                                    {!wx.hoursT? <td>No hours available</td>: wx.hoursT.map((e)=>{
                                                                                        return(
                                                                                            <tr>
                                                                                            <td><Moment format={"MMM D, YY"}>{e.date === undefined || e.date === "Invalid Date" ? 'No available or delete' : e.date}</Moment></td>
                                                                                            <td>{e.hoursT === undefined ? 'No available or delete' : e.hoursT}</td>
                                                                                            </tr>
                                                                                             
                                                                                        )})}         
                                                                                </tbody>
                                                                            </Table>
                                                                            </CardBody>
                                                                        </Card>
                                                                    </UncontrolledCollapse>
                                                                </td>
                                                            </tr>
                                                        */}
                                                            </>
                                                        )
                                                        }
                                                    )}
                                                    <tr>
                                                    <td align="right">Total:</td>
                                                    <td align="right">$ {isNaN(parseFloat(Math.round(totalPayroll.reduce((ac,cv)=> ac+cv,0) * 100) / 100).toFixed(2)) ? 0 : parseFloat(Math.round(totalPayroll.reduce((ac,cv)=> ac+cv,0) * 100) / 100).toFixed(2)}</td>
                                                    <td align="right">$ {isNaN(parseFloat(Math.round(totalEffective.reduce((ac,cv)=> ac+cv,0) * 100) / 100).toFixed(2)) ? 0 : parseFloat(Math.round(totalEffective.reduce((ac,cv)=> ac+cv,0) * 100) / 100).toFixed(2)}</td>
                                                    <td>{isNaN(totalHours.reduce((ac,cv)=> ac+cv,0)) ? 0 : totalHours.reduce((ac,cv)=> ac+cv,0)}</td>

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