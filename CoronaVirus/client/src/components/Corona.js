import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle'
import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import Button from '@material-ui/core/Button';

class Corona extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      open: false
    }
    //this.Corona = this.Corona.bind(this);
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

  Corona = {
    dataPie: {
      labels: ["확진환자", "검사진행", "격리해제", "사망자"],
      datasets: [
        {
          data: [3526, 32422, 30, 17],
          backgroundColor: [
            "#F7464A",
            "#46BFBD",
            "#FDB45C",
            "#949FB1"
          ],
          hoverBackgroundColor: [
            "#FF5A5E",
            "#5AD3D1",
            "#FFC870",
            "#A8B3C5"
          ]
        }
      ]
    }
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}> 코로나현황 </Button>

        <Dialog open={this.state.open} onClose={this.handleClose} >
          <DialogTitle> 코로나현황 </DialogTitle>
          <MDBContainer >
            <Pie data={this.Corona.dataPie} options={{ responsive: true }} width="1000" height="1000" />
          </MDBContainer>
        </Dialog>

      </div>

    )
  }
}

export default Corona;