import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CoreComponent, FormControl, FormGroup } from '@app/base';
import { CustomValidators } from '@app/base/forms';
import { AlertType } from '@app/base/models';


@Component({
  selector: 'shared-pages-innovation-comments-comments-edit',
  templateUrl: './comments-edit.component.html'
})
export class PageInnovationCommentsEditComponent extends CoreComponent {

  module: '' | 'innovator' | 'accessor' = '';
  innovationId: string;
  commentId: string;

  alert: AlertType = { type: null };

  form = new FormGroup({
    comment: new FormControl('', CustomValidators.required('A comment is required'))
  });


  constructor(
    private activatedRoute: ActivatedRoute
  ) {

    super();
    this.setPageTitle('Edit comment');

    this.module = this.activatedRoute.snapshot.data.module;
    this.innovationId = this.activatedRoute.snapshot.params.innovationId;
    this.commentId = this.activatedRoute.snapshot.params.commentId;
  }


  onSubmit(): void {

    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const body = { comment: this.form.get('comment')?.value };

    this.stores.innovation.createInnovationComment$(this.module, this.innovationId, body).subscribe(
      () => {
        this.redirectTo(`/${this.module}/innovations/${this.innovationId}/comments`, { alert: 'commentEditSuccess' });
      },
      () => {

        this.logger.error('Error fetching data');

        this.alert = {
          type: 'ERROR',
          title: 'An error occurred when creating an action',
          message: 'Please try again or contact us for further help',
          setFocus: true
        };

      });

  }

}
