import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Rater from 'react-rater'
import Loader from 'react-loader-spinner'
import CountUp from 'react-countup'

//styles
import 'react-rater/lib/react-rater.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

function Trips(props) {
    let [trips, setTrips] = useState([])
    //console.log("trips props")
    //console.log(props.history.location.data)
    
    let params = props.history.location.data;
    function sortRange(val,arr){
        let bool = val >= parseFloat(arr[0]) && val < parseFloat(arr[1])
        console.log("Bool: "+bool)
        return bool
    }
    useEffect(() => {
        try {
            Axios.get("https://hr.hava.bz/trips/recent.json")
            .then((res) => {
                //console.log(res.data.trips);
                let trips = res.data.trips;
                if(params){
                    if(params.cancelled == false){
                        trips = trips.filter(trip => 
                            trip.status == 'COMPLETED'
                        )
                    }
                    if(params.keyword != ''){
                        trips = trips.filter(trip => 
                            trip.dropoff_location == params.keyword || trip.pickup_location == params.keyword || 
                            trip.type == params.keyword || trip.driver_name == params.keyword ||
                            trip.car_make == params.keyword || trip.car_model == params.keyword
                        )
                    }
                    if(params.distance != 'all'){
                        let distanceRange = params.distance.split("_")
                        console.log(distanceRange)
                        if(distanceRange.length == 1){                            
                             trips = trips.filter(trip =>
                                 distanceRange[0] == 3 ? trip.distance <= distanceRange[0] : trip.distance >= 15
                             )
                        }else{
                             trips = trips.filter(trip => 
                                sortRange(trip.distance, distanceRange)
                             )
                        }                        
                    }
                    if(params.time != 'all'){
                        let timeRange = params.time.split("_")
                        if(timeRange.length == 1){                            
                             trips = trips.filter(trip => 
                                 timeRange[0] == 5 ? trip.duration <= timeRange[0] : trip.duration >= 20
                             )
                        }else{
                             trips = trips.filter(trip =>
                                 trip.duration >= parseFloat(timeRange[0]) && trip.duration <= parseFloat(timeRange[1])
                             )
                        } 
                    }
                }                
                setTrips(trips)
            }) 
        } catch (error) {
            console.log(error);
        }
    })
    
    
    //console.log("trips Length"+ trips.length);
    let tripsList = trips.length ? (trips.map(trip => {
        return (
            <div className="card trip" key={trip.id}>
                <div className="card-content">
                    
                    <span className="new badge" data-badge-caption="">
                        <i className="material-icons">account_balance_wallet</i> 
                        {trip.cost} {trip.cost_unit}
                    </span>
                    
                    <div className="">
                        <i className="material-icons left">access_time</i>
                        <p className="timerP">{new Date(trip.request_date).toGMTString()}</p>
                    </div>
                    <div  className="column">
                        <div className="row">
                            <i className="material-icons">my_location</i>
                            <p>{trip.pickup_location}</p>
                        </div>
                        <div className="row">
                            <i className="material-icons">place</i>
                            <p>{trip.dropoff_location}</p>
                        </div>
                    </div>
                </div>
                <div className="card-action row">
                    <div className={`chip ${trip.status == 'COMPLETED' ? 'green' : 'red'}`}>
                        Status: {trip.status}
                    </div> 
                    <div className="row">
                        <p>Rating: </p>
                        <Rater total={5} rating={trip.driver_rating} interactive={false} />
                        <p>Distance: {trip.distance}Km </p>
                        <p>Time: {trip.duration} </p>
                    </div>
                </div>
            </div>
        )
    })) : (
        <div> No trips yet </div>
    )
    return (
        <div className="container">
            {trips.length ? (
                <div>
                    <div className="row toTheLeft">
                        <div className="card widget">
                            <div className="card-content">
                                <div className="row">
                                    <i className="material-icons left">collections</i>
                                    <div className="column">
                                        <p className="title">Number of trips</p>
                                        <CountUp
                                            start={0}
                                            end={trips.length}
                                            duration={4}
                                        ></CountUp>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card widget">
                            <div className="card-content">
                                <div className="row">
                                    <i className="material-icons left">compare</i>
                                    <div className="column">
                                        <p className="title">Total fare KES</p>
                                        <CountUp
                                            start={0}
                                            end={4000}
                                            duration={4}
                                        ></CountUp>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hava-progressbar rounded-bar">
                        <div className="the-progress rounded-bar green-bar" style={{width:90+'%'}}>
                            <span>90%</span>
                        </div>
                    </div>
                    {tripsList}                                            
                </div>                
            ) : (
                <div className="center loader">
                    <div className="vertical-center">
                        <Loader type="Ball-Triangle" color="#00BFFF" height={100} width={100} timeout={50000}    />
                        <p>Loading</p>
                    </div>
                </div>                
            )}
        </div>
    );
}

export default Trips;