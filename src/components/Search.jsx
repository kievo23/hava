import React,{useState} from 'react';
import CountUp from 'react-countup'

function Search(props){
    const [keyword, setKeyword] = useState('');
    const [cancelled, setCancelled] = useState(false);
    const [distance, setDistance] = useState('all');
    const [time, setTime] = useState('all');

    function handleSubmit(e){
        //e.preventDefault();
        // console.log("form submitted")
        // console.log("keyword"+ keyword);
        // console.log("cancelled"+ cancelled);
        // console.log("distance"+ distance);
        // console.log("time"+ time);
        let data = {
            keyword,cancelled,distance,time
        }
        //console.log(props.history)
        props.history.push({pathname : '/trips', data: data});
    }
    function btnSubmit(){
        handleSubmit();
    }

    return (
        <div className="column container">
            <p className="headTag colorTheme">Trip Search.</p>
            <div className="card">
                <div className="card-content">
                    <form onSubmit={handleSubmit}>
                        <div className="input-field col s12 m12">
                            <input defaultValue="Kilimani" id="keyword" type="text" className="validate"
                                value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                            <label className="active" htmlFor="keyword">Keyword</label>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" className="filled-in" name="cancelled"
                                    checked={cancelled} onChange={(e) => setCancelled(!cancelled)} />
                                <span>Include Cancelled trips</span>
                            </label>
                        </div>
                        <div className="columns">
                            <div id="distance">
                                <h5 className="colorTheme">Distance</h5>
                                <div className="criteria">
                                    <p>
                                        <label>
                                            <input name="distance" type="radio" defaultChecked value="all" onClick={() =>setDistance('all')} />
                                            <span>Any</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input name="distance" type="radio" value="3" onClick={() =>setDistance('3')} />
                                            <span>Under 3 km</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input name="distance" type="radio" value="3_8" onClick={() =>setDistance('3_8')} />
                                            <span>3 - 8 km</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input name="distance" type="radio" value="8_15" onClick={() =>setDistance('8_15')} />
                                            <span>8 - 15 km</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input name="distance" type="radio" value="15+" onClick={() =>setDistance('15+')} />
                                            <span>More than 15 km</span>
                                        </label>
                                    </p>
                                </div>
                            </div>
                            <div id="time">
                                <h5 className="colorTheme">Time</h5>
                                <div className="criteria">
                                    <p>
                                        <label>
                                            <input name="time" type="radio" defaultChecked  value="all"  onClick={() =>setTime('all')} />
                                            <span>Any</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input name="time" type="radio" value="5" onClick={() =>setTime('5')} />
                                            <span>Under 5 min</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input name="time" type="radio" value="5_10" onClick={() =>setTime('5_10')} />
                                            <span>5 - 10 min</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input name="time" type="radio" value="10_20" onClick={() =>setTime('10_20')} />
                                            <span>10 - 20 min</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input name="time" type="radio" value="20+" onClick={() =>setTime('20+')} />
                                            <span>More than 20 min</span>
                                        </label>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="card-action">
                    <a className="waves-effect waves-light btn-large" onClick={btnSubmit}><i className="material-icons left">search</i>Search</a>
                </div>
            </div>
        </div>
    );
}

export default Search;