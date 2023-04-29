import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

const schemaParam = {
  email: Yup.string()
    .required('No email provided')
    .email('Incorrect email')
    .matches(
      /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Incorrect email'
    ),
  password: Yup.string().required('No password provided'),
  confirmPwd: Yup.string().oneOf([Yup.ref('password')], 'Passwords does not match'),
  name: Yup.string()
    .required('Enter your name')
    .min(3, 'At least 3 characters')
    .max(22, 'Maximum number of characters 22'),
}

export const formHandler = (...keys: string[]) => {
  const param: any = {}
  const schemaParamEntries = Object.entries(schemaParam)

  keys.forEach(k => schemaParamEntries.forEach(el => (el.includes(k) ? (param[k] = el[1]) : null)))

  const formSchema = Yup.object().shape(param)
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(formSchema), mode: 'onTouched' })

  const errorEmail = errors.email ? String(errors.email.message) : undefined
  const errorPassword = errors.password ? String(errors.password.message) : undefined
  const errorConfirmPwd = errors.confirmPwd ? String(errors.confirmPwd.message) : undefined

  const errorName = errors.name ? String(errors.name.message) : undefined

  return {
    register,
    handleSubmit,
    reset,
    isValid,
    errorEmail,
    errorPassword,
    errorConfirmPwd,
    errorName,
  }
}
