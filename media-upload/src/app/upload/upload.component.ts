import { Component, OnInit } from '@angular/core';
import { MediaService } from '../media.service';
import { FormControl } from '@angular/forms';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
	list = [];

	fileInput = new FormControl();

	selectedItem = null;
	selectedOld = null;

	file = null;

	fileLoad = false;

	fileSource = null;

	baseMediaSource

	getList(): void {
	  this.mediaService.getList()
      .subscribe(items => this.list = items);
	}

	changeSelection(item){
		let url = this.mediaService.getBaseUrl()+'storage/'+item;
		this.selectedItem = this.sanitizer.bypassSecurityTrustResourceUrl(url);
		this.selectedOld = url;
	}

	fileChange(event){
		console.log(this.file);
		const reader = new FileReader();
		if(event.target.files && event.target.files.length){
			const [file] = event.target.files;
			this.file = file;

			if(file.name.toUpperCase().endsWith('.PNG')||file.name.toUpperCase().endsWith('.JPG')){
				reader.readAsDataURL(file);
				reader.onload = () =>{
					this.fileSource = reader.result as string;
				}
			}else{
				let url = URL.createObjectURL(file);
				this.fileSource = this.sanitizer.bypassSecurityTrustResourceUrl(url);
				console.log(this.fileSource);
			}
		}
		// console.log(this.fileSource);
	}

	upload(): void{
		console.log("uploading");
		let form = new FormData();
		form.append('file', this.file);
		this.mediaService.upload(form).subscribe(res => {
			console.log(res)
			if(res.status == 'success' && this.list.findIndex(x => x == res.data) == -1){
				this.list.push(res.data)
			}
			this.fileInput.setValue('');
			this.file = null;
		})
	}

  constructor(private mediaService: MediaService, protected sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  	this.getList();
  }
}
