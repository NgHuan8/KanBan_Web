import type { HTMLInputTypeAttribute } from 'react'
import styles from '../styles/AuthForm.module.css'

type AuthFormFieldProps = {
  autoComplete: string
  error?: string
  id: string
  label: string
  onChange: (value: string) => void
  type: HTMLInputTypeAttribute
  value: string
}

export function AuthFormField({
  autoComplete,
  error,
  id,
  label,
  onChange,
  type,
  value,
}: AuthFormFieldProps) {
  const errorId = `${id}-error`

  return (
    <div className={styles.fieldGroup}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        autoComplete={autoComplete}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        id={id}
        name={id}
        onChange={(event) => onChange(event.target.value)}
        type={type}
        value={value}
      />
      {error ? (
        <p className={styles.errorMessage} id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
