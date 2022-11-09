import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevicesComponent } from './devices/devices.component';
import { MapviewComponent } from './mapview/mapview.component'

const routes: Routes = [
{
  
    path: '',
    component: MapviewComponent,
    },
{

    path: 'devices',
    component: DevicesComponent,
    },
   

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
