import { Content, Linker, Magazine } from '@prisma/client';

declare module '@types' {
  interface MagazineWithContent extends Magazine {
    content: ContentWithLinker[];
  }

  interface ContentWithLinker extends Content {
    linkers: Linker[];
  }
}
