import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, throwError } from 'rxjs';
import { IProperty } from '../model/iproperty';
import { Property } from '../model/property';
import { IPropertyBase } from '../model/ipropertybase';
//import { IProperty } from '../property/IProperty.interface';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

constructor(private http: HttpClient) { }

getProperty(id:number){
  return this.getAllProperties().pipe(
    map(propertiesArray => {
      //throw new Error('Some error');
      return propertiesArray.find(p => p.Id === id);
    })
  );
}


 getAllProperties(SellRent?: number): Observable<Property[]>{
  return this.http.get('data/properties.json').pipe(
    map(data => {
      const propertiesArray: Array<Property>=[];
      const localProperties= JSON.parse(localStorage.getItem('newProp'));
      if(localProperties){
        for (const id in localProperties){
          if(SellRent){
          if(localProperties.hasOwnProperty(id) && localProperties[id].SellRent ===SellRent){
            propertiesArray.push(localProperties[id]);
          }
          }else{
            propertiesArray.push(localProperties[id]);
          }
        }
      }



      for (const id in data){
        if(SellRent){
        if(data.hasOwnProperty(id) && data[id].SellRent ===SellRent){
          propertiesArray.push(data[id]);
        }
      }else{
        propertiesArray.push(data[id]);
      }
    }
      return propertiesArray;
    })
  );
  return this.http.get<Property[]>('data/properties.json');
 }
 addProperty(property: Property) {
  let newProp = [property];

  // Add new property in array if newProp alreay exists in local storage
  if (localStorage.getItem('newProp')) {
    newProp = [property,
                ...JSON.parse(localStorage.getItem('newProp'))];
  }

  localStorage.setItem('newProp', JSON.stringify(newProp));
}

newPropID() {
  if (localStorage.getItem('PID')) {
    localStorage.setItem('PID', String(+localStorage.getItem('PID') + 1));
    return +localStorage.getItem('PID');
  } else {
    localStorage.setItem('PID', '101');
    return 101;
  }
}

}
