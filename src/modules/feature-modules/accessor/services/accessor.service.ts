import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { CoreService } from '@app/base';

import { UrlModel } from '@modules/core';

@Injectable()
export class AccessorService extends CoreService {

  constructor() { super(); }

}
