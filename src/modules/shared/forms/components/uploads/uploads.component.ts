/* istanbul ignore file */

import { Component, Input, Output, OnInit, ViewChild, ViewEncapsulation, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

import { UploadConfigurationModel } from './uploads.models';

import { catchError, map, take } from 'rxjs/operators';
import { of } from 'rxjs';

const generateRandom = () => `${+new Date()}${Math.floor((Math.random() * 1000) + 1)}`;

@Component({
  selector: 'theme-form-upload',
  templateUrl: 'uploads.component.html',
  styleUrls: ['./uploads.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None // WARNING: Styles applied here are global!
})

export class FormUploadComponent implements OnInit {
  @Input() config?: UploadConfigurationModel;
  @Output() addedFile = new EventEmitter<any>();
  @Output() removedFile = new EventEmitter<any>();
  @Output() uploadSuccess = new EventEmitter<any>();
  @Output() uploadError = new EventEmitter<any>();

  // @ViewChild(DropzoneDirective) directiveRef?: DropzoneDirective;

  // dzConfig: DropzoneConfigInterface;
  previewContainer = `preview-container-${generateRandom()}`;


  files: File[] = [];

  constructor(
    private http: HttpClient,
    private readonly cdr: ChangeDetectorRef,
    private readonly t: TranslateService
  ) {

    this.config = { url: '' };

    // this.dzConfig = {
    //   dictDefaultMessage: this.config.defaultMessage || this.t.instant('shared.uploads.placeholder_message'),
    //   dictRemoveFileConfirmation: this.config.removeFileConfirmationMessage || this.t.instant('shared.uploads.are_you_sure_delete_file'),
    //   url: this.config.url,
    //   headers: this.config.headers || (localStorage.getItem('token') ? { Authorization: `Bearer ${localStorage.getItem('token')}` } : {}),
    //   maxFilesize: this.config.maxFileSize,
    //   acceptedFiles: this.config.acceptedFiles,
    //   params: this.config.params,
    //   maxFiles: this.config.maxFiles,
    // };

  }


  onSelect(event: any): void {
    console.log(event);
    this.files.push(...event.addedFiles);

    console.log('novo file');
    this.readFile(this.files[0]).then(fileContents => {
      // Put this string in a request body to upload it to an API.

      console.log('1 contents', fileContents);

      // {id: '2653433E-F36B-1410-80E3-0032FE5B194B', url: 'https://nhsenhsaacb2cdev.blob.core.windows.net/fileupload/fileupload/2653433E-F36B-1410-80E3-003[…]ig=534D7gOe2tTjPohLLGB4A1z1tG75UeJSbT06ZmEd2nQ%3D'}
      // const url = new UrlModel(this.API_URL).addPath('organisations').setQueryParams({ type: 'accessor' });
      this.http.put<any>(
        'https://nhsenhsaacb2cdev.blob.core.windows.net/fileupload/fileupload/2653433E-F36B-1410-80E3-0032FE5B194B?sv=2020-06-12&spr=https%2Chttp&st=2021-05-04T14%3A11%3A59Z&se=2021-05-05T14%3A11%3A59Z&sr=b&sp=cw&sig=534D7gOe2tTjPohLLGB4A1z1tG75UeJSbT06ZmEd2nQ%3D',
        fileContents
      ).pipe(
        take(1),
        map(response => {
          console.log('resposta upload', response);
        }),
        catchError((error) => {
          console.log('upload error', error);
          return of(false);
        })
      ).subscribe();

      // console.log(fileContents);
    });

  }

  onRemove(event: any): void {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }


  private async readFile(file: File): Promise<string | ArrayBuffer> {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = e => {
        return resolve(e.target?.result as string);
      };

      reader.onerror = e => {
        console.error(`FileReader failed on file ${file.name}.`);
        return reject(null);
      };

      if (!file) {
        console.error('No file to read.');
        return reject(null);
      }

      reader.readAsDataURL(file);
    });
  }







  ngOnInit(): void {

    // const actionsHtmlArray = this.config?.uploadedFilesActions?.map(action =>
    //   `<a href="javascript:;" id="${action.id}" class="mr-2" title="${action.title}"><span class="${action.icon}"></i></a>`
    // ) || [];



    // setTimeout(() => {  // Await for component due initialization (controller + view).
    //   this.dzConfig.previewsContainer = `#${this.previewContainer}`;
    //   this.dzConfig.previewTemplate = `
    //   <div id="preview-template" class="dz-preview">
    //     <div class="dropzone-info">
    //       <div class="thumb-container">
    //         <img data-dz-thumbnail />
    //       </div>
    //       <div class="details h-100">
    //         <div class="d-flex">
    //           <div class="dz-success-mark"><span><i class="fas fa-check text-success"></i></span></div>
    //           <div class="dz-error-mark pl-2"><span><i class="fas fa-times text-danger"></i></span></div>
    //           <span data-dz-name class="pl-2"></i> <span class="pl-2" data-dz-size></span>
    //         </div>
    //         <div class="dz-error-message"><span data-dz-errormessage></span></div>
    //         <div class="actions h-100">
    //           ${actionsHtmlArray.join('')}
    //           <a href="javascript:;" title="${upperFirst(this.t.instant('dictionary.remove'))}" data-dz-remove><i class="fas fa-trash"></i></a>
    //         </div>
    //       </div>
    //     </div>
    //   </div>`;
    //   this.cdr.detectChanges();
    // });

  }


  // onFileAdded(file: any) {
  //   if (file.type.search('image/') === -1) {
  //     file.previewElement.classList.add(`type-loading`);
  //   }

  //   this.addedFile.emit({ type: UploadsEvents.FILE_ADDED, response: file });
  // }

  // onFileRemoved(file: any) {
  //   this.removedFile.emit({ type: UploadsEvents.FILE_REMOVED, response: file });
  // }


  // onUploadProgress(event: [any, number, number]) { // [File information, Progress (%), Progress (size)]
  //   // console.log('UploadProgress', event);
  // }

  // onUploadSuccess(event: [any, any, any]) { // [File information, XHR Response, ProgressEvent]

  //   const file = event[0];
  //   const response = event[1];

  //   this.addFileIconClass(file);

  //   this.config?.uploadedFilesActions?.forEach(action => {
  //     const e = file.previewElement.querySelector(`#${action.id}`);
  //     e.addEventListener('click', () => action.cb(file));
  //   });

  //   this.uploadSuccess.emit({ type: UploadsEvents.FILE_UPLOAD_SUCCESS, response });
  //   this.cdr.detectChanges();
  // }

  // onUploadError(event: [any, any, any]) {
  //   const file = event[0];
  //   const response = event[1];
  //   file.previewElement.classList.remove(`type-loading`);
  //   file.previewElement.classList.add(`type-error`);
  //   file.previewElement.querySelector('.dz-error-message').textContent = response.resultMessage || response;

  //   this.uploadError.emit({ type: UploadsEvents.FILE_UPLOAD_ERROR, response });
  //   this.cdr.detectChanges();
  // }

  // addFileIconClass(file: any) {
  //   file.previewElement.classList.remove(`type-loading`);
  //   const fileSplit = file.name.split('.');
  //   let fileExt = fileSplit[fileSplit.length - 1];
  //   if (this.config?.acceptedFiles?.search(fileExt) === -1) {
  //     fileExt = 'none';
  //   }
  //   file.previewElement.classList.add(`type-${fileExt}`);
  // }

}
