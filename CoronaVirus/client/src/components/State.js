import React from 'react';
import CoronaState from './CoronaState';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import CirculerProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        width: '100%',
        minWidth: 1080
    },
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    table: {
        // temporary right-to-left patch, waiting for
        // https://github.com/bvaughn/react-virtualized/issues/454
        '& .ReactVirtualized__Table__headerRow': {
            flip: false,
            paddingRight: theme.direction === 'rtl' ? '0px !important' : undefined,
        },
    },
    tableRow: {
        cursor: 'pointer',
    },
    tableRowHover: {
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
        },
    },
    tableCell: {
        flex: 1,
    },
    noClick: {
        cursor: 'initial',
    },
});


class State extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coronastates: '',
            completed: 0,
            open: false
        }
        this.stateRefresh = this.stateRefresh.bind(this);
    }

    stateRefresh() {
        this.setState({
            coronastate: '',
            completed: 0
        });
        this.callApi()
            .then(res => this.setState({ coronastate: res }))
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.timer = setInterval(this.progress, 20);
        this.callApi()
            .then(res => this.setState({ coronastate: res }))
            .catch(err => console.log(err));
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    callApi = async () => {
        const response = await fetch('api/coronastate');
        const body = await response.json();
        return body;
    }

    progress = () => {
        const { completed } = this.state;
        this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    render() {

        const { classes } = this.props;
        const cellList = ["번호", "환자", "확진일", "성별(출생년)", "거주지", "여행력", "접촉력", "조치사항"]

        return (
            <div>
                <Button onClick={this.handleClickOpen}> 서울 확진자 현황 </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} >
                    <DialogTitle><center><bold>서울 코로나 현황</bold></center></DialogTitle>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {cellList.map(c => {
                                    return <TableCell>{c}</TableCell>
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.coronastate ? this.state.coronastate.map(c => {
                                return <CoronaState key={c.id} id={c.id} patient_number={c.patient_number}
                                    date_={c.date_} gender={c.gender} address={c.address} trip={c.trip} contact={c.contact} hospital={c.hospital} />
                            }) :
                                <TableRow>
                                    <TableCell colSpan="8" align="center">
                                        <CirculerProgress variant="determinate" value={this.state.completed} />
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </Dialog>
            </div>
        )
    }
}

export default State;