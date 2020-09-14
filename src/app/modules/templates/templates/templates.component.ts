import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

declare const $: any;
declare const CKEDITOR: any;
declare const window: any;
@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
})
export class TemplatesComponent implements OnInit, AfterViewInit {

  templateName = '';
  customTemplateList = [];
  closeResult: string;

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
    this.customTemplateList.push({ name: 'Template 1' });
    this.customTemplateList.push({ name: 'Template 2' });
    this.customTemplateList.push({ name: 'Template 2' });
    this.customTemplateList.push({ name: 'Template 2' });
    this.customTemplateList.push({ name: 'Template 2' });
  }

  ngAfterViewInit() {
    CKEDITOR.config.allowedContent = true;
    CKEDITOR.config.disableAutoInline = true;
    CKEDITOR.config.extraAllowedContent = 'span{width,height}; *{*}; span[data-*]; p[data-*]; br';
    CKEDITOR.config.autoUpdateElement = false;
    console.log('CKEDITOR', CKEDITOR);
    this.onDropFunction();
  }

  saveTemplate() {
    this.customTemplateList.push({ name: this.templateName });
    this.templateName = '';
  }

  openModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onChange(ev) {
    console.log('on change', ev);
  }

  onFileUploadRequest(ev) {
    console.log('on onFileUploadRequest', ev);
  }

  onContentDom(ev) {
    console.log('on onContentDom', ev);
  }

  onBlur(ev) {
    console.log('on onBlur', ev);
  }

  onFocus(ev) {
    console.log('on onFocus', ev);
  }

  onReady(ev) {
    console.log('on onReady', ev);
  }

  onEditorChange(ev) {
    console.log('on onEditorChange', ev);
  }

  onDropFunction() {

    CKEDITOR.plugins.add('hcard', {
      requires: 'widget',

      init: function (editor) {
        editor.widgets.add('hcard', {
          allowedContent: 'span(!h-card); a[href](!u-email,!p-name); span(!p-tel)',
          requiredContent: 'span(h-card)',
          pathName: 'hcard',

          upcast: function (el) {
            return el.name === 'span' && el.hasClass('h-card');
          }
        });

        // This feature does not have a button, so it needs to be registered manually.
        editor.addFeature(editor.widgets.registered.hcard);


        // we are getting instance name here because on route change new instance is created
        // Abdullah
        const instanceName = Object.getOwnPropertyNames(CKEDITOR.instances);
        CKEDITOR.instances[instanceName[0]].on('drop', function (evt) {
          const dataTransfer = evt.data.dataTransfer;

          const $comp = this;

          const internalDNDType = 'text/html';
          editor.on('paste', function (evt: any) {
            console.log('editor paste ', editor, evt);
            if (evt.data.method === 'drop') {

              const draggedHTML = evt.data.dataTransfer.getData(internalDNDType);
              const a: any | null = document.createElement('div');


              a.innerHTML = draggedHTML;
              a.setAttribute('id', 'attributevalue');
              if (a.childNodes.length < 1) {
                return;
              }

              const ele = a.childNodes[0].childNodes[0];
              let masterID = '';
              if (a.childNodes[0].children && a.childNodes[0].children.length > 1) {
                masterID = a.childNodes[0].children[1].defaultValue;
              }

              let dataPropertyName;
              if (ele && ele.getAttribute) {
                dataPropertyName = ele.getAttribute('data-propertyname');
              }
              console.log('ele', ele);

              if (dataPropertyName) {
                const fieldName = $(draggedHTML).text();
                const propertyName = $(draggedHTML).find('propertyname');
                const isList = dataPropertyName.includes('list');

                const isMasterTemp = dataPropertyName.includes('Master');


                let updatedHTML;
                if (isList) {
                  let objectWithoutList = dataPropertyName.replace('.list', '');
                  objectWithoutList = objectWithoutList.replace('{ {', '');
                  objectWithoutList = objectWithoutList.replace('} }', '');
                  updatedHTML = '<div> <span class="h-card hello" style="background: white;padding: 3px 6px;border: 1px grey">  {{#each ' + objectWithoutList + ' }} </span>' + ' <br /> <span class="h-card hello" style="background: #FFFDE3;padding: 3px 6px;border-bottom: 1px dashed #ccc;">  {{/each}}  </span>  </div>';
                } else {
                  if (isMasterTemp && masterID) {
                    updatedHTML = '<span class="h-card hello" style="background: white;padding: 3px 6px;"> {{' + fieldName.trim() + '}}' + ` <input type="hidden"  data-master="{{#Master ` + `'` + masterID + `'}}"></span>`;
                  } else {
                    let objectWithoutSpace = dataPropertyName.replace('{ {', '{{');
                    objectWithoutSpace = objectWithoutSpace.replace('} }', '}}');
                    objectWithoutSpace = objectWithoutSpace.replace(/\s+/g, '');
                    objectWithoutSpace = '<b> ' + objectWithoutSpace.trim() + '</b>';
                    updatedHTML = '<span class="h-card hello" style="background: white;padding: 3px 6px;border: 1px solid grey"> ' + objectWithoutSpace.trim() + '</span>';
                  }
                }
                evt.data.dataValue = updatedHTML;
              }
            }
          });

        });
      }
    });
    CKEDITOR.config.extraPlugins = 'hcard';
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
