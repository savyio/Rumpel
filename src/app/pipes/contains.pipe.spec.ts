/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { ContainsPipe } from './contains.pipe';

describe('Pipe: Contains', () => {
  it('create an instance', () => {
    let pipe = new ContainsPipe();
    expect(pipe).toBeTruthy();
  });
});
