import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor() { 


  }

  updateJson(data:any,){
     var deviceStatus = '';
      if(data.flag1 && data.flag2 && data.flag3 && data.flag4 && data.flag5){
        deviceStatus = "Normal"
      }else if(!data.flag1 && !data.flag2 && !data.flag3 && !data.flag4 && !data.flag5){
        deviceStatus = "Fail"
      }else if(!data.flag1 || !data.flag2 || !data.flag3 || !data.flag4 || !data.flag5){
        deviceStatus = "Partial"
      }
    var newJsonData:any =[]
    JSON.parse(localStorage.getItem('jsonData')!).forEach((element : any)=>{          
                if(element.dId == data.id){
                  element['status'] = deviceStatus
                  element['Flag 1'] = data.flag1
                  element['Flag 2'] = data.flag2
                  element['Flag 3'] = data.flag3
                  element['Flag 4'] = data.flag4
                  element['Flag 5'] = data.flag5
                  newJsonData.push(element)
                }else{
                  newJsonData.push(element)
                }
          })
        localStorage.setItem('jsonData',JSON.stringify(newJsonData))
       
  }
}
