import React from 'react'
import {render, screen} from '@testing-library/react'
import {Editor} from '../post-editor-01-markup'

describe('when rendering Editor component', () => {
  it('should return  component', () => {
    render(<Editor />)
    expect(screen.getByText('Turtle')).toBeVisible()
    expect(screen.getByText('Content')).toBeVisible()
    expect(screen.getByText('Tags')).toBeVisible()
    expect(screen.getByRole('button')).toBeVisible()
  })
})
