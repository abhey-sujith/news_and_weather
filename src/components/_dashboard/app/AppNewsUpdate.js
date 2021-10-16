import PropTypes from 'prop-types';
import { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
// material
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  IconButton
} from '@mui/material';

NewsItem.propTypes = {
  news: PropTypes.object.isRequired
};

export default function NewsItem({ news }) {
  const { image, title, description, publishedAt } = news;
  const [Error, setError] = useState(false);
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
      <CardActions sx={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
        <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
          {publishedAt.substring(0, 10)}
        </Typography>
      </CardActions>
    </Card>
  );
}
