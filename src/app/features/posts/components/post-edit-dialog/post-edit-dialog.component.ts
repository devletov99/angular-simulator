import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-post-edit-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './post-edit-dialog.component.html',
  styleUrl: './post-edit-dialog.component.scss',
  providers: [DialogService],
})
export class PostEditDialogComponent implements OnInit {
  
  dynamicDialogRef: DynamicDialogRef = inject(DynamicDialogRef);
  dialogConfig: DynamicDialogConfig = inject(DynamicDialogConfig);
  fb: FormBuilder = inject(FormBuilder);

  formEdit = this.fb.nonNullable.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
    tags: ['', Validators.required],
  });

  ngOnInit(): void {
    this.formEdit.patchValue(this.dialogConfig.data.post);
  }

  save(): void {
    this.dynamicDialogRef.close(this.formEdit.getRawValue());
  }

}
 