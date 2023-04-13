import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import {
  Typography,
} from '@mui/material';

const CardWrapper = (props) => { //: FC<iforminputprops>
  return (
    <Card variant="outlined" sx={{ mb: "1rem" }}>
      <CardContent>
        <Typography variant='overline' gutterBottom  sx={{ mb: "2rem", textAlign: 'center' }}>
          {props.title}
        </Typography>
        {props.children}
      </CardContent>
    </Card>
      
  );
};

export default CardWrapper;