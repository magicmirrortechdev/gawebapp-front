import React from 'react';
import {Button, Card, Table, UncontrolledCollapse, Badge, Row, Col} from "reactstrap";
import CardBody from "reactstrap/es/CardBody";
import Moment from "react-moment";
import {compareValues} from  "../../global";

const DropDownExpense = (props) =>{
    return (
        <UncontrolledCollapse key={props.id} toggler={"#toggle" + props.i}>
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
                                    <th>Job Date</th>
                                    <th>Job</th>
                                    <th>Payroll Expense</th>
                                    <th>Labor Expense
                                        (Effective Rate)
                                    </th>
                                    <th>Hours</th>
                                </tr>
                                </thead>
                                <tbody>
                                {props.e.jobs.sort(compareValues('date','desc')).map((wx, i) => {
                                        return (
                                            <React.Fragment key={i}>
                                                <tr>
                                                    <td><Moment add={{days:1}} format={"MMM D, YY"}>{wx.date}</Moment></td>
                                                    <td>{wx.jobName}</td>
                                                    <td align="right">$ {isNaN(parseFloat(Math.round(wx.payroll * 100) / 100).toFixed(2)) ? 0 : parseFloat(Math.round(wx.payroll * 100) / 100).toFixed(2)}  </td>
                                                    <td align="right">$ {isNaN(parseFloat(Math.round(wx.effective * 100) / 100).toFixed(2)) ? 0 : parseFloat(Math.round(wx.effective * 100) / 100).toFixed(2)} </td>
                                                    <td align="right">{isNaN(parseFloat(Math.round(wx.hours * 100) / 100).toFixed(2)) ? 0 : parseFloat(Math.round(wx.hours * 100) / 100).toFixed(2)} </td>
                                                </tr>
                                            </React.Fragment>
                                        )
                                    }
                                )}
                                <tr>
                                    <td></td>
                                    <td align="right">Total:</td>
                                    <td align="right">$ {isNaN(parseFloat(Math.round(props.e.totalPayroll.reduce((ac,cv)=> ac+cv,0) * 100) / 100).toFixed(2)) ? 0 :
                                        parseFloat(Math.round(props.e.totalPayroll.reduce((ac,cv)=> ac+cv,0) * 100) / 100).toFixed(2)}</td>
                                    <td align="right">$ {isNaN(parseFloat(Math.round(props.e.totalEffective.reduce((ac,cv)=> ac+cv,0) * 100) / 100).toFixed(2)) ? 0 :
                                        parseFloat(Math.round(props.e.totalEffective.reduce((ac,cv)=> ac+cv,0) * 100) / 100).toFixed(2)}</td>
                                    <td align="right">{isNaN(props.e.totalHours.reduce((ac,cv)=> ac+cv,0)) ? 0.00 :
                                        props.e.totalHours.reduce((ac,cv)=> ac+cv,0).toFixed(2)}</td>
                                </tr>
                                </tbody>
                            </Table>

                            <h3>- Expenses</h3>
                            <Table
                                className="align-items-center table-flush col-md-8 col-xs-12"
                                responsive>
                                <thead className="thead-light">
                                <tr>
                                    <th scope="col"></th>
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
                                    !props.e.expenses ? <tr><td colSpan={7}></td></tr> :
                                    props.e.expenses.sort(compareValues('date','desc')).map((ex, i) => {
                                        return (
                                            <tr key={i}>
                                                <td><Button onClick={props.handleModal(ex.image)}><i className="fas fa-receipt"></i> View</Button> </td>
                                                <td><Moment add={{days:1}} format={"MMM D, YY"}>{ex.date}</Moment></td>
                                                <td>{ex.category}</td>
                                                <td align="right">$ {ex.total}</td>
                                                <td>{ex.vendor}</td>
                                                <td>{ex.jobName}</td>
                                                <td>{ex.description}</td>
                                            </tr>
                                        )
                                    })}
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
                        {props.e.jobs.sort(compareValues('date','desc')).map((wx, i) => {
                            return (
                                <tr key={i}>
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
                            !props.e.expenses ? <tr><td></td></tr> :
                                props.e.expenses.sort(compareValues('date','desc')).map((ex, i) => {
                                    return (
                                        <tr key={i}>
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
                                                    <Button onClick={props.handleModal(ex.image)}><i className="fas fa-receipt"></i> View</Button>
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
        this.props.openModal(url)
    }

    render() {
        if(!this.props.workersFilter) return <p>Loading</p>
        return (
            <div className="div_workers">
                <Table className="align-items-center table-flush table-striped" responsive>
                    <thead className="thead-light">
                        <tr>
                            {!this.props.isMobileVersion ?
                                <>
                                    <th style={{width: "100px"}}></th>
                                    <th >Worker</th>
                                </>
                                :
                                <>
                                    <th >Worker</th>
                                </>
                            }
                        </tr>
                    </thead>

                    <tbody>
                    {this.props.workersFilter.length === 0 ?
                        <tr>
                            <td>No workers register</td>
                        </tr>
                        :
                        this.props.workersFilter.map((e, i) =>
                            <React.Fragment key={i}>
                            {!this.props.isMobileVersion?
                                <React.Fragment key={i}>
                                    <tr >
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
                                                             e={e}></DropDownExpense>
                                        </td>
                                    </tr>
                                </React.Fragment>
                                :
                                <React.Fragment key={i}>
                                    <tr>
                                        <td className="tdMobile">
                                            <Button id={"toggle" + i} color="primary"><i className="ni ni-bold-down"></i></Button>
                                            {e.name} &nbsp; &nbsp; <Badge style={{fontSize:"12px"}} color="info">{e.role}</Badge>
                                        </td>
                                    </tr>
                                    <tr>
                                        <DropDownExpense i={i}
                                                         handleModal={this.handleModal}
                                                         isMobileVersion={this.props.isMobileVersion}
                                                         e={e}></DropDownExpense>
                                    </tr>
                                </React.Fragment>
                            }
                            </React.Fragment>
                        )}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default ReportWorkers;
