import {
    Container,
    Grid,
    Box,
    Typography,
    Stack,
    FormControlLabel,
    Checkbox,
  } from '@mui/material';
  
import LoadingButton from '@mui/lab/LoadingButton';
import { FC } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import FormInput from '../components/UI/Input/FormInput';
import { ILogin } from '../types/IAuth';
import { LinkItem } from '../components/UI/Elements/MainElements';
import { useFetching } from '../hooks/useFetching';
import { authService } from '../services/auth.service';
import { ErrorItem } from '../components/UI/Elements/MainElements';
import { RoutesEnum } from '../constants/routes';


// 👇 Компонент страницы входа в систему 
const LoginPage: FC = () => {
  
    // 👇 Кастомный хук для отправки запроса на сервер
    const {fetching: login, errors, isLoading} = useFetching(async (user: ILogin) => {
      const response = await authService.login(user)
      localStorage.setItem('ACCESS_TOKEN', response?.data?.token);
      window.location.href = RoutesEnum.Home
      console.log(errors);
    });
      
    // 👇 Обработчик сабмита формы
    const onSubmitHandler: SubmitHandler<ILogin> = (values: ILogin) => {
        // // 👇 Проверка на валидность формы
        login(values);

        console.log(values);

      }

    // 👇 Хук для работы с формой
  const methods = useForm<ILogin>({
      defaultValues: {
          email: '',
          password: '',
          remember_me: false,
      },
  });

  // 👇 Возвращаем разметку страницы
  return (
    <Container
        maxWidth={false}
        sx={{ height: '100vh', backgroundColor: { xs: '#fff', md: '#f4f4f4' } }}
      >
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          sx={{ width: '100%', height: '100%' }}
        >
          <Grid
            item
            sx={{ width: '100%', backgroundColor: '#fff', height: '100%' }}
          >
          <FormProvider {...methods}>
            <Grid
              container
              sx={{
                boxShadow: { sm: '0 0 5px #ddd' },
                py: '6rem',
                px: '1rem',
              }}
            >
              <Grid
                item
                container
                justifyContent='space-between'
                rowSpacing={5}
                sx={{
                  maxWidth: { lg: '75rem' },
                  marginInline: 'auto',
                }}
              >
                <Box
                  display='flex'
                  flexDirection='column'
                  component='form'
                  noValidate
                  autoComplete='off'
                  sx={{ margin: 'auto' }}
                  onSubmit={methods.handleSubmit(onSubmitHandler)}
                >


                    <Typography
                      variant='h6'
                      component='h1'
                      sx={{ textAlign: 'center', mb: '1.5rem' }}
                    >
                      Вход
                    </Typography>

                    <FormInput
                          label='Электронная почта'
                          type='email'
                          name='email'
                          focused
                          autoFocus
                          required
                          sx={{ height: '3.5rem' }} // set a fixed height for the input field
                        />

                      {errors &&
                          errors.email &&
                              <ErrorItem>  
                                  {errors.email}
                              </ErrorItem>
                      }

                    <FormInput
                      type='password'
                      label='Пароль'
                      name='password'
                      required
                      focused
                      sx={{ height: '3.5rem'}} // set a fixed height for the input field
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          size='small'
                          aria-label='trust this device checkbox'
                          required
                          {...methods.register('remember_me')}
                          sx={{
                            color: '#5e5b5d',
                            '&.Mui-checked': {
                              color: '#5e5b5d',
                            },
                          }}  
                        />
                      }
                      label={
                        <Typography
                          variant='body2'
                          sx={{
                            fontSize: '0.8rem',
                            fontWeight: 400,
                            color: '#5e5b5d',
                          }}
                        >
                          Запомнить меня
                        </Typography>
                      }
                    />

                    <LoadingButton
                      loading={isLoading}
                      type='submit'
                      variant='contained'
                      sx={{
                        py: '0.8rem',
                        mt: 2,
                        width: '80%',
                        marginInline: 'auto',
                      }}
                    >
                      Войти
                    </LoadingButton>
                  </Box>
              </Grid>
              <Grid container justifyContent='center'>
                <Stack sx={{ mt: '3rem', textAlign: 'center' }}>
                  <Typography sx={{ fontSize: '0.9rem', mb: '1rem' }}>
                      Нет аккаунта?{' '}
                    <LinkItem to={RoutesEnum.Register}>
                      Зарегистрируйтесь
                    </LinkItem>
                  </Typography>
                  <Typography sx={{ fontSize: '0.9rem' }}>
                      Забыли 
                    {' '}
                    <LinkItem to={'/login'}>пароль
                      ?</LinkItem>
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </FormProvider>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;  