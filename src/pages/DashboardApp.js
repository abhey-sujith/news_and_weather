import * as React from 'react';
// material
import { Container, Snackbar, Skeleton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useCallback } from 'react';
import Masonry from 'react-masonry-css';
import MuiAlert from '@mui/material/Alert';
import { useCurrentPosition } from 'react-use-geolocation';
// components
import Page from '../components/Page';
import { NewsItem, weatherCard } from '../components/_dashboard/app';
import {
  getNewsDataAsync,
  setPageNumber,
  resetVariables,
  getWeatherDataAsync,
  setLatLon
} from '../features/slice/appSlice';

const breakpointColumnsObj = {
  default: 4,
  1536: 4,
  1200: 3,
  900: 2,
  600: 1
};

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export default function DashboardApp() {
  const NEWS = useSelector((state) => state.appdata.news);
  const pageNumber = useSelector((state) => state.appdata.pageno);
  const totalArticles = useSelector((state) => state.appdata.totalArticles);
  const error = useSelector((state) => state.appdata.error);
  const status = useSelector((state) => state.appdata.status);
  const location = useSelector((state) => state.appdata.location);
  const temperature = useSelector((state) => state.appdata.temperature);
  const weatherDescription = useSelector((state) => state.appdata.weatherDescription);
  const [position, browserLatlonGetError] = useCurrentPosition();
  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetVariables());
    if (position) {
      dispatch(
        setLatLon({ latitude: position.coords.latitude, longitude: position.coords.longitude })
      );

      dispatch(getWeatherDataAsync());
    }
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

  useEffect(() => {
    if (position) {
      dispatch(
        setLatLon({ latitude: position.coords.latitude, longitude: position.coords.longitude })
      );
      dispatch(getWeatherDataAsync());
    }
  }, [position]);

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

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {location && temperature && weatherDescription
            ? weatherCard({ location, temperature, weatherDescription })
            : null}
          {NEWS?.length > 0
            ? NEWS.map((news, index) => {
                if (NEWS.length === index + 1) {
                  return (
                    <div ref={lastBookElementRef} key={news.index}>
                      <NewsItem news={news} />
                    </div>
                  );
                }
                return (
                  <div key={news.index}>
                    <NewsItem news={news} />
                  </div>
                );
              })
            : null}
          {status !== 'loading' && NEWS?.length === 0 ? (
            <Alert severity="info">
              No news available for this particular combination of request
            </Alert>
          ) : null}
          <div>
            {status === 'loading' && <Skeleton variant="rectangular" width={250} height={140} />}
          </div>
        </Masonry>
        <div>{error && <Alert severity="error">Could not fetch Data</Alert>}</div>
        <div>
          {browserLatlonGetError && (
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert severity="error" onClose={handleClose} sx={{ width: '100%' }}>
                {browserLatlonGetError.message}
              </Alert>
            </Snackbar>
          )}
        </div>
      </Container>
    </Page>
  );
}
