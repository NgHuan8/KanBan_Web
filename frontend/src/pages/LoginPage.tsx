import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { AuthFormField } from '../features/auth/components/AuthFormField'
import { AuthPageLayout } from '../features/auth/components/AuthPageLayout'
import styles from '../features/auth/styles/AuthForm.module.css'

type LoginFormValues = {
  email: string
  password: string
}

type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateLogin(values: LoginFormValues): LoginFormErrors {
  const errors: LoginFormErrors = {}
  const email = values.email.trim()

  if (!email) {
    errors.email = 'Please enter your email address.'
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!values.password) {
    errors.password = 'Please enter your password.'
  }

  return errors
}

export function LoginPage() {
  const [values, setValues] = useState<LoginFormValues>({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<LoginFormErrors>({})

  function updateField(field: keyof LoginFormValues, value: string) {
    const nextValues = { ...values, [field]: value }
    setValues(nextValues)

    if (errors[field]) {
      const nextError = validateLogin(nextValues)[field]
      setErrors((currentErrors) => ({
        ...currentErrors,
        [field]: nextError,
      }))
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrors(validateLogin(values))
  }

  return (
    <AuthPageLayout
      description="Sign in to continue collaborating with your team."
      title="Welcome back"
      titleId="login-title"
    >
      <form className={styles.form} noValidate onSubmit={handleSubmit}>
        <AuthFormField
          autoComplete="email"
          error={errors.email}
          id="login-email"
          label="Email"
          onChange={(value) => updateField('email', value)}
          type="email"
          value={values.email}
        />
        <AuthFormField
          autoComplete="current-password"
          error={errors.password}
          id="login-password"
          label="Password"
          onChange={(value) => updateField('password', value)}
          type="password"
          value={values.password}
        />
        <button className={styles.submitButton} type="submit">
          Login
        </button>
      </form>

      <p className={styles.switchText}>
        Don&apos;t have an account?{' '}
        <Link className={styles.switchLink} to="/register">
          Create one
        </Link>
      </p>
    </AuthPageLayout>
  )
}
