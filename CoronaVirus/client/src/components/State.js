import React, { Component } from 'react';
import CoronaState from './CoronaState';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        width: "100%",
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
    menu: {
        marginTop: 15,
        marginBottom: 15,
        display: 'flex',
        justifyContent: 'center'
    },
    paper: {
        marginLeft: 18,
        marginRight: 18
    },
    progress: {
        margin: theme.spacing.unit * 2
    },
    grow: {
        flexGrow: 1,
    },
    tableHead: {
        fontSize: '1.0rem'
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    }
});



class State extends Component {
    // component내에서 변경될수 있는 데이터 : state <-> props

    constructor(props) {

        super(props);
        this.state = {   //state갱신
            coronastate: '',
            completed: 0,
            searchKeyword: '',//초기에는 빈 문자열을 넣으므로서 처음에는 모든고객이 보이게 
            open: false
        }

        this.stateRefresh = this.stateRefresh.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this)
    }


    //state를 초기화
    stateRefresh() {
        this.setState({
            coronastate: '',
            completed: 0,
            searchKeyword: ''
        });
        this.callApi() 
            .then(res => this.setState({ coronastate: res }))
            .catch(err => console.log(err));
    }

    //api서버에 접근해서 데이터를 받아오는 등의 작업을 componentDidMount에서 해줄 수 있음.(라이브러리)
    componentDidMount() {
        this.timer = setInterval(this.progress, 20);
        this.callApi()
            .then(res => this.setState({ coronastate: res }))
            .catch(err => console.log(err)); 
    }


    callApi = async () => {
        const response = await fetch('/api/coronastate');
        const body = await response.json(); //json형태로 body 변수로 받아옴
        return body;
    }

    progress = () => {
        const { completed } = this.state;
        this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
    }

    //검색 창에 사용자가 입력한 문자열을 스테이트(State)에 반영하기 위한 값 변경 처리 함수
    handleValueChange(e){
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
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

        const filteredComponents = (data) => {
            data = data.filter((c) => {
                return c.address.indexOf(this.state.searchKeyword) > -1; //검색한 키워드가 포함되어있다면 
            });
            return data.map((c) => {
                return <CoronaState stateRefresh={this.stateRefresh} key={c.id} id={c.id} patient_number={c.patient_number}
                    date_={c.date_} gender={c.gender} address={c.address} trip={c.trip} contact={c.contact} hospital={c.hospital} />

            });
        }

        const { classes } = this.props;
        const cellList = ["번호", "환자", "확진일", "성별(출생년)", "거주지", "여행력", "접촉력", "조치사항"]

        return (
            <div classNmae={classes.root}>
                <Button onClick={this.handleClickOpen}> 서울 확진자 현황 </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} >
                    <AppBar position="static" color="">
                        <Toolbar>
                            <Typography className={classes.title} variant="h6" noWrap>
                                서울 확진자 현황
                             </Typography>

                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="00구"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    name="searchKeyword"  //searchKeyword 라는 이름의 state
                                    value={this.state.searchKeyword}
                                    onChange={this.handleValueChange}
                                />
                            </div>
                        </Toolbar>
                    </AppBar>

                    <div className={classes.menu}>
                        <CoronaState stateRefresh={this.stateRefresh} />
                    </div>
                    <Paper className={classes.paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {cellList.map(c => {
                                        return <TableCell className={classes.tableHead}>{c}</TableCell>
                                    })}

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.coronastate ? filteredComponents(this.state.coronastate) :
                                    <TableRow>
                                        <TableCell colSpan="8" align="center">
                                            <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                                        </TableCell>
                                    </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </Paper>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(State);