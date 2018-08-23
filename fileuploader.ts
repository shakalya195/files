
//import { UserService } from '../services/user.service';

export class fileuploader {

  http:any;env:any;us:any;

  single=true;
  file:any;
  image:any;
  files:any;

  constructor(single,us){
    this.us = us;
    this.single = single;
    if(this.single != true){
      this.files = [];
    }
  }

  onSelectFile(event, upload = false) {
     if (event.target.files && event.target.files[0]) {
       let total = event.target.files.length;
       for (let index = 0; index < event.target.files.length; index++) {
         const reader = new FileReader();
         reader.onload = (e: any) => {
           //console.log('single',this.single,' index',index);
           if(this.single == true){
             this.image = e.target.result;
             this.file = event.target.files[index];
           }else{
             let model:any = {};
             model.image = e.target.result;
             model.file = event.target.files[index];
             this.files.push(model);
             //console.log(this.files);
           }
           // if(upload == true && index== (total-1)){
           //   console.log('uploading');
           //   this.upload();
           // }
         };
         reader.readAsDataURL(event.target.files[index]);
       }

     }

   }

   getFile(){
     return this.file;
   }

   getFiles(){
     return this.files;
   }

   upload(): Promise<any>{
     //console.log(this.single);
     return new Promise((resolve, reject) => {
             if(this.single == false){
               let total = this.files.length;let i=1;
               for(let item of this.files){
                 //console.log(item);
                 const formData = new FormData();
                 formData.append('image', item.file);
                 //console.log(item);
                 this.us.postDataApi('/user/saveImage',formData).subscribe(res => {
                   //console.log(res);
                   delete item.file;
                   item.image = res['data'].image;
                   if(i == total){;resolve();}/* resolve on last loop */
                   i++;
                 },
                 error => {
                   if(i == total){ reject(error);}/* reject on last loop */
                   i++;
                 });

               }
             }
             if(this.single==true){
               const formData = new FormData();
               formData.append('image', this.file);
               //console.log(this.file);
               this.us.postDataApi('/user/saveImage',formData).subscribe(res => {
                 //console.log(res);
                 this.file = '';
                 this.image = res['data'].image;
                 resolve();
               },
               error => {
                 //console.log('error');
                 reject(error);
               });
             }
      });
   }

   remove(index){
     this.files.splice(index,1);
   }

}
