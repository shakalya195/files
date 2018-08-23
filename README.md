# files
fileuploader

USING FOR SINGLE IMAGE UPLOAD

this.file1 = new fileuploader(true,this.us);

Change event goes to onSelectFile
this.file1.onSelectFile($event);

This will create
file1.image = (image in Base64);
file1.file = (file);

Once you call the Upload:Promise it will replace file1.image from base64 to uploaded URL.
So there will be no chnages while while displaying the image at HTML.

this.file1.upload().then(r=>{
  /* operation after upload finished */
});




USING FOR MULTIPLE FILES

this.file2 = new fileuploader(false,this.us);

this will creates a array of files
file2[0].image = (image in Base64);
file2[0].file = (file);
file2[1].image = (image in Base64);
file2[1].file = (file);
    
