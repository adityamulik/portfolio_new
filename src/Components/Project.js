import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import './Project.css';

export default function Project({data}) {

  const [shadow, setShadow] = React.useState(1);

  const onMouseOver = () => setShadow(3);

  const onMouseOut = () => setShadow(1);

  return (
    <Card 
      className="card-project"
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      zDepth={shadow}
    >
      <CardActionArea>
        <CardMedia
          className="project-image"
          component="img"
          image={"images/" + data.image}
          alt={data.name}
        />
        <CardContent className='project-content'>
          <Typography gutterBottom variant="h5" component="div">
            {data.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.description}
          </Typography>
        </CardContent>
        <CardActions className='project-button'>
            <Button target="_blank" href={data.url}>View Project</Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}