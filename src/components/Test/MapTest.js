import React, { Component } from 'react'
import './map.css';

class MapTest extends Component {

    componentDidMount(){
        this.loadMap();
    }

    loadMap=()=>{
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyA-d_O6FChilUx5RC3O1sGlrEuXfEKCD_s&callback=initMap");
        window.initMap = this.initMap;
    }

    getVeneus = () => {
        
    }

    initMap=()=> {
        var map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
      }
    render() {
        return (
            <div>
                <div id="map"></div>
            </div>
        )
    }

    /*
     <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
    async defer></script>
    
    */
  
}
function loadScript(url) {
    var index = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = url;
    script.async = true;
    script.defer = true;
    index.parentNode.insertBefore(script, index)
}
export default MapTest;