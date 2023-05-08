import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Added = () => {
    const { state } = useLocation();

    return (
        <Typography>Ваше оголошення <b>"{state && state.name}"</b> успішно {state && !state.edit ? "створено" : "змінено"} та додано на сайт. Перейдіть у профіль, щоб змінити чи видалити ваше оголошення.</Typography>
    );
}

export default Added;