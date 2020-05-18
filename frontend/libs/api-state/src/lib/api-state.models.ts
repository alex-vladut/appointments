export enum ApiState {
  INIT = 'INIT',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  ERROR = 'ERROR',
}

export class ApiStateError {
  state: ApiState;

  constructor(public readonly error?: string) {
    this.state = ApiState.ERROR;
  }
}

export type ApiStateResult = ApiState | ApiStateError;
