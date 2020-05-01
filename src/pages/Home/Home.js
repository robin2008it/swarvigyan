import React, {Component} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
// import FilterBar from "../../containers/FilterBar/FilterBar";
// import ProductList from "../../containers/ProductList/ProductList";
// import Pagination from "../../components/Pagination/Pagination";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { todayPanchang: "" }
    }
    componentDidMount() {
        fetch('https://api.jsonbin.io/b/5e9ff6855fa47104cea4ece1/1')
            .then(response => response.json())
            .then((jsonData) => {
                // jsonData is parsed json object received from url
                let newDate = new Date();
                let date = newDate.getDate();
                let month = newDate.getMonth();
                let todayResult = jsonData.filter(((tithi) => tithi.date === date.toString() && tithi.month === (month + 1).toString()));
                this.setState({ todayPanchang: todayResult[0] });
            })
            .catch((error) => {
                // handle your errors here
                console.error(error)
            })




    }
    render() {
        const NAADI = {
            L: 'Ida/Left',
            R: 'Pingla/Right'
          };

        let bigSetShukl = new Set(["pritipada", "dwitiya", "tritiya", "saptmi", "ashtmi", "navmi", "triyodashi", "chaturdashi", "poornima"]);
        let bigSetKrishn = new Set(["pritipada", "dwitiya", "tritiya", "saptmi", "ashtmi", "navmi", "triyodashi", "chaturdashi", "amavasya"]);
        let smallSet = new Set(["chaturthi", "panchmi", "shashti", "dashmi", "ekadashi", "dwadashi"]);

        var startPoint = "";
        if ((this.state.todayPanchang.paksh === "shukl" && bigSetShukl.has(this.state.todayPanchang.tithi)) || (this.state.todayPanchang.paksh === "krishn" && smallSet.has(this.state.todayPanchang.tithi))) {
            startPoint = NAADI.L
        }
        if ((this.state.todayPanchang.paksh === "krishn" && bigSetKrishn.has(this.state.todayPanchang.tithi)) || (this.state.todayPanchang.paksh === "shukl" && smallSet.has(this.state.todayPanchang.tithi))) {
            startPoint = NAADI.R
        }
        let sunriseTime = this.state.todayPanchang.sunrise;
        let date = this.state.todayPanchang.date;
        let month = this.state.todayPanchang.month;
        let tithi = this.state.todayPanchang.tithi;
        let paksh = this.state.todayPanchang.paksh;

        const columns = [{
            dataField: 'startTime',
            text: 'Start Time (24 HRS)'
        }, {
            dataField: 'endTime',
            text: 'End Time (24 HRS)'
        }, {
            dataField: 'naadi',
            text: 'Naadi / Swar'
        }];

        let products = [];
        let hourPart = "";
        let minutePart= "";
        {hourPart =sunriseTime === undefined ? "6":parseInt(sunriseTime.substr(0,2)) };
        {minutePart =sunriseTime === undefined ? "0":parseInt(sunriseTime.substr(2,4)) };
        let startModuleId = (hourPart % 2);
        let alternateStartPoint =""; 
        {alternateStartPoint = NAADI.L !== startPoint ? NAADI.L : NAADI.R }
        for (let i = hourPart; i < 23; i++) {
        let naadiResult = "";
        {naadiResult = (i%2)=== startModuleId ? startPoint : alternateStartPoint}    
        products.push({
            startTime: i + ":"+minutePart,
            endTime: (i+1) + ":"+minutePart,
            naadi: naadiResult
        });
        }
        
        //const CaptionElement = () => ;
    return (
        <React.Fragment>
            <div className="container " style={{paddingTop: '6rem'}} >
                <div className="row  justify-content-center ">
                    <div className="card  bg-light shadow p-3 mb-5 rounded" style={{maxWidth:"50rem"}} >
                        
                            <div className="card-body">
                                <u><h5 className="card-title">SWAR VIGYAN</h5></u>
                                <p className="card-text">In short, Human body have 3 main Naadis/Swar i.e. Ida (Chandra/Left Nostril) , Pingla (Surya/ Right Nostril)
                                and Sushumna. Sushumna is invisible. But as per the nautral law, at the time of sunrise and on the basis of Hindu Panchang (tithi and Paksha),
                                everyday one of the nostril starts at Sun rise time and after every one Hour it used to change to the different Nostril. Let's say, day starts with Ida/Left Nostril and after every 
                                alernate hour, it used to change to Pingla/Right Nostril. Accurate functioning of Ida and Pingla Naadis are very important
                                for a healthy life.
                                <br/>
                                <br/>
                                <b>This app will help you to track the hourly appropriate sequence of Swar/Naadi that should run. See the table below for the same.</b>
                                </p>
                            </div>
                            <h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'purple', border: '1px solid purple', padding: '0.5em' }}>Date : {date}-{month} / Tithi : {tithi} / Paksh : {paksh}  / Sunrise Time : {sunriseTime} (24 Hrs)</h3>
                            <BootstrapTable keyField="startTime" data={ products }  columns={ columns } />
                        </div>
                        
                </div>
            </div>
        </React.Fragment>
    );
}
};


export default Home;
