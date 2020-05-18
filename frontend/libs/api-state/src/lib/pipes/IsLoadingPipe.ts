import { PipeTransform, Pipe } from '@angular/core';

import { ApiStateResult, ApiState } from '../api-state.models';

@Pipe({ name: 'isLoading' })
export class IsLoadingPipe implements PipeTransform {
  transform(apiStateResult: ApiStateResult) {
    if (apiStateResult === ApiState.LOADING) {
      return true;
    } else {
      return false;
    }
  }
}
