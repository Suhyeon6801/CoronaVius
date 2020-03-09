import React from 'react';
import { RenderAfterNavermapsLoaded, NaverMap, Marker, Polygon, Polyline, Circle } from 'react-naver-maps'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';


class Map extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            center: {
                lat: 37.5666103,
                lng: 126.9783882,
            },
            zoom: 11,
            open: 'false'
        }
        this.panToNaver = this.panToNaver.bind(this);
    }

    panToNaver() {
        this.setState({ center: { lat: 37.3595704, lng: 127.105399 } })
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
                <Button onClick={this.handleClickOpen}> 지도보기 </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} >
                    <RenderAfterNavermapsLoaded
                        ncpClientId={'tzqx6erao7'}
                    >
                        <NaverMap mapDivId={'maps-getting-started-uncontrolled'}
                            style={{ width: '900px', height: '1000px', }}
                            center={this.state.center}
                            zoom={this.state.zoom}
                            onCenterChanged={center => this.setState({ center })}>
                        
                            <Mark />
                            <CirclePos />
                        />

                        </NaverMap>

                    </RenderAfterNavermapsLoaded>
                </Dialog>
            </div>
        )
    }
}


class Mark extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contactData: [
                { name: '종로구', Latitude: 37.6009055, longtitude: 126.9485623 },
                { name: '중구', Latitude: 37.5576734, longtitude: 126.9766558 },
                { name: '용산구', Latitude: 37.5305001, longtitude: 126.9109271 },
                { name: '성동구', Latitude: 37.5508716, longtitude: 127.0057898 },
                { name: '광진구', Latitude: 37.5462664, longtitude: 127.0507653 },
                { name: '동대문구', Latitude: 37.5835703, longtitude: 127.0154474 },
                { name: '중랑구', Latitude: 37.5950445, longtitude: 127.0606008 },
                { name: '성북구', Latitude: 37.6023087, longtitude: 126.9550242 },
                { name: '강북구', Latitude: 37.6482078, longtitude: 126.9813015 },
                { name: '노원구', Latitude: 37.6541905, longitude: 127.0419498 },
                { name: '도봉구', Latitude: 37.6662274, longitude: 126.994853 },
                { name: '은평구', Latitude: 37.6662274, longitude: 126.994853 },
                { name: '서대문구', Latitude: 37.5833748, longitude: 126.9006405 },
                { name: '마포구', Latitude: 37.5616592, longitude: 126.8736234 },
                { name: '양천구', Latitude: 37.5274949, longitude: 126.8208588 },
                { name: '강서구', Latitude: 37.5674043, longitude: 126.7533699 },
                { name: '구로구', Latitude: 37.495828, longitude: 126.8228501 },
                { name: '금천구', Latitude: 37.4600526, longitude: 126.8662469 },
                { name: '영등포구', Latitude: 37.5208971, longitude: 126.8783065 },
                { name: '동작구', Latitude: 37.4971749, longitude: 126.9093583 },
                { name: '관악구', Latitude: 37.4655159, longitude: 126.9092282 },
                { name: '서초구', Latitude: 37.4761416, longitude: 126.9671612 },
                { name: '강남구', Latitude: 37.496828, longitude: 126.9977276 },
                { name: '송파구', Latitude: 37.5047202, longitude: 127.0442531 },
                { name: '강동구', Latitude: 37.5492786, longitude: 127.0762157 }
            ]
        };
    }

    render() {
        return (
            <div>
                <h1>Contacts</h1>
                <ul>
                    {this.state.contactData.map((contact, i) => {
                        return (<MarkInfo name={contact.name}
                            Latitude={contact.Latitude}
                            longitude={contact.longitude}
                            key={i} />);
                    })}
                </ul>
            </div>
        );
    }
}

class MarkInfo extends React.Component {

    render() {
        const navermaps = window.naver.maps;
        return (

            <Marker
                key={this.props.key}
                position={new navermaps.LatLng(this.props.Latitude, this.props.longitude)}
                onClick={() => { alert('여기는 ' + this.props.name + ' 입니다.'); }}            
                >                 
            </Marker>
          
        );
    }
}

class CirclePos extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            contactData: [
                { name: '종로구', Latitude: 37.6009055, longtitude: 126.9485623, radius : 11 },
                { name: '중구', Latitude: 37.5576734, longtitude: 126.9766558,radius : 0 },
                { name: '용산구', Latitude: 37.5305001, longtitude: 126.9109271,radius : 1 },
                { name: '성동구', Latitude: 37.5508716, longtitude: 127.0057898,radius : 3 },
                { name: '광진구', Latitude: 37.5462664, longtitude: 127.0507653,radius : 2 },
                { name: '동대문구', Latitude: 37.5835703, longtitude: 127.0154474, radius : 4 },
                { name: '중랑구', Latitude: 37.5950445, longtitude: 127.0606008, radius : 2 },
                { name: '성북구', Latitude: 37.6023087, longtitude: 126.9550242, radius : 5 },
                { name: '강북구', Latitude: 37.6482078, longtitude: 126.9813015, radius : 2 },
                { name: '노원구', Latitude: 37.6541905, longitude: 127.0419498, radius : 8 },
                { name: '도봉구', Latitude: 37.6662274, longitude: 126.994853, radius : 1 },
                { name: '은평구', Latitude: 37.6662274, longitude: 126.994853, radius : 7 },
                { name: '서대문구', Latitude: 37.5833748, longitude: 126.9006405, radius : 4 },
                { name: '마포구', Latitude: 37.5616592, longitude: 126.8736234, radius : 1 },
                { name: '양천구', Latitude: 37.5274949, longitude: 126.8208588, radius : 2 },
                { name: '강서구', Latitude: 37.5674043, longitude: 126.7533699, radius : 2 },
                { name: '구로구', Latitude: 37.495828, longitude: 126.8228501, radius : 1 },
                { name: '금천구', Latitude: 37.4600526, longitude: 126.8662469, radius : 1 },
                { name: '영등포구', Latitude: 37.5208971, longitude: 126.8783065, radius : 4 },
                { name: '동작구', Latitude: 37.4971749, longitude: 126.9093583, radius : 1 },
                { name: '관악구', Latitude: 37.4655159, longitude: 126.9092282, radius : 4 },
                { name: '서초구', Latitude: 37.4761416, longitude: 126.9671612, radius : 5 },
                { name: '강남구', Latitude: 37.496828, longitude: 126.9977276, radius : 10 },
                { name: '송파구', Latitude: 37.5047202, longitude: 127.0442531, radius : 12 },
                { name: '강동구', Latitude: 37.5492786, longitude: 127.0762157, radius : 4 }
            ]
        };
    }

    render() {
        return (
            <div>
                <h1>Contacts</h1>
                <ul>
                    {this.state.contactData.map((contact, i) => {
                        return (<CircleInfo name={contact.name}
                            Latitude={contact.Latitude}
                            longitude={contact.longitude}
                            radius={contact.radius}
                            key={i} />);
                    })}
                </ul>
            </div>
        );
    }
}

class CircleInfo extends React.Component{
    render(){
        //const Colors=[]
        return(
            <Circle 
            key={this.props.key}
            center={new window.naver.maps.LatLng(this.props.Latitude, this.props.longitude)}
            radius={this.props.radius*200}
            fillOpacity={0.5}
            fillColor={'#FF0000'}
            strokeColor={'red'}
            clickable={true} // click event를 다루기 위해서는 true로 설정되어야함.
            onClick={() => {alert(this.props.name+'의 현재 확진자 수는  '+this.props.radius+' 명 입니다.')}}/>        
        )
    }
}
  

export default Map;