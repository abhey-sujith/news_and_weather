import PropTypes from 'prop-types';
import { useState } from 'react';

// material
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';

NewsItem.propTypes = {
  news: PropTypes.object.isRequired
};

export default function NewsItem({ news }) {
  const { image, title, description, publishedAt } = news;
  console.log('------in appnewsupdate', news);
  const [Error, setError] = useState(false);
  console.log('---------error', Error);
  return (
    <Card sx={{ minWidth: 250 }}>
      {Error ? (
        <CardMedia
          component="img"
          height="140"
          image={`/static/mock-images/covers/cover_${Math.floor(Math.random() * 22)}.jpg`}
          alt={title}
        />
      ) : (
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={title}
          onError={() => {
            setError(true);
          }}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    // <Stack direction="row" alignItems="center" spacing={2}>
    //   <Box
    //     component="img"
    //     alt={title}
    //     src={image}
    //     sx={{ width: 48, height: 48, borderRadius: 1.5 }}
    //   />
    //   <Box sx={{ minWidth: 240 }}>
    //     <Link to="#" color="inherit" underline="hover" component={RouterLink}>
    //       <Typography variant="subtitle2" noWrap>
    //         {title}
    //       </Typography>
    //     </Link>
    //     <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
    //       {description}
    //     </Typography>
    //   </Box>
    //   <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
    //     {formatDistance(postedAt, new Date())}
    //   </Typography>
    // </Stack>
  );
}
