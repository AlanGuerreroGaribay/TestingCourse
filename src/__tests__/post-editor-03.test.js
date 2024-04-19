import React from 'react'
import * as savePostModule from '../api'
import {render, screen} from '@testing-library/react'
import {Editor} from '../post-editor-03-api'
import userEvent from '@testing-library/user-event'

const savePostSpy = jest.spyOn(savePostModule, 'savePost')
beforeEach(() => {
  savePostSpy.mockImplementation(() => jest.fn())
})

describe('when the Editor is running', () => {
  it('should return', () => {
    render(<Editor />)
    expect(screen.getByText('Title')).toBeVisible()
    expect(screen.getByText('Content')).toBeVisible()
    expect(screen.getByText('Tags')).toBeVisible()
    expect(screen.getByRole('button')).toBeVisible()
  })

  it('should disable the button when a click happens', () => {
    render(<Editor user={{id: 1}} />)
    const buttonTest = screen.getByRole('button')

    expect(buttonTest).toBeEnabled()
    userEvent.click(buttonTest)

    expect(buttonTest).toBeDisabled()
  })

  it('should call the api when click happens', () => {
    render(<Editor user={{id: 1}} />)
    const buttonTest = screen.getByRole('button')
    const inputTitle = screen.getByRole('textbox', {name: 'Title'})
    const inputContent = screen.getByRole('textbox', {name: 'Content'})
    const inputTags = screen.getByRole('textbox', {name: 'Tags'})

    userEvent.type(inputTitle, 'title')
    userEvent.type(inputContent, 'title')
    userEvent.type(inputTags, 'title')
    userEvent.click(buttonTest)

    expect(savePostSpy).toHaveBeenCalledWith({
      title: 'title',
      content: 'title',
      tags: ['title'],
      authorId: 1,
    })
  })
})
