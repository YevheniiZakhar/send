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
  import { GoogleLogin } from '@react-oauth/google';
  import { useTheme } from '@mui/material/styles';
  import useMediaQuery from '@mui/material/useMediaQuery';
  import LogInYourAccount from '../components/LogInYourAccount'
  const registerSchema = object({
      name: string({
        required_error: "Заповніть назву",
      })
      .min(20, 'Потрібно ввести не менше ніж 16 символів')
      .nonempty(),
      description: string({
        required_error: "Заповніть опис",
      })
      .min(80, 'Потрібно ввести не менше ніж 80 символів')
      .nonempty(),
      email: string(),
      // //.max(32, 'Name must be less than 100 characters'),
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
      }),
  });
  
  //type RegisterInput = TypeOf<typeof registerschema>;
  
  const AddOrUpdateAd = ({ defaultValue }) => {
  const theme = useTheme();
  const matchesSize = useMediaQuery(theme.breakpoints.up('864'));
    const files = defaultValue ? [defaultValue.file1,defaultValue.file2,defaultValue.file3,defaultValue.file4,defaultValue.file5,defaultValue.file6,defaultValue.file7,defaultValue.file8] : false;
    const [fileList, setFileList] = useState();
    const [categoryOptions, setCategoryOptions] = useState();

    useEffect(() => {
      axios.get(process.env.REACT_APP_SERVER_URL+'ad/data')
      .then(resp => {
        //console.log(resp);
        const categories = resp.data.category.map((c) => ({id: c.id, name: c.name}));
        setCategoryOptions(categories);
      })
      .catch((error) => {
        //console.log(error)
      });
    }, []);
    
    const login = async (token) => {
      axios.get(process.env.REACT_APP_SERVER_URL + `user/google?token=${token}`,)
      .then(result => {
        localStorage.setItem("email", result.data.email);
        localStorage.setItem("name", result.data.name);
        setEmail(result.data.email);
        setValue('email', result.data.email);
      })
      .catch((error) => {
        console.log(error);
      });
    }

    const [loading, setLoading] = useState(false);

    const methods = useForm({ // <registerinput>
      defaultValues: defaultValue,
      resolver: zodResolver(registerSchema),
    });
  
    const {
      setValue,
      reset,
      handleSubmit,
      register,
      formState: { isSubmitSuccessful, errors, isValid },
    } = methods;

    const [email, setEmail] = useState(() => {
      const initialValue = localStorage.getItem("email");
      setValue('email', initialValue);
      return initialValue || "";
    });
    // useEffect(() => {
    //   if (isSubmitSuccessful) {
    //     reset();
    //   }
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [isSubmitSuccessful]);
  
    const onSubmitHandler = (values) => { //: SubmitHandler<registerinput>
      const formData = new FormData();
      //console.log(fileList[0]);
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("userName", values.userName);
      formData.append("userEmail", values.email);
        //formData.append('str', JSON.stringify(fileList));
      if (fileList) {
        fileList.forEach(item =>
          {
            formData.append('file', item);
          });
      }
      //  formData.append("frontFiles[1]", fileList[1]);
      //  formData.append("frontFiles[2]", fileList[2]);
      //  formData.append("frontFiles[3]", fileList[3]);
      //  formData.append("frontFiles[4]", fileList[4]);
      //  formData.append("frontFiles[5]", fileList[5]);
      //  formData.append("frontFiles[6]", fileList[6]);
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
        })
        .catch((error) => {
        // TODO HANDLE DIFFERENT SCENARIOUS (201, 500, and display appropriate message on UI)
         console.log(error)
        });
    };

    // TODO: navigation buttons, footer, header, natofication on important action
    // TODO: email send message to known users
    //console.log(errors);
    
    // const  validatePhone = (str) => {
    //   if (phone === undefined) {
    //     return true;
    //   }
    //   if (str.length !== 12 && phone !== undefined) {
    //     return 'Некоректно введений номер (приклад: +380984455666)';
    //   }
    //   return true;
    // }
    // TODO add alert if want to close/cancel
    // TODO if add ad without photo display popup friendly info message smth like "You didn't add any photo. Do you want to publish your ad wothout photo?"

    useEffect(
      () => {
        
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
  
        // this will clear Timeout
        // when component unmount like in willComponentUnmount
        // and show will not change to true
        return () => {
          clearTimeout(timer1);
        };
      }, []);
      const callback = (name, email) => {
        setValue('email', email);
        setEmail(email);
      }
    return (
      <Container>
              {email ? <Container><Typography variant='h4' component='h1' sx={{ mb: '2rem', textAlign: 'center' }}>
            {defaultValue ? 'Оновити оголошення' : 'Створити оголошення'}
          </Typography>
          <FormProvider {...methods}>
            <Box
              component='form'
              noValidate
              //autoComplete='off'
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
                {/* <PhoneInput
                    dropdownStyle={{height:'100px', maxWidth: '100%'}}
                    country={'ua'}
                    onlyCountries={['ua']}
                    value={phone}
                    onChange={i => {
                        setPhone(i);
                    }}
                    isValid={validatePhone}
                /> */}
                
              </Container>
              <CardWrapper title="Фото">
              <UploadFiles onFilesChange={(files) => setFileList(files)} defaulFiles={files}/>
              </CardWrapper>
              {/* <FormGroup>
                <FormControlLabel
                  control={<Checkbox required />}
                  {...register('terms')}
                  label={
                    <Typography color={errors['terms'] ? 'error' : 'inherit'}>
                      Accept Terms and Conditions
                    </Typography>
                  }
                />
                <FormHelperText error={!!errors['terms']}>
                  {errors['terms'] ? errors['terms'].message : ''}
                </FormHelperText>
              </FormGroup> */}
              <Container maxWidth="sm">
                <Button
                  variant='contained'
                  fullWidth
                  type='submit'
                  //loading={loading}
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