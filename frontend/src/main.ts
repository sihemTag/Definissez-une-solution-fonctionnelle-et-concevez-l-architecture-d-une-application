import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ChatComponent } from './app/chat/chat/chat.component';

bootstrapApplication(ChatComponent)
  .catch((err) => console.error(err));
