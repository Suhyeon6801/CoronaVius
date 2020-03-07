import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class CoronaState extends React.Component{
    render(){
        return(
          <TableRow>
              <TableCell>{this.props.id}</TableCell>
              <TableCell>{this.props.patient_number}</TableCell>
              <TableCell>{this.props.date_}</TableCell>
              <TableCell>{this.props.gender}</TableCell>
              <TableCell>{this.props.address}</TableCell>
              <TableCell>{this.props.trip}</TableCell>
              <TableCell>{this.props.contact}</TableCell>
              <TableCell>{this.props.hospital}</TableCell>
          </TableRow>
        )
    }
}

//내보내기
export default CoronaState;