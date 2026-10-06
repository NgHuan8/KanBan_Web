import { useEffect, useRef, useState } from 'react'
import type { FormEvent, MouseEvent } from 'react'
import styles from './CreateProjectModal.module.css'

type CreateProjectModalProps = {
  onClose: () => void
}

export function CreateProjectModal({ onClose }: CreateProjectModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [projectName, setProjectName] = useState('')
  const [description, setDescription] = useState('')
  const [projectNameError, setProjectNameError] = useState('')

  useEffect(() => {
    const dialog = dialogRef.current

    if (!dialog) {
      return
    }

    dialog.showModal()

    return () => {
      if (dialog.open) {
        dialog.close()
      }
    }
  }, [])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!projectName.trim()) {
      setProjectNameError('Project name is required.')
      return
    }

    setProjectNameError('')
  }

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <dialog
      aria-labelledby="create-project-title"
      className={styles.dialog}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={handleBackdropClick}
      ref={dialogRef}
    >
      <form className={styles.form} noValidate onSubmit={handleSubmit}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>New project</p>
            <h2 className={styles.title} id="create-project-title">
              Create project
            </h2>
          </div>

          <button
            aria-label="Close create project dialog"
            className={styles.closeButton}
            onClick={onClose}
            type="button"
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <div className={styles.body}>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="project-name">
              Project name
            </label>
            <input
              aria-describedby={
                projectNameError ? 'project-name-error' : undefined
              }
              aria-invalid={Boolean(projectNameError)}
              autoFocus
              className={`${styles.input} ${
                projectNameError ? styles.inputError : ''
              }`}
              id="project-name"
              name="projectName"
              onChange={(event) => {
                setProjectName(event.target.value)

                if (projectNameError && event.target.value.trim()) {
                  setProjectNameError('')
                }
              }}
              required
              type="text"
              value={projectName}
            />
            {projectNameError ? (
              <p
                className={styles.errorMessage}
                id="project-name-error"
                role="alert"
              >
                {projectNameError}
              </p>
            ) : null}
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="project-description">
              Description
            </label>
            <textarea
              className={styles.textarea}
              id="project-description"
              name="description"
              onChange={(event) => setDescription(event.target.value)}
              rows={5}
              value={description}
            />
          </div>
        </div>

        <footer className={styles.actions}>
          <button
            className={styles.cancelButton}
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button className={styles.submitButton} type="submit">
            Create project
          </button>
        </footer>
      </form>
    </dialog>
  )
}
