import React from "react";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button';

class ChartsPage extends React.Component {
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

   
    
    Predict = {
        dataLine: {
            labels: ["2020-03-08", "2020-03-09", "2020-03-10", "2020-03-11", "2020-03-12", "2020-03-13", "2020-03-14",
            "2020-03-15","2020-03-16","2020-03-17","2020-03-18","2020-03-19","2020-03-20","2020-03-22"],
            datasets: [
                {
                    label: "Real",
                    fill: false,
                    lineTension: 0.3,
                    backgroundColor: "rgba(225, 204,230, .3)",
                    borderColor: "rgb(205, 130, 158)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgb(205, 130,1 58)",
                    pointBackgroundColor: "rgb(255, 255, 255)",
                    pointBorderWidth: 10,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgb(0, 0, 0)",
                    pointHoverBorderColor: "rgba(220, 220, 220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [117, 139, 185, 201, 213, 222, 230,236]
                },
                {
                    label: "Predict",
                    fill: false,
                    lineTension: 0.3,
                    backgroundColor: "rgba(184, 185, 210, .3)",
                    borderColor: "rgb(35, 26, 136)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgb(35, 26, 136)",
                    pointBackgroundColor: "rgb(255, 255, 255)",
                    pointBorderWidth: 10,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgb(0, 0, 0)",
                    pointHoverBorderColor: "rgba(220, 220, 220, 1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [117, 139, 185, 201, 213, 222, 230,236,265,281,298,314,330,347,363]
                }
            ]
        }
    };

    render() {
        return (
            <div>
            <Button onClick={this.handleClickOpen}> 서울시 확진자 예측 </Button>

            <Dialog open={this.state.open} onClose={this.handleClose} >
                <MDBContainer>
                    <DialogTitle><center>서울시 확진자 예측현황(일주일)</center>  </DialogTitle>
                    <Line data={this.Predict.dataLine} options={{ responsive: true }} width="1000" height="1000" />
                </MDBContainer>
            </Dialog>
            </div>
    );
    }
}

export default ChartsPage;