import { PipeTransform, Pipe } from '@angular/core';

import { ApiStateResult, ApiState } from '../api-state.models';

@Pipe({ name: 'isLoaded' })
export class IsLoadedPipe implements PipeTransform {
  transform(apiStateResult: ApiStateResult) {
    if (apiStateResult === ApiState.LOADED) {
      return true;
    } else {
      return false;
    }
  }
}
