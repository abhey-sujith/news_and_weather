import PropTypes from 'prop-types';

// material
import { Card, CardContent, Typography } from '@mui/material';

weatherCard.propTypes = {
  location: PropTypes.object.isRequired,
  temperature: PropTypes.object.isRequired,
  weatherDescription: PropTypes.object.isRequired
};

export default function weatherCard({ location, temperature, weatherDescription }) {
  console.log('------in weatherDescription', location, temperature, weatherDescription);
  return (
    <Card
      sx={{
        minWidth: 250,
        backgroundColor: '#70c6f9'
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {(Number(temperature) - 273.15).toFixed(2)}
          {' °C'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {weatherDescription}
        </Typography>
      </CardContent>
    </Card>
  );
}
