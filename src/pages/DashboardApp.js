// material
import { Container } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useCallback } from 'react';
import Masonry from 'react-masonry-css';
// components
import Page from '../components/Page';
import { NewsItem } from '../components/_dashboard/app';
import { getNewsDataAsync, setPageNumber } from '../features/slice/appSlice';

const breakpointColumnsObj = {
  default: 4,
  1536: 4,
  1200: 3,
  900: 2,
  600: 1
};
export default function DashboardApp() {
  const NEWS = useSelector((state) => state.appdata.news);
  const pageNumber = useSelector((state) => state.appdata.pageno);
  const totalArticles = useSelector((state) => state.appdata.totalArticles);
  const error = useSelector((state) => state.appdata.error);
  const status = useSelector((state) => state.appdata.status);

  const dispatch = useDispatch();

  useEffect(() => {
    if (NEWS && NEWS.length === 0) {
      dispatch(setPageNumber({ pageno: 1 }));
      dispatch(getNewsDataAsync());
    }
  }, []);

  useEffect(() => {
    if (pageNumber > 1) {
      dispatch(getNewsDataAsync());
    }
  }, [pageNumber]);

  const observer = useRef();

  const lastBookElementRef = useCallback(
    (node) => {
      if (status === 'loading') return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && totalArticles > NEWS?.length) {
          dispatch(setPageNumber({ pageno: pageNumber + 1 }));
        }
      });
      if (node) observer.current.observe(node);
    },
    [status, totalArticles > NEWS?.length]
  );

  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {/* {NEWS.map((news) => (
            <div key={news.title}>
              <NewsItem news={news} />
            </div>
          ))} */}
          {NEWS?.length > 0
            ? NEWS.map((news, index) => {
                if (NEWS.length === index + 1) {
                  return (
                    <div ref={lastBookElementRef} key={news.title}>
                      <NewsItem news={news} />
                    </div>
                  );
                }
                return (
                  <div key={news.title}>
                    <NewsItem news={news} />
                  </div>
                );
              })
            : null}
        </Masonry>
        <div>
          {status === 'loading' && <Skeleton variant="rectangular" width={210} height={118} />}
        </div>
        <div>{error && 'Error'}</div>
      </Container>
    </Page>
  );
}
