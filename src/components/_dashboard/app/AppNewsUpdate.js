import faker from 'faker';
import PropTypes from 'prop-types';
// material
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
// utils
import { mockImgCover } from '../../../utils/mockImages';

// ----------------------------------------------------------------------

const NEWS = [...Array(5)].map((_, index) => {
  const setIndex = index + 1;
  return {
    title: faker.name.title(),
    description: faker.lorem.paragraphs(),
    image: mockImgCover(setIndex),
    postedAt: faker.date.soon(),
    index
  };
});

// ----------------------------------------------------------------------

NewsItem.propTypes = {
  news: PropTypes.object.isRequired
};

export default function NewsItem({ news }) {
  const { image, title, description, postedAt, index } = news;

  return (
    <Card key={index} sx={{ minWidth: 250 }}>
      <CardMedia component="img" height="140" image={image} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description.slice(0, 400) + (description.length > 60 ? '...' : '')}
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
