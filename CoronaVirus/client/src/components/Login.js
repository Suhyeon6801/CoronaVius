import React from 'react'
import { post } from 'axios'; //서버와의 통신 목적의 라이브러리인 axios
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  hidden: {
    display: 'none'
  }
})

class Login extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      email: '',
      password: '',
      file: null,
      open: false
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.Login = this.Login.bind(this)

  }

    handleClipOpen = () => {  //React에서 컴포넌트에 이벤트메서드를 연결하는 방법 (=바인딩(binding))
        this.setState({
            open: true
        })
    }

    handleClose = () => {
        this.setState({
            open: false
        })          
    }
    
    
    deleteCustomer(id){  //api함수 
      const url = '/api/customers/' + id; //경로에 접근 (REST API)
      fetch(url, {
          method: 'DELETE' //DELETE메소드로 접근 
      });
      this.props.stateRefresh();  //삭제된 이후에 새롭게 갱신된 고객목록 화면에 출력되게
  }



  //내부적으로 이벤트 변수를 전달받음
  handleFormSubmit = (e) => {

    e.preventDefault() //데이터가 서버로 전달될때 오류가 발생하지않게

    this.Login() //addcustomer함수를 불러줘
      .then((response) => {
        console.log(response.data);
        this.props.stateRefresh();
      })

    this.setState({
      email: '',
      password: '',
      file: null,
      open: false
    })

  }


  //file값이 변경됬을때
  handleFileChange(e) {

    this.setState({  //상태를 변경
      file: e.target.files[0], //그 이벤트가 발생한 input값 자체
      fileName: e.target.value //파일명

    });

  }

  //일반적인text가 변경됬을때
  handleValueChange(e) {

    let nextState = {};
    nextState[e.target.name] = e.target.value; //변경된 값을 반영
    this.setState(nextState);  //현재 상태 갱신 

  }



  Login() {

    const url = '/api/user';
    const formData = new FormData();

    formData.append('email', this.state.email)
    formData.append('password', this.state.password)
    formData.append('image', this.state.file)

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return post(url, formData, config)
  }

  handleClickOpen = () => {  //React에서 컴포넌트에 이벤트메서드를 연결하는 방법 (=바인딩(binding))
    this.setState({
      open: true
    });
  }

  handleClose = () => {
    this.setState({
      email: '',
      password: '',
      file: null,
      open: false
    })
  }

  render() {
    return (
      <div>

        <Button onClick={this.handleClickOpen}>로그인</Button>

        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>로그인</DialogTitle>
          <DialogContent>
     
            <TextField label="아이디" type="text" name="email" value={this.state.email} onChange={this.handleValueChange} /><br />
            <TextField label="비밀번호" type="text" name="password" value={this.state.password} onChange={this.handleValueChange} /><br />
          

          </DialogContent>

          <DialogActions>
            <Button variant="contained" color="primary" onClick={(e) => {this.deleteCustomer(this.props.email)}}>로그인</Button>
            <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
          </DialogActions>

        </Dialog>

      </div>

    )
  }
}



export default withStyles(styles)(Login);
//실제로 app.js에서 출력이 될 것이기 때문에
//외부 라이브러리에서 사용 될수있게 export 해줘야됨 