import { PipeTransform, Pipe } from '@angular/core';

import { ApiStateResult, ApiStateError } from '../api-state.models';

@Pipe({ name: 'isError' })
export class IsErrorPipe implements PipeTransform {
  transform(apiStateResult: ApiStateResult) {
    if (apiStateResult instanceof ApiStateError) {
      return true;
    } else {
      return false;
    }
  }
}
