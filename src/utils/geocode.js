const axios = require('axios').default;
const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYXRoYXIzMzciLCJhIjoiY2t4aXM5NnVqNTBsNjJwbXVmeWMwNmc0ZSJ9.pvbuhckFAB1V_bCsg24Tsw&limit=1';
    axios.get(url).then((response)=>{
        if(response.data.features.length===0){
            callback('unable to find location, please try again!', undefined)
        }else{
            callback(undefined, {
                location:response.data.features[0].place_name,
                latitude:response.data.features[0].center[1],
                logitude:response.data.features[0].center[0]
            })
        } 
        
        }).catch(()=>{
            callback('Unable to connect to map services please try later!')
        })
}

module.exports = geocode;