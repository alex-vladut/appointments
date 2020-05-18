import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IsLoadingPipe } from './pipes/IsLoadingPipe';
import { IsLoadedPipe } from './pipes/IsLoadedPipe';
import { IsErrorPipe } from './pipes/IsErrorPipe';

const ALL_PIPES = [IsLoadingPipe, IsLoadedPipe, IsErrorPipe];

@NgModule({
  imports: [CommonModule],
  declarations: ALL_PIPES,
  exports: ALL_PIPES,
})
export class ApiStateModule {}
