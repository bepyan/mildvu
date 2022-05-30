import { Button, Content, Magazine } from '@prisma/client';

declare module '@types' {
  interface MagazineWithContent extends Magazine {
    content: ContentWithButton[];
  }

  interface ContentWithButton extends Content {
    buttons: Button[];
  }
}
