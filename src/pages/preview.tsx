import Carousel from '@components/Carousel';
import Layout from '@components/Layout';
import { ContentWithButton } from '@types';

const mockContent: ContentWithButton[] = [
  {
    id: 0,
    index: 0,
    magazineId: 0,
    imageURL:
      'https://www.nemopan.com/files/attach/images/6294/386/211/014/a04168af65afb12afa1936a98d372e1d.jpeg',
    buttons: [],
  },
  {
    id: 1,
    index: 1,
    magazineId: 0,
    imageURL:
      'https://www.nemopan.com/files/attach/images/6294/386/211/014/542dea3664436d543c3f273cea26dbda.jpeg',
    buttons: [],
  },
  {
    id: 2,
    index: 2,
    magazineId: 0,
    imageURL:
      'https://www.nemopan.com/files/attach/images/6294/386/211/014/f2b6641879ea73de2fac8c957b624740.jpeg',
    buttons: [],
  },
];

export default () => {
  return (
    <Layout title="preview">
      <Carousel contentList={mockContent} />
    </Layout>
  );
};
