import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Grid, IconButton, Typography } from '@mui/material';
import { PlayArrow, Pause, NavigateBefore, NavigateNext } from '@mui/icons-material';
import { grey } from '@mui/material/colors';

interface Image {
  id: number;
  url: string;
  details: string;
  header : string;
}

const images: Image[] = [
  {
    id: 1,
    url: 'https://cdn.pixabay.com/photo/2014/06/27/12/36/fish-378286_960_720.jpg',
    header: "UNDERWATER FISH",
    details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    id: 2,
    url: 'https://cdn.pixabay.com/photo/2013/02/01/18/14/url-77169_960_720.jpg',
    header: "BOATS",
    details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    id: 3,
    url: 'https://cdn.pixabay.com/photo/2016/03/08/20/03/flag-1244649_960_720.jpg',
    header: "FLOWERS",
    details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
];

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: number | undefined;

    if (isPlaying) {
      interval = window.setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
      }, 3000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    setIsPlaying(false);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    setIsPlaying(false);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(false);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2} style={{ minHeight: '100vh' }}>
      <Grid item xs={12} md={6}>
        <Card style={{ boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)', width: '100%', textAlign: 'center' }}>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={6}>
              <img
                src={images[currentIndex].url}
                alt={`Image ${currentIndex + 1}`}
                style={{ width: '100%', height: 'auto', borderRadius: '10%', padding: '10px' }}
              />
              <Grid item xs={12} md={6}>
                <Box display="flex" flexDirection="row" alignItems="center" marginTop={2}>
                  {images.map((image, index) => (
                    <IconButton key={image.id} onClick={() => handleThumbnailClick(index)}>
                      <img
                        src={image.url}
                        alt={`Thumbnail ${index + 1}`}
                        style={{
                          width: 80,
                          height: 80,
                          objectFit: 'cover',
                          borderRadius: '20%',
                          filter: index === currentIndex ? 'none' : `grayscale(${grey[500]})`,
                        }}
                      />
                    </IconButton>
                  ))}
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {images[currentIndex].header}
                </Typography>
                <Typography variant="body1">{images[currentIndex].details}</Typography>
              </CardContent>
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" marginTop={2}>
                <IconButton color="primary" onClick={handlePrevious}>
                  <NavigateBefore />
                </IconButton>
                {isPlaying ? (
                  <IconButton color="primary" onClick={handlePause}>
                    <Pause />
                  </IconButton>
                ) : (
                  <IconButton color="primary" onClick={handlePlay}>
                    <PlayArrow />
                  </IconButton>
                )}
                <IconButton color="primary" onClick={handleNext}>
                  <NavigateNext />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default App;
