import { Component, OnInit } from '@angular/core';
import jsonData from '../jsonDatafile.json';
@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
 
selectedBrand = "all";
greenRegion :any=[];
blueRegion :any=[];
greenRegionData :any=[];
blueRegionData :any=[];
sidebar:boolean = true;
sidebarClass:any = "sidebar";
statusFailCount :number = 0;
failCount:number=0;
partialCount:number=0
  constructor() { }

  ngOnInit(): void {
     window.addEventListener('showDialog', function(event) {
       console.log("jdsnckjdsnckjsdnckjsdnkcjns")
    });
     var jData ;
  if(localStorage.getItem('jsonData') == null){
    localStorage.setItem('jsonData',JSON.stringify(jsonData))
  }  
  jData = JSON.parse(localStorage.getItem('jsonData')!);
    this.statusFailCount=0;
    this.failCount=0;
    this.partialCount=0;
    this.greenRegion =[];
    this.blueRegion =[];
    this.greenRegionData =[];
    this.blueRegionData =[];
    this.sidebar = true;
    this.sidebarClass = "sidebar";
    this.selectedBrand = "all";
    for(var i=0; i< jData.length ;i++){
      if(i<4){
        this.greenRegionData.push(jData[i])
      }else{
        this.blueRegionData.push(jData[i])
      }
       if(jData[i].status == "Fail" || jData[i].status == "Partial"){
        this.statusFailCount = this.statusFailCount+1;
       }
       if(jData[i].status == "Fail"){
        this.failCount = this.failCount+1;
       }
       if(jData[i].status == "Partial"){
        this.partialCount = this.partialCount+1;
       }
    }
    // jsonData.forEach((element:any)=>{
    //   if(element.regionName == "Region Green"){
    //     this.greenRegion.push(element)
    //   }else{
    //     this.blueRegion.push(element)
    //   }
    // })
    // console.log(this.greenRegion);
    // console.log(this.blueRegion);
    // this.greenRegion[0].regionDeviceList.$values.forEach((element:any)=>{
    //   this.greenRegionData.push(element)
    // })
    // this.blueRegion[0].regionDeviceList.$values.forEach((element:any)=>{
    //   this.blueRegionData.push(element)
    // })
  }
  valueSelected(){
    if(this.selectedBrand == 'all'){
       this.greenRegionData = [];
      this.blueRegionData = [];
      this.greenRegion = [];
      this.blueRegion = []
    
       var jData ;
  if(localStorage.getItem('jsonData') == null){
    localStorage.setItem('jsonData',JSON.stringify(jsonData))
  }  
  jData = JSON.parse(localStorage.getItem('jsonData')!);

      for(var i=0; i< jData.length ;i++){
      if(i<4){
        this.greenRegionData.push(jData[i])
      }else{
        this.blueRegionData.push(jData[i])

      }
    }
    }else{
      this.greenRegionData = [];
      this.blueRegionData = [];
      this.greenRegion = [];
      this.blueRegion = [];
       var jData ;
  if(localStorage.getItem('jsonData') == null){
    localStorage.setItem('jsonData',JSON.stringify(jsonData))
  }  
  jData = JSON.parse(localStorage.getItem('jsonData')!);

      for(var i=0; i< jData.length ;i++){

      if(i<4){
        if(jData[i].status == this.selectedBrand){
               this.greenRegionData.push(jData[i]);
           }
       
      }else{
        if(jData[i].status == this.selectedBrand){
               this.blueRegionData.push(jData[i]);
           }
       

      }
    }
       
       console.log("changing",this.selectedBrand);
    
    }
   
  }
  toggleSidebar(value : boolean){
    this.sidebar = value;
    if(value){
      this.sidebarClass = "sidebar";
    }else{
      this.sidebarClass = "removeSidebar";
    }
  }
  sirensValue(value:any){
    this.selectedBrand = value
    this.valueSelected()
  }
  refresh(){
    this.ngOnInit();
  }

}
