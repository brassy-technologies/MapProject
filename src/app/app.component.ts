import { Component, AfterViewInit, ViewChild, ElementRef,Directive,HostListener } from '@angular/core';
import MarkerClusterer from "@google/markerclustererplus";

@Directive({selector: 'button[counting]'})
class CountClicks {
  numberOfClicks = 0;

  @HostListener('click', ['$event.target'])
  onClick(btn:any) {
    console.log('button', btn, 'number of clicks:', this.numberOfClicks++);
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('map', {static: false}) mapElement:any = ElementRef;
  map:any =  google.maps.Map;
  center = new google.maps.LatLng( 11.671320, 55.478001);
  marker:any =  google.maps.Marker;
  mapMarkers: any = [];
  markerCluster: any;
  mapOptions: google.maps.MapOptions = {
    center: this.center,
    zoom: 10
  };
  infoWindow:any =  google.maps.InfoWindow;
  jsonData:any =  [
    {
      "$id": "2",
      "regionName": "Region Green",
      "address": "Aarhus, Dk",
      "ccCount": 1,
      "sirenCount": 3,
      "regionDeviceList": {
        "$values": [
          {
            "dId": "1",
            "name": "CC001",
            "status": "Fail",
            "location": {
              "x": 10.240012,
              "y": 56.225607
            },
            "Flag 1": true,
            "Flag 2": true,
            "Flag 3": false,
            "Flag 4": false,
            "Flag 5": true,
            "voltage": 25.50,
            "address": "Lægårdsvej 12, 8520 Lystrup",
            "deviceTypeImg": "cc.png",
            "infotime": "2022-09-07T13:43:48.873033",
            "image": "CC001.png"
          },
          {
            "dId": "2",
            "name": "SIR001",
            "status": "Fail",
            "location": {
              "x": 10.237575,
              "y": 56.225528
            },
            "Flag 1": false,
            "Flag 2": true,
            "Flag 3": true,
            "Flag 4": true,
            "Flag 5": true,
            "voltage": 25.50,
            "address": "Lægårdsvej, 8520 Lystrup",
            "deviceTypeImg": "siren.png",
            "infotime": "2022-09-07T23:43:48.873033",
            "image": "SIR001.png"
          },
          {
            "dId": "3",
            "name": "SIR002",
            "status": "Partial",
            "location": {
              "x": 10.206624,
              "y": 56.148810
            },
            "Flag 1": true,
            "Flag 2": true,
            "Flag 3": false,
            "Flag 4": true,
            "Flag 5": true,
            "voltage": 25.50,
            "address": "8000 Aarhus C",
            "deviceTypeImg": "siren.png",
            "infotime": "2022-09-07T07:43:48.873033",
            "image": "SIR002.png"
          },
          {
            "dId": "4",
            "name": "SIR003",
            "status": "Normal",
            "location": {
              "x": 10.234422,
              "y": 56.092216

            },
            "Flag 1": true,
            "Flag 2": true,
            "Flag 3": true,
            "Flag 4": true,
            "Flag 5": true,
            "voltage": 25.50,
            "address": "Aarhus Municipality",
            "deviceTypeImg": "Siren.png",
            "infotime": "2022-09-07T07:43:48.873033",
            "image": "SIR003.png"
          }
        ]
      }
    },
    {
      "$id": "3",
      "regionName": "Region Blue",
      "address": "København, Dk",
      "ccCount": 1,
      "sirenCount": 5,
      "regionDeviceList": {
        "$values": [
          {
            "dId": "5",
            "name": "CC002",
            "status": "Normal",
            "location": {
              "x": 12.647122,
              "y": 55.612672
            },
            "Flag 1": true,
            "Flag 2": true,
            "Flag 3": true,
            "Flag 4": true,
            "Flag 5": true,
            "voltage": 25.50,
            "address": "Capital Region of Denmark",
            "deviceTypeImg": "cc.png",
            "infotime": "2022-09-07T08:43:48.873033",
            "image": "CC002.png"
          },
          {
            "dId": "6",
            "name": "SIR006",
            "status": "Normal",
            "location": {
              "x": 12.657788,
              "y": 55.633954
            },
            "Flag 1": true,
            "Flag 2": true,
            "Flag 3": true,
            "Flag 4": true,
            "Flag 5": true,
            "voltage": 25.50,
            "address": "Kastrup",
            "deviceTypeImg": "Siren.png",
            "infotime": "2022-09-07T07:49:48.873033",
            "image": "SIR006.png"
          },
          {
            "dId": "7",
            "name": "SIR007",
            "status": "Normal",
            "location": {
              "x": 12.615427,
              "y": 55.565812
            },
            "Flag 1": true,
            "Flag 2": true,
            "Flag 3": true,
            "Flag 4": true,
            "Flag 5": true,
            "voltage": 25.50,
            "address": "Dragør",
            "deviceTypeImg": "Siren.png",
            "infotime": "2022-08-07T07:43:41.873033",
            "image": "SIR007.png"
          },
          {
            "dId": "8",
            "name": "SIR008",
            "status": "Normal",
            "location": {
              "x": 12.571024,
              "y": 55.625896
            },
            "Flag 1": true,
            "Flag 2": true,
            "Flag 3": true,
            "Flag 4": true,
            "Flag 5": true,
            "voltage": 25.50,
            "]": "2300 København",
            "deviceTypeImg": "Siren.png",
            "infotime": "2022-07-07T07:43:48.873033",
            "image": "SIR008.png"
          },
          {
            "dId": "9",
            "name": "SIR009",
            "status": "Normal",
            "location": {
              "x": 12.609107,
              "y": 55.696436
            },
            "Flag 1": true,
            "Flag 2": true,
            "Flag 3": true,
            "Flag 4": true,
            "Flag 5": true,
            "voltage": 25.50,
            "address": "Refshalevej, 1432 København",
            "deviceTypeImg": "Siren.png",
            "infotime": "2022-06-07T07:43:48.873033",
            "image": "SIR009.png"
          },
          {
            "dId": "10",
            "name": "SIR010",
            "status": "Fail",
            "location": {
              "x": 11.671320,
              "y": 55.478001
            },
            "Flag 1": false,
            "Flag 2": false,
            "Flag 3": false,
            "Flag 4": false,
            "Flag 5": false,
            "voltage": 25.50,
            "address": "4100 Ringsted, DK",
            "deviceTypeImg": "Siren.png",
            "infotime": "2022-09-04T07:43:48.873033",
            "image": "SIR010.png"
          }
        ]
      }
    }

]
  locations: any = [
    {lat: -31.563910, lng: 147.154312},
    {lat: -33.718234, lng: 150.363181},
    {lat: -33.727111, lng: 150.371124},
    {lat: -33.848588, lng: 151.209834},
    {lat: -33.851702, lng: 151.216968},
    {lat: -34.671264, lng: 150.863657},
    {lat: -35.304724, lng: 148.662905},
    {lat: -36.817685, lng: 175.699196},
    {lat: -36.828611, lng: 175.790222},
    {lat: -37.750000, lng: 145.116667},
    {lat: -37.759859, lng: 145.128708},
    {lat: -37.765015, lng: 145.133858},
    {lat: -37.770104, lng: 145.143299},
    {lat: -37.773700, lng: 145.145187},
    {lat: -37.774785, lng: 145.137978},
    {lat: -37.819616, lng: 144.968119},
    {lat: -38.330766, lng: 144.695692},
    {lat: -39.927193, lng: 175.053218},
    {lat: -41.330162, lng: 174.865694},
    {lat: -42.734358, lng: 147.439506},
    {lat: -42.734358, lng: 147.501315},
    {lat: -42.735258, lng: 147.438000},
    {lat: -43.999792, lng: 170.463352}
  ]
ngAfterViewInit(){
  this.mapInit();
}
mapInit(){
  var new1 : any = [];
var new2 : any = [];
  this.jsonData.forEach((element : any)=>{
    element.regionDeviceList.$values.forEach((element:any)=>{
    console.log(element)
    if(element.name.startsWith("CC")){
      var value = {location : {lat : element.location.x,lng: element.location.y} , data : element}
      new1.push(value)
    }else{
      var value = {location : {lat : element.location.x,lng: element.location.y} , data : element}
      new2.push(value)
    }
    
    })
  })
  console.log(new1)
   console.log(new2)
  this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
// this.marker = new google.maps.Marker({position: this.center, map:this.map})
  this.infoWindow = new google.maps.InfoWindow();

  for (let i of new1){
 const image =
    "../mapproject/mapproject/assets/CC.png";
 
    const tempMarker = new google.maps.Marker({position: i.location, map: this.map,icon:image});
    tempMarker.addListener('click',((tempMarker, map, infoWindow) => {
    return () => {
    infoWindow.setContent('<p><b>Longitude</b> : ' + i.lng + '</p><p><b>Latitude</b> : ' + i.lat +'</p>');
    infoWindow.open(map, tempMarker);
    }
    })(tempMarker, this.map, this.infoWindow));

   this.mapMarkers.push(tempMarker);
  }
  for (let i of new2){
const image =
    "../mapproject/mapproject/assets/Siren.png";
 
    const tempMarker = new google.maps.Marker({position: i.location, map: this.map,icon:image});
    tempMarker.addListener('click',((tempMarker, map, infoWindow) => {
    return () => {
    infoWindow.setContent('<p><b>Longitude</b> : ' + i.location.lng + '</p><p><b>Latitude</b> : ' + i.lat +'</p>');
    infoWindow.open(map, tempMarker);
    }
    })(tempMarker, this.map, this.infoWindow));

   this.mapMarkers.push(tempMarker);
  }
  this.markerCluster = new MarkerClusterer(this.map,this.mapMarkers,{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'})
  }
}

