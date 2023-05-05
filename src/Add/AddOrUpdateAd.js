import {
    Box,
    Container,
    Typography,
  } from '@mui/material';
import { useForm, FormProvider} from 'react-hook-form';
import { object, string, number } from 'zod'; 
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import FormInput from '../components/formInput';
import FormSelect from '../components/formSelect';
import axios from "axios";
import 'react-phone-input-2/lib/style.css';
import "./Add.css";
import FormLocality from '../components/formLocality';
import FormPhone from '../components/formPhone';
import UploadFiles from '../UploadFiles/UploadFiles';
import CardWrapper from '../components/cardWrapper';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import LogInYourAccount from '../components/LogInYourAccount';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

  const registerSchema = object({
      name: string({
        required_error: "Заповніть назву",
      })
      .min(16, 'Потрібно ввести не менше ніж 16 символів')
      .max(100, 'Потрібно ввести не більше ніж 100 символів')
      .nonempty(),
      description: string({
        required_error: "Заповніть опис",
      })
      .min(40, 'Потрібно ввести не менше ніж 40 символів')
      .max(400, 'Потрібно ввести не більше ніж 400 символів')
      .nonempty(),
      email: string(),  
      categoryId: 
        number({
          required_error: "Виберіть категорію",
        }),
      localityId: number({
        required_error: "Заповніть ваше місцезнаходження",
      }),
      phone: string({
        required_error: "Заповніть номер телефону",
      }).min(12, 'Некоректно введений номер. Приклад: +380984455666'),
      userName: string({
        required_error: "Заповніть ім’я",
      }),
      price: string({
        required_error: "Заповніть ціну",
      })
      .max(9, 'Потрібно ввести не більше ніж 9 символів'),
  });
  
  const AddOrUpdateAd = ({ defaultValue }) => {
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [error, setError] = useState(undefined);
    const theme = useTheme();
    const matchesSize = useMediaQuery(theme.breakpoints.up('864'));
    const files = defaultValue ? [defaultValue.file1,defaultValue.file2,defaultValue.file3,defaultValue.file4,defaultValue.file5,defaultValue.file6,defaultValue.file7,defaultValue.file8] : false;
    const [fileList, setFileList] = useState();
    const [categoryOptions, setCategoryOptions] = useState();
    const navigate = useNavigate();

    useEffect(() => {
      axios.get(process.env.REACT_APP_SERVER_URL+'ad/data')
      .then(resp => {
        const categories = resp.data.category.map((c) => ({id: c.id, name: c.name}));
        setCategoryOptions(categories);
      })
      .catch((error) => {
        console.log(error)
      });
    }, []);

    const methods = useForm({
      defaultValues: defaultValue,
      resolver: zodResolver(registerSchema),
    });
  
    const {
      setValue,
      getValues,
      handleSubmit,
      formState: { isSubmitSuccessful, errors, isValid },
    } = methods;

    const [email, setEmail] = useState(() => {
      const initialValue = localStorage.getItem("email");
      setValue('email', initialValue);
      return initialValue || "";
    });
  
    const onSubmitHandler = (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("userName", values.userName);
      formData.append("userEmail", values.email);
      if (fileList) {
        fileList.forEach(item =>
          {
            formData.append('file', item);
          });
      }
      formData.append("price", values.price);
      formData.append("categoryId", values.categoryId);
      formData.append("phone", values.phone);
      formData.append("localityId", values.localityId);

      let result;
      if (!defaultValue) {
        result = axios.post(process.env.REACT_APP_SERVER_URL+'ad', formData);
      } else {
        formData.append("id", defaultValue.id);
        result = axios.put(process.env.REACT_APP_SERVER_URL+'ad', formData);
      }
      result
       .then(resp => {
        console.log(resp);
          navigate("/added", { state: getValues("name") });
        })
        .catch((error) => {
          setIsErrorOpen(true);
          if (error && error.errors) {
            setError(error.errors);
          }
        // TODO HANDLE DIFFERENT SCENARIOUS (201, 500, and display appropriate message on UI)
         console.log(error)
        });
    };

    // TODO: navigation buttons, footer, header, natofication on important action
    // TODO: email send message to known users
    // TODO add alert if want to close/cancel
    // TODO if add ad without photo display popup friendly info message smth like "You didn't add any photo. Do you want to publish your ad wothout photo?"

    useEffect(() => {
      let timer1 = setTimeout(() => {
        const result = document.getElementsByTagName('iframe');
        if (result.length !== 0)
        {
          result[0].style.display = 'initial';
        }
        if (!matchesSize) {
          result[0].style.height = '46px';
          result[0].style.width = '300px';
        }
          
      }, 500);

      return () => {
        clearTimeout(timer1);
      };
    }, []);

    const callback = (name, email) => {
      setValue('email', email);
      setEmail(email);
    }

    const handleIsErrorClose = () => {
      setIsErrorOpen(false);
    }

    return (
      <Container>
        <Snackbar open={isErrorOpen} autoHideDuration={20000} onClose={handleIsErrorClose}>
          <Alert onClose={handleIsErrorClose} severity="error" sx={{ width: '100%' }}>
            Помилка при створенні оголошення.
            {error ? error : ''}
          </Alert>
        </Snackbar>
        {email ? 
          <Container>
            <Typography variant='h4' component='h1' sx={{ mb: '2rem', textAlign: 'center' }}>
              {defaultValue ? 'Оновити оголошення' : 'Створити оголошення'}
            </Typography>
          <FormProvider {...methods}>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit(onSubmitHandler)}
            >
              <Container maxWidth="sm">
              <CardWrapper title="Інформація про оголошення">
                <FormInput
                  name='name'
                  required
                  fullWidth
                  label='Назва'
                  mt='1rem'
                />

                <FormInput
                  name='description'
                  required
                  fullWidth
                  multiline
                  rows={6}
                  label='Опис'
                />

                <FormInput
                  name='price'
                  required
                  fullWidth
                  label='Ціна (ГРН)'
                  type='number'
                />

                <FormSelect
                  options={categoryOptions}
                  name='categoryId'
                  label='Категорія'
                />

                </CardWrapper>
                 <CardWrapper title="Контактна інформація">
                 <FormInput
                  name='userName'
                  required
                  fullWidth
                  label='Ім’я'
                  mt='1rem'
                />
                 <FormInput
                  name='email'
                  required
                  fullWidth
                  disabled
                  label='Google пошта'
                />
                  <FormPhone />
                <FormLocality edit={defaultValue !== undefined}/>
                </CardWrapper>
              </Container>
              <CardWrapper title="Фото">
              <UploadFiles onFilesChange={(files) => setFileList(files)} defaulFiles={files}/>
              </CardWrapper>
              <Container maxWidth="sm">
                <Button
                  variant='contained'
                  fullWidth
                  type='submit'
                  sx={{ py: '0.8rem', mt: '1rem' }}
                  onClick={handleSubmit(onSubmitHandler)}
                >
                  {!defaultValue ? 'Опублікувати оголошення' : 'Змінити оголошення'}
                </Button> 
              </Container>
            </Box>
          </FormProvider></Container> 
          :  
          <LogInYourAccount callback={callback}/>
          }
          
      </Container>
    );
  };
  
  export default AddOrUpdateAd;