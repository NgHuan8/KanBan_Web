import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { AuthFormField } from '../features/auth/components/AuthFormField'
import { AuthPageLayout } from '../features/auth/components/AuthPageLayout'
import styles from '../features/auth/styles/AuthForm.module.css'

type RegisterFormValues = {
  fullName: string
  email: string
  password: string
  confirmPassword: string
}

type RegisterFormErrors = Partial<Record<keyof RegisterFormValues, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateRegister(values: RegisterFormValues): RegisterFormErrors {
  const errors: RegisterFormErrors = {}
  const email = values.email.trim()

  if (!values.fullName.trim()) {
    errors.fullName = 'Please enter your full name.'
  }

  if (!email) {
    errors.email = 'Please enter your email address.'
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!values.password) {
    errors.password = 'Please enter a password.'
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.'
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords do not match.'
  }

  return errors
}

export function RegisterPage() {
  const [values, setValues] = useState<RegisterFormValues>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<RegisterFormErrors>({})

  function updateField(field: keyof RegisterFormValues, value: string) {
    const nextValues = { ...values, [field]: value }
    setValues(nextValues)

    setErrors((currentErrors) => {
      if (!currentErrors[field] && field !== 'password') {
        return currentErrors
      }

      const nextValidationErrors = validateRegister(nextValues)
      const nextErrors = {
        ...currentErrors,
        [field]: nextValidationErrors[field],
      }

      if (field === 'password' && currentErrors.confirmPassword) {
        nextErrors.confirmPassword = nextValidationErrors.confirmPassword
      }

      return nextErrors
    })
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrors(validateRegister(values))
  }

  return (
    <AuthPageLayout
      description="Create your workspace account and start moving work forward."
      title="Create your account"
      titleId="register-title"
    >
      <form className={styles.form} noValidate onSubmit={handleSubmit}>
        <AuthFormField
          autoComplete="name"
          error={errors.fullName}
          id="register-full-name"
          label="Full name"
          onChange={(value) => updateField('fullName', value)}
          type="text"
          value={values.fullName}
        />
        <AuthFormField
          autoComplete="email"
          error={errors.email}
          id="register-email"
          label="Email"
          onChange={(value) => updateField('email', value)}
          type="email"
          value={values.email}
        />
        <AuthFormField
          autoComplete="new-password"
          error={errors.password}
          id="register-password"
          label="Password"
          onChange={(value) => updateField('password', value)}
          type="password"
          value={values.password}
        />
        <AuthFormField
          autoComplete="new-password"
          error={errors.confirmPassword}
          id="register-confirm-password"
          label="Confirm password"
          onChange={(value) => updateField('confirmPassword', value)}
          type="password"
          value={values.confirmPassword}
        />
        <button className={styles.submitButton} type="submit">
          Create account
        </button>
      </form>

      <p className={styles.switchText}>
        Already have an account?{' '}
        <Link className={styles.switchLink} to="/login">
          Login
        </Link>
      </p>
    </AuthPageLayout>
  )
}
