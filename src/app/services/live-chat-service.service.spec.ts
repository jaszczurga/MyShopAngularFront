import { TestBed } from '@angular/core/testing';

import { LiveChatServiceService } from './live-chat-service.service';

describe('LiveChatServiceService', () => {
  let service: LiveChatServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveChatServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
