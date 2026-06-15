import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

  editForm: FormGroup = this.fb.nonNullable.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
    tags: ['', Validators.required],
  });

  ngOnInit(): void {
    this.editForm.patchValue(this.dialogConfig.data.post);
  }

  save(): void {
    this.dynamicDialogRef.close(this.editForm.getRawValue());
  }

  close(): void {
    this.dynamicDialogRef.close()
  }


}
 