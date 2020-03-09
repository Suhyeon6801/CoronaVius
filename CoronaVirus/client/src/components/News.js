import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(28, 60, 32),
    },
  }));

export default function News(){

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    
  };

  const handleClose = () => {
    setOpen(false);
  };

    
      return(
        <div> 
            <Button onClick={handleOpen}> News </Button>
            <Modal
                aria-labelledby="news-title"
                aria-describedby="news-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
            }}>
            
                <Fade in={open}>   
                    <div className={classes.paper}>
                        <h2 id="news-title" onClick={handleClose} align = "center">홈으로</h2>
                        <iframe title = "뉴스"  src="https://www.yna.co.kr/safe/news" width="1250" height="550" scrolling="auto"></iframe>
                    </div>                  
                </Fade>
            </Modal>
        </div>
  
      )
    }
  