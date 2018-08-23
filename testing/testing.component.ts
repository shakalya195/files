import { Component, OnInit, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
//import { FileUploaderService } from '../services/file-uploader.service';
import { fileuploader } from '../models/fileuploader';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {

  @ViewChild('openConfigPopup') openConfigPopup: ElementRef;
  @ViewChild('closeConfigPopup') closeConfigPopup: ElementRef;
  new_config:any;
  model:any={};
  new_config_booleon=true;


  url2:any;image1:any;
  file1:any;file2:any;file3:any;file4:any;

  configurations:any = [];

  constructor(
    private us:UserService
  ) {

    this.file1 = new fileuploader(true,this.us);
    this.file2 = new fileuploader(false,this.us);
    this.file3 = new fileuploader(true,this.us);
    this.file4 = new fileuploader(false,this.us);
  }

   ngOnInit() {

   }

   openConfigPopupFun(){
     this.openConfigPopup.nativeElement.click();
     this.new_config = {};
     this.new_config_booleon = true;
     this.file3 = new fileuploader(true,this.us);
     this.file4 = new fileuploader(false,this.us);
   }

   closeModal(){
     this.closeConfigPopup.nativeElement.click();
   }

   addNewConfig(){
      this.new_config.cover_image = this.file3.image;
      this.file4.upload().then(r=>{
       this.new_config.images = this.file4.files.map(op=>{ return op.image;});;
       this.configurations.push(this.new_config);
       this.closeConfigPopup.nativeElement.click();
       //this.new_config = {};
     }).catch(error=>{
       console.log(error);
     });

     //this.file4.upload();

   }

   saveFileUploader(file){
     console.log(file);
   }
}
