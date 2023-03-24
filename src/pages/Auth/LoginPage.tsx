// ** React Imports
import { ChangeEvent, MouseEvent, ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// ** MUI Components
import {Box}from "@mui/material";
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from '../../configs/themeConfig'

// ** Layout Import
import BlankLayout from '../../components/UI/@core/layouts/BlankLayout'

// ** Demo Imports
// import FooterIllustrationsV1 from '../../components/UI/FooterIllustrations/FooterIllustration'
import { RoutesEnum } from '../../constants/routes';

// ** Types
import { ILogin } from '../../types/IAuth';
import { useFetching } from '../../hooks/useFetching';
import { authService } from '../../services/auth.service';



interface State {
  email: string
  password: string
  remember_me: boolean
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginPage = () => {

  const [showPassword, setShowPassword] = useState(false)

  // ** State
  const [values, setValues] = useState<State>({
      email: '',
      password: '',
      remember_me: false
  })

  // ** Hook  
  const navigate = useNavigate()

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

    // 👇 Кастомный хук для отправки запроса на сервер
    const {fetching: login, errors, isLoading} = useFetching(async (user: ILogin) => {
      const response = await authService.login(user)
      localStorage.setItem('ACCESS_TOKEN', response?.data?.token);
      window.location.href = RoutesEnum.Home
      console.log(errors);
    });
      
    // 👇 Обработчик сабмита формы
    const handleLogin = () => {
        //  👇 Проверка на валидность формы
        login(values);
        console.log(errors)
        console.log(values);

      }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <CardContent sx={{ padding: theme => `${theme.spacing(5, 8, 7)} !important` }}>
        <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>

            {/* <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
             */}
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Добро пожаловать в {themeConfig.templateName}! 👋🏻
            </Typography>
            <Typography variant='body2'>
              Войдите в свой аккаунт чтобы продолжить работу
            </Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <TextField autoFocus fullWidth id='email' label='Эл.почта' sx={{ marginBottom: 4 }}
              value={values.email}
              onChange={handleChange('email')}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>
                Пароль
              </InputLabel>
              <OutlinedInput
                label='Password'
                value={values.password}
                id='auth-login-password'
                onChange={handleChange('password')}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <FormControlLabel control={<Checkbox />} label='
                Запомнить меня
              ' />
            </Box>
            <LoadingButton
              fullWidth
              size='large'
              type='submit'
              loading={isLoading}
              variant='contained'
              sx={{ marginBottom: 7 }}
              onClick={() => handleLogin()}
            >
              Вход
            </LoadingButton>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                Нет аккаунта?
              </Typography>
              <Typography variant='body2'>
                <Link to={RoutesEnum.Register} className={'link'}>
                    Зарегистрироваться
                </Link>
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
      {/* <FooterIllustrationsV1 /> */}
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginPage;