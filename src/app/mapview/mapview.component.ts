import { Component, AfterViewInit, ViewChild, ElementRef ,Directive,HostListener} from '@angular/core';
import MarkerClusterer from "@google/markerclustererplus";
import { fromEvent } from "rxjs";
import jsonData from '../jsonDatafile.json';
import { ServicesService } from '../services.service'
import{ Router } from '@angular/router'
@Component({
  selector: 'app-mapview',
  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.css']
})
export class MapviewComponent implements AfterViewInit {
  @ViewChild('map', {static: false}) mapElement:any = ElementRef;
  map:any =  google.maps.Map;
  center = new google.maps.LatLng(55.478001, 11.671320);
  marker:any =  google.maps.Marker;
  mapMarkers: any = [];
  markerCluster: any;
  mapOptions: google.maps.MapOptions = {
    center: this.center,
    zoom: 6
  };
  infoWindow:any =  google.maps.InfoWindow;
  dName:any;
  status:any;
  image:any;
  address:any;
  infotime:any;
  voltage:any;
  sidebar:boolean = true;
sidebarClass:any = "sidebar";
statusFailCount :number = 0;
constructor(public services : ServicesService,public router:Router){}
ngAfterViewInit(){
  this.mapInit();
}
mapInit(){
  var ccData : any = [];
  var sirenData : any = [];
  var jsonData1;
  var jData ;
  //getting jsonData and store in localStorage
  if(localStorage.getItem('jsonData') == null){
    localStorage.setItem('jsonData',JSON.stringify(jsonData))
  }  
  jData = JSON.parse(localStorage.getItem('jsonData')!);
  //separated cc and siren Data
  jData.forEach((element : any)=>{
    if(element.status == "Fail" || element.status == "Partial"){
        this.statusFailCount = this.statusFailCount+1;
       }
    // element.regionDeviceList.$values.forEach((element:any)=>{
    console.log(element)
    if(element.name.startsWith("CC")){
      var value = {location : {lat : element.location.y,lng: element.location.x} , data : element}
      ccData.push(value)
    }else{
      var value = {location : {lat : element.location.y,lng: element.location.x} , data : element}
      sirenData.push(value)
    }
    // })
  })
  this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
// this.marker = new google.maps.Marker({position: this.center, map:this.map})
  this.infoWindow = new google.maps.InfoWindow();

  for (let i of ccData){
     const image ="../assets/CC.png";
    const tempMarker = new google.maps.Marker({position: i.location, map: this.map,icon:image});
    tempMarker.addListener('click',((tempMarker, map, infoWindow) => {
    return () => {
      var flag_1_content = i.data['Flag 1'] ? 'style="background-color:green;padding-left: 27px;"' : 'style="background-color:red;padding-left: 27px;"'      
      var flag_2_content = i.data['Flag 2'] ? 'style="background-color:green;padding-left: 15px;"' : 'style="background-color:red;padding-left: 15px;"'
      var flag_3_content = i.data['Flag 3'] ? 'style="background-color:green;padding-left: 15px;"' : 'style="background-color:red;padding-left: 15px;"'
      var flag_4_content = i.data['Flag 4'] ? 'style="background-color:green;padding-left: 27px;"' : 'style="background-color:red;padding-left: 27px;"'
      var flag_5_content = i.data['Flag 5'] ? 'style="background-color:green;padding-left: 15px;"' : 'style="background-color:red;padding-left: 15px;"'     
      this.dName = i.data.name;
      this.status = i.data.status;
      this.image = i.data.image;
      this.address = i.data.address;
      this.infotime = i.data.infotime;
      this.voltage = i.data.voltage;
      //Latitude and longitude data marked in map
      var status_content = i.data.status == "Normal" ? 'style="border-radius: 25px;background-color: green;padding: 10px;width: 10px;margin-bottom: 0;margin-left: 4px;"' : i.data.status == "Partial" ? 'style="border-radius: 25px;background-color: #ffe101;padding: 10px;width: 10px;margin-bottom: 0;margin-left: 4px;"' : 'style="border-radius: 25px;background-color: red; padding: 10px;width: 10px;margin-bottom: 0;margin-left: 4px;"'

    infoWindow.setContent('<div style="width :270px"><h4 style="display:flex;align-items:center;justify-content: space-between;margin-bottom: 5px;"><div><i style="font-size:1.3rem;margin-right:5px" class="bi bi-box-arrow-right"></i><span onClick="goto()" style="text-decoration: none;color: black;font-size: 1rem;">Go to devices</span></div><div class="top-icon1"><i onClick="refresh({id:'+i.data.dId+'})" style="cursor:pointer;" class="bi bi-arrow-clockwise"></i><i onClick="cancelFunction()" class="bi bi-x-lg"></i></div></h4><p style="background-color:black;color: white;padding:6px;width:100%;margin-bottom: 5px;">'+i.data.name+ '</p><p style="margin:0">Location:</p><p style="margin-bottom:7px;font-weight:600">'+i.data.address+'</p><div style="display:flex;align-items: center;margin-bottom: 4px;"><p style="margin-bottom:2px">Status:</p><p '+status_content+'></p></div><img style="width:100%" src="../assets/'+i.data.image+'"><p style="background-color: black;color: white;padding: 6px;margin-top: 1rem;text-align: center;margin-top: 0.5rem;margin-bottom: 0.5rem;">Siren Status</p><div class="row"><div class="col-4"><span onClick="myFunction1({id:'+i.data.dId+',flag_1:'+ !i.data["Flag 1"]+',flag_2:' + i.data["Flag 2"]+',flag_3:'+ i.data["Flag 3"]+',flag_4:' + i.data["Flag 4"]+',flag_5:' + i.data["Flag 5"]+ '})" '+ flag_1_content+'></span>Flag 1</div><div class="col-4"><span onClick="myFunction1({id:'+i.data.dId+',flag_1:'+ i.data["Flag 1"]+',flag_2:' + !i.data["Flag 2"]+',flag_3:'+ i.data["Flag 3"]+',flag_4:' + i.data["Flag 4"]+',flag_5:' + i.data["Flag 5"]+ '})" '+flag_2_content+'></span>Flag 2</div><div class="col-4"><span onClick="myFunction1({id:'+i.data.dId+',flag_1:'+ i.data["Flag 1"]+',flag_2:' + i.data["Flag 2"]+',flag_3:'+ !i.data["Flag 3"]+',flag_4:' + i.data["Flag 4"]+',flag_5:' + i.data["Flag 5"]+ '})" '+ flag_3_content+'></span>Flag 3</div><div style="margin-top:0.5rem" class="col-4"><span onClick="myFunction1({id:'+i.data.dId+',flag_1:'+ i.data["Flag 1"]+',flag_2:' + i.data["Flag 2"]+',flag_3:'+ i.data["Flag 3"]+',flag_4:' + !i.data["Flag 4"]+',flag_5:' + i.data["Flag 5"]+ '})" '+flag_4_content+'></span>Flag 4</div><div style="margin-top:0.5rem" class="col-4"><span onClick="myFunction1({id:'+i.data.dId+',flag_1:'+ i.data["Flag 1"]+',flag_2:' + i.data["Flag 2"]+',flag_3:'+ i.data["Flag 3"]+',flag_4:' + i.data["Flag 4"]+',flag_5:' + !i.data["Flag 5"]+ '})" '+flag_5_content+'></span>Flag 5</div></div><div><div style="margin-top:0.5rem" class="row"><div class="col-7"><p style="margin-bottom:0.4rem">Info Time</p><p style="border:1px solid">'+ new Date(Date.parse(i.data.infotime)).toUTCString() +'</p></div><div class="col-5"><p style="margin-bottom:0.4rem">Info Time</p><p style="border:1px solid">'+ i.data.voltage +'</p></div></div><div style="float:right"><span style="background-color : #149cb7;color:white;padding: 3px 10px;cursor: pointer;" onClick = "saveFunction({id:'+i.data.dId+',flag1:'+ i.data["Flag 1"]+',flag2: '+ i.data["Flag 2"] +',flag3:'+ i.data["Flag 3"] +',flag4:'+ i.data["Flag 4"] +',flag5:'+ i.data["Flag 5"] +'})">Save</span><span style="margin-left:1rem;background-color : grey;color:white;padding: 3px 10px;cursor: pointer;" onClick="cancelFunction()">Cancel</span></div></div>');
    infoWindow.open(map, tempMarker);
    }
    })(tempMarker, this.map, this.infoWindow));
   this.mapMarkers.push(tempMarker);
  }
  for (let i of sirenData){
    const image ="../assets/Siren.png";
    const tempMarker = new google.maps.Marker({position: i.location, map: this.map,icon:image});
    tempMarker.addListener('click',((tempMarker, map, infoWindow) => {
    return () => {
      var flag_1_content = i.data['Flag 1'] ? 'style="background-color:green;padding-left: 27px;"' : 'style="background-color:red;padding-left: 27px;"' 
      var flag_2_content = i.data['Flag 2'] ? 'style="background-color:green;padding-left: 15px;"' : 'style="background-color:red;padding-left: 15px;"'
      var flag_3_content = i.data['Flag 3'] ? 'style="background-color:green;padding-left: 15px;"' : 'style="background-color:red;padding-left: 15px;"'
      var flag_4_content = i.data['Flag 4'] ? 'style="background-color:green;padding-left: 27px;"' : 'style="background-color:red;padding-left: 27px;"'
      var flag_5_content = i.data['Flag 5'] ? 'style="background-color:green;padding-left: 15px;"' : 'style="background-color:red;padding-left: 15px;"'      
      this.dName = i.data.name;
      this.status = i.data.status;
      this.image = i.data.image;
      this.address = i.data.address;
      this.infotime = i.data.infotime;
      this.voltage = i.data.voltage;   
      var status_content = i.data.status == "Normal" ? 'style="border-radius: 25px;background-color: green;padding: 10px;width: 10px;margin-bottom: 0;margin-left: 4px;"' : i.data.status == "Partial" ? 'style="border-radius: 25px;background-color: #ffe101;padding: 10px;width: 10px;margin-bottom: 0;margin-left: 4px;"' : 'style="border-radius: 25px;background-color: red; padding: 10px;width: 10px;margin-bottom: 0;margin-left: 4px;"'
      //Latitude and longitude data marked in map
    infoWindow.setContent('<div style="width :270px"><h4 style="display:flex;align-items:center;justify-content: space-between;margin-bottom: 5px;"><div><i style="font-size:1.3rem;margin-right:5px" class="bi bi-box-arrow-right"></i><span onClick="goto()" style="text-decoration: none;color: black;font-size: 1rem;">Go to devices</span></div><div class="top-icon1"><i onClick="refresh({id:'+i.data.dId+'})" style="cursor:pointer;" class="bi bi-arrow-clockwise"></i><i onClick="cancelFunction()" class="bi bi-x-lg"></i></div></h4><p style="background-color:black;color: white;padding:6px;width:100%;margin-bottom: 5px;">'+i.data.name+ '</p><p style="margin:0">Location:</p><p style="margin-bottom:7px;font-weight:600">'+i.data.address+'</p><div style="display:flex;align-items: center;margin-bottom: 4px;"><p style="margin-bottom:2px">Status:</p><p '+status_content+'></p></div><img style="width:100%" src="../assets/'+i.data.image+'"><p style="background-color: black;color: white;padding: 6px;margin-top: 1rem;text-align: center;margin-top: 0.5rem;margin-bottom: 0.5rem;">Siren Status</p><div class="row"><div class="col-4"><span onClick="myFunction1({id:'+i.data.dId+',flag_1:'+ !i.data["Flag 1"]+',flag_2:' + i.data["Flag 2"]+',flag_3:'+ i.data["Flag 3"]+',flag_4:' + i.data["Flag 4"]+',flag_5:' + i.data["Flag 5"]+ '})" '+ flag_1_content +'></span>Flag 1</div><div class="col-4"><span onClick="myFunction1({id:'+i.data.dId+',flag_1:'+ i.data["Flag 1"]+',flag_2:' + !i.data["Flag 2"]+',flag_3:'+ i.data["Flag 3"]+',flag_4:' + i.data["Flag 4"]+',flag_5:' + i.data["Flag 5"]+ '})" '+flag_2_content+'></span>Flag 2</div><div class="col-4"><span onClick="myFunction1({id:'+i.data.dId+',flag_1:'+ i.data["Flag 1"]+',flag_2:' + i.data["Flag 2"]+',flag_3:'+ !i.data["Flag 3"]+',flag_4:' + i.data["Flag 4"]+',flag_5:' + i.data["Flag 5"]+ '})" '+ flag_3_content+'></span>Flag 3</div><div style="margin-top:0.5rem" class="col-4"><span onClick="myFunction1({id:'+i.data.dId+',flag_1:'+ i.data["Flag 1"]+',flag_2:' + i.data["Flag 2"]+',flag_3:'+ i.data["Flag 3"]+',flag_4:' + !i.data["Flag 4"]+',flag_5:' + i.data["Flag 5"]+ '})" '+flag_4_content+'></span>Flag 4</div><div style="margin-top:0.5rem" class="col-4"><span onClick="myFunction1({id:'+i.data.dId+',flag_1:'+ i.data["Flag 1"]+',flag_2:' + i.data["Flag 2"]+',flag_3:'+ i.data["Flag 3"]+',flag_4:' + i.data["Flag 4"]+',flag_5:' + !i.data["Flag 5"]+ '})" '+flag_5_content+'></span>Flag 5</div></div><div><div style="margin-top:0.5rem" class="row"><div class="col-7"><p style="margin-bottom:0.4rem">Info Time</p><p style="border:1px solid">'+ new Date(Date.parse(i.data.infotime)).toUTCString() +'</p></div><div class="col-5"><p style="margin-bottom:0.4rem">Info Time</p><p style="border:1px solid">'+ i.data.voltage +'</p></div></div><div style="float:right"><span style="background-color : #149cb7;color:white;padding: 3px 10px;cursor: pointer;" onClick = "saveFunction({id:'+i.data.dId+',flag1:'+ i.data["Flag 1"]+',flag2: '+ i.data["Flag 2"] +',flag3:'+ i.data["Flag 3"] +',flag4:'+ i.data["Flag 4"] +',flag5:'+ i.data["Flag 5"] +'})">Save</span><span style="margin-left:1rem;background-color : grey;color:white;padding: 3px 10px;cursor: pointer;" onClick="cancelFunction()">Cancel</span></div></div>');
    infoWindow.open(map, tempMarker);
    }
    infoWindow.addListener('closeclick', ()=>{
      console.log("cancel called")
    });
    })(tempMarker, this.map, this.infoWindow));
     this.mapMarkers.push(tempMarker);
    }
    this.markerCluster = new MarkerClusterer(this.map,this.mapMarkers,{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'})
  }
  //Popup model closing event
  @HostListener('window:popup.close', ['$event']) 
    onPaymentclose(event:any): void {
      this.infoWindow.close();
    }
   //Saving Data to json File
  @HostListener('window:popup.complete', ['$event']) 
    onPaymentcomplete(event:any): void {
    if(confirm("Are you sure to save this data ")) {
      this.services.updateJson(event.detail)
       this.infoWindow.close();
       window.location.reload()
      }
    }
    //pop model trigger event
  @HostListener('window:popup.success', ['$event']) 
    onPaymentSuccess(event:any): void {
      var flag_1_content = event.detail.flag_1 ? 'style="background-color:green;padding-left: 27px;"' : 'style="background-color:red;padding-left: 27px;"'      
      var flag_2_content = event.detail.flag_2 ? 'style="background-color:green;padding-left: 15px;"' : 'style="background-color:red;padding-left: 15px;"'
      var flag_3_content = event.detail.flag_3 ? 'style="background-color:green;padding-left: 15px;"' : 'style="background-color:red;padding-left: 15px;"'
      var flag_4_content = event.detail.flag_4 ? 'style="background-color:green;padding-left: 27px;"' : 'style="background-color:red;padding-left: 27px;"'
      var flag_5_content = event.detail.flag_5 ? 'style="background-color:green;padding-left: 15px;"' : 'style="background-color:red;padding-left: 15px;"'          
      var status_content = this.status == "Normal" ? 'style="border-radius: 25px;background-color: green;padding: 10px;width: 10px;margin-bottom: 0;margin-left: 4px;"' : this.status == "Partial" ? 'style="border-radius: 25px;background-color: #ffe101;padding: 10px;width: 10px;margin-bottom: 0;margin-left: 4px;"' : 'style="border-radius: 25px;background-color: red; padding: 10px;width: 10px;margin-bottom: 0;margin-left: 4px;"'
      this.infoWindow.setContent('<div style="width :270px"><h4 style="display:flex;align-items:center;justify-content: space-between;margin-bottom: 5px;"><div><i style="font-size:1.3rem;margin-right:5px" class="bi bi-box-arrow-right"></i><span onClick="goto()" style="text-decoration: none;color: black;font-size: 1rem;">Go to devices</span></div><div class="top-icon1"><i onClick="refresh({id:'+event.detail.id+'})" style="cursor:pointer;" class="bi bi-arrow-clockwise"></i><i onClick="cancelFunction()" class="bi bi-x-lg"></i></div></h4><p style="background-color:black;color: white;padding:6px;width:100%;margin-bottom: 5px;">'+this.dName+ '</p><p style="margin:0;">Location:</p><p style="margin-bottom:7px;font-weight:600">'+this.address+'</p><div style="display:flex;align-items: center;margin-bottom: 4px;"><p style="margin-bottom:2px">Status:</p><p '+status_content+'></p></div><img style="width:100%" src="../assets/'+this.image+'"><p style="background-color: black;color: white;padding: 6px;margin-top: 1rem;text-align: center;margin-top: 0.5rem;margin-bottom: 0.5rem;">Siren Status</p><div class="row"><div class="col-4"><span onClick="myFunction1({id:'+event.detail.id+',flag_1:'+ !event.detail.flag_1+',flag_2:' + event.detail.flag_2+',flag_3:'+ event.detail.flag_3+',flag_4:' + event.detail.flag_4+',flag_5:' + event.detail.flag_5+ '})" '+ flag_1_content+'></span>Flag 1</div><div class="col-4"><span onClick="myFunction1({id:'+event.detail.id+',flag_1:'+ event.detail.flag_1+',flag_2:' + !event.detail.flag_2+',flag_3:'+ event.detail.flag_3+',flag_4:' + event.detail.flag_4+',flag_5:' + event.detail.flag_5+ '})" '+flag_2_content+'></span>Flag 2</div><div class="col-4"><span onClick="myFunction1({id:'+event.detail.id+',flag_1:'+ event.detail.flag_1+',flag_2:' + event.detail.flag_2+',flag_3:'+ !event.detail.flag_3+',flag_4:' + event.detail.flag_4+',flag_5:' + event.detail.flag_5+ '})" '+ flag_3_content+'></span>Flag 3</div><div style="margin-top:0.5rem" class="col-4"><span onClick="myFunction1({id:'+event.detail.id+',flag_1:'+ event.detail.flag_1+',flag_2:' + event.detail.flag_2+',flag_3:'+ event.detail.flag_3+',flag_4:' + !event.detail.flag_4+',flag_5:' + event.detail.flag_5+ '})" '+flag_4_content+'></span>Flag 4</div><div style="margin-top:0.5rem" class="col-4"><span onClick="myFunction1({id:'+event.detail.id+',flag_1:'+ event.detail.flag_1+',flag_2:' + event.detail.flag_2+',flag_3:'+ event.detail.flag_3+',flag_4:' + event.detail.flag_4+',flag_5:' + !event.detail.flag_5+ '})" '+flag_5_content+'></span>Flag 5</div></div><div><div style="margin-top:0.5rem" class="row"><div class="col-7"><p style="margin-bottom:0.4rem">Info Time</p><p style="border:1px solid">'+ new Date(Date.parse(this.infotime)).toUTCString() +'</p></div><div class="col-5"><p style="margin-bottom:0.4rem">Info Time</p><p style="border:1px solid">'+ this.voltage +'</p></div></div><div style="float:right"><span style="background-color : #149cb7;color:white;padding: 3px 10px;cursor: pointer;" onClick = "saveFunction({id:'+event.detail.id+',flag1:'+ event.detail.flag_1+',flag2: '+ event.detail.flag_2 +',flag3:'+event.detail.flag_3 +',flag4:'+ event.detail.flag_4 +',flag5:'+ event.detail.flag_5 +'})">Save</span><span style="margin-left:1rem;background-color : grey;color:white;padding: 3px 10px;cursor: pointer;" onClick="cancelFunction()">Cancel</span></div></div>');
    }
   toggleSidebar(value : boolean){
    this.sidebar = value;
    if(value){
      this.sidebarClass = "sidebar";
    }else{
      this.sidebarClass = "removeSidebar";
    }
  }
   @HostListener('window:popup.goto', ['$event']) 
    goto(event:any): void {
      console.log("navi")
      this.router.navigate(['/devices'])
    }
    @HostListener('window:popup.refresh', ['$event']) 
    refresh(event:any): void {
      console.log("refresh",event);

      var jData ;
      //getting jsonData and store in localStorage
      if(localStorage.getItem('jsonData') == null){
        localStorage.setItem('jsonData',JSON.stringify(jsonData))
      }  
      jData = JSON.parse(localStorage.getItem('jsonData')!);
      //separated cc and siren Data
      jData.forEach((element : any)=>{
       if(element.dId == event.detail.id){
                var flag_1_content = element["Flag 1"] ? 'style="background-color:green;padding-left: 27px;"' : 'style="background-color:red;padding-left: 27px;"'      
      var flag_2_content = element["Flag 2"] ? 'style="background-color:green;padding-left: 15px;"' : 'style="background-color:red;padding-left: 15px;"'
      var flag_3_content =element["Flag 3"] ? 'style="background-color:green;padding-left: 15px;"' : 'style="background-color:red;padding-left: 15px;"'
      var flag_4_content =element["Flag 4"]? 'style="background-color:green;padding-left: 27px;"' : 'style="background-color:red;padding-left: 27px;"'
      var status_content = this.status == "Normal" ? 'style="border-radius: 25px;background-color: green;padding: 10px;width: 10px;margin-bottom: 0;margin-left: 4px;"' : this.status == "Partial" ? 'style="border-radius: 25px;background-color: #ffe101;padding: 10px;width: 10px;margin-bottom: 0;margin-left: 4px;"' : 'style="border-radius: 25px;background-color: red; padding: 10px;width: 10px;margin-bottom: 0;margin-left: 4px;"'
      var flag_5_content =element["Flag 5"] ? 'style="background-color:green;padding-left: 15px;"' : 'style="background-color:red;padding-left: 15px;"'          
      this.infoWindow.setContent('<div style="width :270px"><h4 style="display:flex;align-items:center;justify-content: space-between;margin-bottom: 5px;"><div><i style="font-size:1.3rem;margin-right:5px" class="bi bi-box-arrow-right"></i><span onClick="goto()" style="text-decoration: none;color: black;font-size: 1rem;">Go to devices</span></div><div class="top-icon1"><i onClick="refresh({id:'+event.detail.id+'})" style="cursor:pointer;" class="bi bi-arrow-clockwise"></i><i onClick="cancelFunction()" class="bi bi-x-lg"></i></div></h4><p style="background-color:black;color: white;padding:6px;width:100%;margin-bottom: 5px;">'+this.dName+ '</p><p style="margin:0">Location:</p><p style="margin-bottom:7px;font-weight:600">'+this.address+'</p><div style="display:flex;align-items: center;margin-bottom: 4px;"><p style="margin-bottom:2px">Status:</p><p '+status_content+'></p></div><img style="width:100%" src="../assets/'+this.image+'"><p style="background-color: black;color: white;padding: 6px;margin-top: 1rem;text-align: center;margin-top: 0.5rem;margin-bottom: 0.5rem;">Siren Status</p><div class="row"><div class="col-4"><span onClick="myFunction1({id:'+event.detail.id+',flag_1:'+ element["Flag 1"]+',flag_2:' + element["Flag 2"]+',flag_3:'+ element["Flag 3"]+',flag_4:' + element["Flag 4"] +',flag_5:' + element["Flag 5"]+ '})" '+ flag_1_content+'></span>Flag 1</div><div class="col-4"><span onClick="myFunction1({id:'+event.detail.id+',flag_1:'+ element["Flag 1"]+',flag_2:' + element["Flag 2"]+',flag_3:'+ element["Flag 3"]+',flag_4:' + element["Flag 4"]+',flag_5:' + element["Flag 5"]+ '})" '+flag_2_content+'></span>Flag 2</div><div class="col-4"><span onClick="myFunction1({id:'+event.detail.id+',flag_1:'+ element["Flag 1"]+',flag_2:' + element["Flag 2"]+',flag_3:'+element["Flag 3"]+',flag_4:' + element["Flag 4"]+',flag_5:' + element["Flag 5"]+ '})" '+ flag_3_content+'></span>Flag 3</div><div style="margin-top:0.5rem" class="col-4"><span onClick="myFunction1({id:'+event.detail.id+',flag_1:'+ element["Flag 1"]+',flag_2:' + element["Flag 2"]+',flag_3:'+ element["Flag 3"]+',flag_4:' + element["Flag 4"]+',flag_5:' + element["Flag 5"]+ '})" '+flag_4_content+'></span>Flag 4</div><div style="margin-top:0.5rem" class="col-4"><span onClick="myFunction1({id:'+event.detail.id+',flag_1:'+ element["Flag 1"]+',flag_2:' +  element["Flag 2"]+',flag_3:'+  element["Flag 3"]+',flag_4:' +  element["Flag 4"]+',flag_5:' +  element["Flag 5"] + '})" '+flag_5_content+'></span>Flag 5</div></div><div><div style="margin-top:0.5rem" class="row"><div class="col-7"><p style="margin-bottom:0.4rem">Info Time</p><p style="border:1px solid">'+ new Date(Date.parse(this.infotime)).toUTCString() +'</p></div><div class="col-5"><p style="margin-bottom:0.4rem">Info Time</p><p style="border:1px solid">'+ this.voltage +'</p></div></div><div style="float:right"><span style="background-color : #149cb7;color:white;padding: 3px 10px;cursor: pointer;" onClick = "saveFunction({id:'+event.detail.id+',flag1:'+ event.detail.flag_1+',flag2: '+ event.detail.flag_2 +',flag3:'+event.detail.flag_3 +',flag4:'+ event.detail.flag_4 +',flag5:'+ event.detail.flag_5 +'})">Save</span><span style="margin-left:1rem;background-color : grey;color:white;padding: 3px 10px;cursor: pointer;" onClick="cancelFunction()">Cancel</span></div></div>');

       }
      })
    }
}

