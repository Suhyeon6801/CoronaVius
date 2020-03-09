import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

class About extends React.Component{
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
    render() {
        return (
          <div>
            <Button onClick={this.handleClickOpen}> 코로나19란 </Button>
    
            <Dialog open={this.state.open} onClose={this.handleClose} >
             
            </Dialog>
    
          </div>
    
        )
    }
}

export default About;