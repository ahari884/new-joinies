import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as _ from 'lodash';

import data from '../../data/data';
import './Report.css';

class Report extends React.Component {

    constructor(props) {
        super(props);

        let formattedData = _.groupBy(data, 'college', 'college');
        let finalData = Object.keys(formattedData).map((fin)=>{
            let obj = formattedData[fin][0];
            obj['count'] = formattedData[fin].length;
            return obj;
        })
        this.state = {
            headers: Object.keys(finalData[0]),
            data: finalData
        }
    }

    returnRow = (row) => {
        return this.state.headers.map((header, headerIndex)=>{
            return <TableCell key={headerIndex}>{row[header]}</TableCell>
        })
    }

    render() {
        return (
            <div className="report">
                <h2>Report</h2>
                <Paper className={"root"}>
                    <Table className="table" style={{paddingLeft:10,paddingRight:10}}>
                        <TableHead>
                            <TableRow>
                                {this.state.headers.map((header, headerIndex) => {
                                    return <TableCell key={headerIndex}>{header}</TableCell>
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.data.map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {this.returnRow(row)}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}

export default Report;