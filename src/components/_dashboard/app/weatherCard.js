import PropTypes from 'prop-types';
import { useState } from 'react';

// material
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';

weatherCard.propTypes = {
  location: PropTypes.object.isRequired,
  temperature: PropTypes.object.isRequired,
  weatherDescription: PropTypes.object.isRequired
};

export default function weatherCard({ location, temperature, weatherDescription }) {
  console.log('------in weatherDescription', location, temperature, weatherDescription);
  return (
    <Card sx={{ minWidth: 250 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {temperature}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {weatherDescription}
        </Typography>
      </CardContent>
    </Card>
  );
}
