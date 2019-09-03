import React from 'react';
import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import Geocode from "react-geocode";
import data from '../../data/data';

Geocode.setApiKey("AIzaSyDLkr12QocOI4T8tuvw17GvReZvFufjCco");
Geocode.enableDebug(false);

const mapStyles = {
    width: '100%',
    height: '100%',
  };
  
class ViewMap extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            mapData: []
        }
        this.getPositions = this.getPositions.bind(this);
        this.getPositions(0, []);
    }

    getPositions(index, finalData){
        if(index < data.length){
            Geocode.fromAddress(data[index].college + ", "+ data[index].district)
                .then(
                    response => {
                        const { lat, lng } = response.results[0].geometry.location;
                        finalData.push({
                            lat: lat, lng: lng,
                            label: data[index].student
                        })
                        this.getPositions(index+1, finalData);
                      },
                      error => {
                        console.error(error);
                        // in case of error pushing hyderabd coordinates
                        finalData.push({
                            lat: 17.4121531, lng: 78.1278513,
                            label: data[index].student                            
                        })
                        this.getPositions(index+1, finalData);
                      }
                )
        }else{
            this.setState({
                mapData: finalData
            })
        }
    }

    render() {
        return (
            <div className="view-map">
                <h2>View Map</h2>
                <Map
                    google={this.props.google}
                    zoom={8}
                    center ={{ lat: 17.4121531, lng: 78.1278513    }}
                    centerAroundCurrentLocation={true} 
                    style={mapStyles}
                >
                {
                    this.state.mapData.map((geoData, geoDataIndex)=>{
                        return <Marker key={geoDataIndex} position={geoData} name={geoData.label}/>
                    })
                }
                
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDLkr12QocOI4T8tuvw17GvReZvFufjCco'
  })(ViewMap);