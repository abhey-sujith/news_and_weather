// material
import faker from 'faker';
import Masonry from 'react-masonry-css';
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import { mockImgCover } from '../utils/mockImages';
import { NewsItem } from '../components/_dashboard/app';
// ----------------------------------------------------------------------

const NEWS = [...Array(50)].map((_, index) => {
  const setIndex = index + 1;
  return {
    title: faker.name.title(),
    description: faker.lorem.paragraphs(),
    image: mockImgCover(setIndex),
    postedAt: faker.date.soon(),
    index
  };
});

const breakpointColumnsObj = {
  default: 4,
  1536: 4,
  1200: 3,
  900: 2,
  600: 1
};
export default function DashboardApp() {
  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {NEWS.map((news) => (
            <div key={news.index}>
              <NewsItem news={news} />
            </div>
          ))}
        </Masonry>
      </Container>
    </Page>
  );
}
