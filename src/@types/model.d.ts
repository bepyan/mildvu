import { Content, Linker, Magazine, User } from '@prisma/client';

declare module '@types' {
  interface MagazineWithAuthor extends Magazine {
    user: User;
  }

  interface MagazineWithContent extends Magazine {
    contents: ContentWithLinker[];
  }

  interface ContentWithLinker extends Content {
    linkers: Linker[];
  }
}
