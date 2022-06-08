import { Content, Linker, Magazine } from '@prisma/client';

declare module '@types' {
  interface MagazineWithContent extends Magazine {
    contents: ContentWithLinker[];
  }

  interface ContentWithLinker extends Content {
    linkers: Linker[];
  }
}
