import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

class ApiExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            open: 'false'
        }
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
    callApi = () => {
        fetch("http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=11&ncvContSeq=&contSeq=&board_id=&gubun=")
            .then(res => res.json())
            .then(json => {
                this.setState({
                    data: json.title
                })
            })
    }
    componentDidMount() {
        this.callApi();
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleClickOpen}> Api Test </Button>

                <Dialog open={this.state.open} onClose={this.handleClose} >
                    <h3>{this.state.data ? this.state.data : '데이터 불러오는 중'}</h3>
                </Dialog>
            </div>
        )
    }
}

export default ApiExample;