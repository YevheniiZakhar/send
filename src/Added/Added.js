import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Added = () => {
    const { state } = useLocation();

    return (
        <Typography>Ваше оголошення "{state}" успішно створене та додане на сайт. Перейдіть у профіль, щоб змінити чи видалити ваше оголошення.</Typography>
    );
}

export default Added;