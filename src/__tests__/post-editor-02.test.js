import React from 'react'
import {render, screen} from '@testing-library/react'
import {Editor} from '../post-editor-02-state'
import userEvent from '@testing-library/user-event'

describe('when the Editor is running', () => {
  it('should return', () => {
    render(<Editor />)
    expect(screen.getByText('Title')).toBeVisible()
    expect(screen.getByText('Content')).toBeVisible()
    expect(screen.getByText('Tags')).toBeVisible()
    expect(screen.getByRole('button')).toBeVisible()
  })
  it('should disable the button when a click happens', () => {
    render(<Editor />)
    const buttonTest = screen.getByRole('button')

    expect(buttonTest).toBeEnabled()
    userEvent.click(buttonTest)

    expect(buttonTest).toBeDisabled()
  })
})
