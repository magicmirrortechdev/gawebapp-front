import React from 'react';
import {Button, Card, Table, UncontrolledCollapse, Badge, Row, Col} from "reactstrap";
import CardBody from "reactstrap/es/CardBody";
import Moment from "react-moment";
import {compareValues} from  "../../../global";

const DropDownExpense = (props) =>{
    return (
        <UncontrolledCollapse toggler={"#toggle" + props.i}>
            {!props.isMobileVersion?
                <Card>
                    <CardBody>
                        <div className="div_reports">
                            <h3>- Labors</h3>
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
                                {props.jobs.sort(compareValues('date','desc')).map((wx, i) => {
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
                                    <td align="right">$ {isNaN(parseFloat(Math.round(props.totalPayroll.reduce((ac,cv)=> ac+cv,0) * 100) / 100).toFixed(2)) ? 0 :
                                        parseFloat(Math.round(props.totalPayroll.reduce((ac,cv)=> ac+cv,0) * 100) / 100).toFixed(2)}</td>
                                    <td align="right">$ {isNaN(parseFloat(Math.round(props.totalEffective.reduce((ac,cv)=> ac+cv,0) * 100) / 100).toFixed(2)) ? 0 :
                                        parseFloat(Math.round(props.totalEffective.reduce((ac,cv)=> ac+cv,0) * 100) / 100).toFixed(2)}</td>
                                    <td align="right">{isNaN(props.totalHours.reduce((ac,cv)=> ac+cv,0)) ? 0.00 :
                                        props.totalHours.reduce((ac,cv)=> ac+cv,0).toFixed(2)}</td>
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
                                    !props.expenses ? <p>Loading</p> :
                                        props.expenses.sort(compareValues('date','desc')).map((ex, i) => {
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
                :
                <>
                    <Table
                        className="align-items-center table-flush table-striped col-xs-12">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col" align="center"><b>Labors</b></th>
                            </tr>
                        </thead>
                        <tbody>
                        {props.jobs.sort(compareValues('date','desc')).map((wx, i) => {
                            return (
                                <tr>
                                    <td className="tdMobile">
                                        <Moment add={{days:1}} format={"MMM D, YY"}>{wx.date}</Moment><br/>
                                        {wx.jobName}
                                        <hr/>
                                        <Row>
                                            <Col>
                                                <small>Payroll Expense: </small><br/><b>$ {isNaN(parseFloat(Math.round(wx.payroll * 100) / 100).toFixed(2)) ? 0 : parseFloat(Math.round(wx.payroll * 100) / 100).toFixed(2)}  </b>
                                            </Col>
                                            <Col>
                                                <small>Effective Rate: </small><br/><b>$ {isNaN(parseFloat(Math.round(wx.effective * 100) / 100).toFixed(2)) ? 0 : parseFloat(Math.round(wx.effective * 100) / 100).toFixed(2)} </b>
                                            </Col>
                                            <Col>
                                                <small>Hours: </small><br/><b>{isNaN(parseFloat(Math.round(wx.hours * 100) / 100).toFixed(2)) ? 0 : parseFloat(Math.round(wx.hours * 100) / 100).toFixed(2)}</b>
                                            </Col>
                                        </Row>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                    <Table
                        className="align-items-center table-flush table-striped col-xs-12">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col"><b>Expense</b></th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            !props.expenses ? <p>Loading</p> :
                                props.expenses.sort(compareValues('date','desc')).map((ex, i) => {
                                    return (
                                        <tr>
                                            <td>
                                                <Moment add={{days: 1}} format={"MMM D, YY"}>
                                                    {ex.date}
                                                </Moment>&nbsp;
                                                <b>({ex.category})</b><br/>
                                                $ {parseFloat(Math.round(ex.total * 100) / 100).toFixed(2)}<br/>
                                                {ex.vendor}<br/>
                                                {ex.jobName}<br/>
                                                {ex.description}<br/>
                                                <div className="buttonfloat-right buttonfloat-right-times">
                                                    <Button onClick={props.handleModal(ex.img)}><i className="fas fa-receipt"></i> View</Button>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                )}
                        </tbody>
                    </Table>
                </>
            }

        </UncontrolledCollapse>
    )
}

class ReportWorkers extends React.Component{

    handleModal = (url) => (e) =>{
        console.log("url---", url);
        this.props.openModal(url)
    }

    render() {
        if(!this.props.workers) return <p>Loading</p>
        return (
            <div className="div_workers">
                <Table className="align-items-center table-flush table-striped" responsive>
                    <thead className="thead-light">
                        <tr>
                            {!this.props.isMobileVersion ?
                                <>
                                    <th style={{width: "100px"}}></th>
                                    <th scope="col">Worker</th>
                                </>
                                :
                                <>
                                    <th scope="col">Worker</th>
                                </>
                            }
                        </tr>
                    </thead>

                    <tbody>
                    {this.props.workers.length === 0 ?
                        <tr>
                            <td>No workers register</td>
                        </tr>
                        :
                        this.props.workers.map((e, i) => {
                            let totalExpenses = 0;
                            let hours = 0;
                            let jobs = [];
                            let reports = [];
                            let hoursPerJob = []
                            let hoursTime = 0
                            let hoursFull = []

                            e.works.sort(compareValues('date','desc')).map((e, i) => {
                                e.time.sort(compareValues('date','desc')).map((time, i) => {
                                    hoursTime += time.hours;
                                    hoursFull.push({hoursT: time.hours, date: time.date})
                                    hoursPerJob.push({works: e._id,  time: time.hours, date: time.date, hours: hoursFull})
                                })
                            })

                            e.works.sort(compareValues('date','desc')).map(works => {
                                if(works.workId instanceof Array ){ //search

                                    works.workId.sort(compareValues('date','desc')).map(work => {
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
                                        works.workId.workers.sort(compareValues('date','desc')).map(worker => {
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
                                <>
                                {!this.props.isMobileVersion?
                                    <>
                                        <tr key={i}>
                                            <td>
                                                <Button id={"toggle" + i} color="primary"><i className="ni ni-bold-down"></i></Button>
                                            </td>
                                            <td>{e.name} &nbsp; &nbsp; <Badge style={{fontSize:"12px"}} color="info">{e.role}</Badge></td>
                                        </tr>
                                        <tr>
                                            <td colSpan={7}>
                                                <DropDownExpense i={i}
                                                                 handleModal={this.handleModal}
                                                                 isMobileVersion={this.props.isMobileVersion}
                                                                 expenses={e.expenses}
                                                                 e={e}
                                                                 jobs={jobs}
                                                                 totalEffective={totalEffective}
                                                                 totalHours={totalHours}
                                                                 totalPayroll={totalPayroll}></DropDownExpense>
                                            </td>
                                        </tr>
                                    </>
                                    :
                                    <>
                                        <tr key={i}>
                                            <td className="tdMobile">
                                                <Button id={"toggle" + i} color="primary"><i className="ni ni-bold-down"></i></Button>
                                                {e.name} &nbsp; &nbsp; <Badge style={{fontSize:"12px"}} color="info">{e.role}</Badge>
                                            </td>
                                        </tr>
                                        <tr>
                                            <DropDownExpense i={i}
                                                             handleModal={this.handleModal}
                                                             isMobileVersion={this.props.isMobileVersion}
                                                             expenses={e.expenses}
                                                             e={e}
                                                             jobs={jobs}
                                                             totalEffective={totalEffective}
                                                             totalHours={totalHours}
                                                             totalPayroll={totalPayroll}></DropDownExpense>
                                        </tr>
                                    </>
                                }
                                </>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default ReportWorkers;
