import {Redirect as MockRedirect} from 'react-router'
import {act, render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import * as savePostModule from '../api'
import {Editor} from '../post-editor-04-router-redirect'

jest.mock('react-router', () => {
  return {
    Redirect: jest.fn(() => null),
  }
})

const savePostSpy = jest.spyOn(savePostModule, 'savePost')
beforeEach(() => {
  savePostSpy.mockResolvedValue()
})

describe('when editor is running', () => {
  it('should return', () => {
    render(<Editor />)
    expect(screen.getByText('Title')).toBeVisible()
    expect(screen.getByText('Content')).toBeVisible()
    expect(screen.getByText('Tags')).toBeVisible()
    expect(screen.getByRole('button')).toBeVisible()
  })

  it('should disable the button when a click happens', async () => {
    render(<Editor user={{id: 1}} />)
    const buttonTest = screen.getByRole('button')
    expect(buttonTest).toBeEnabled()
    await act(async () => {
      userEvent.click(buttonTest)
      await waitFor(() =>
        expect(savePostSpy).toHaveBeenCalledWith({
          title: '',
          content: '',
          tags: [''],
          authorId: 1,
        }),
      )
    })

    expect(buttonTest).toBeDisabled()
  })

  it('should call the api when click happens', async () => {
    render(<Editor user={{id: 1}} />)
    const buttonTest = screen.getByRole('button')
    const inputTitle = screen.getByRole('textbox', {name: 'Title'})
    const inputContent = screen.getByRole('textbox', {name: 'Content'})
    const inputTags = screen.getByRole('textbox', {name: 'Tags'})

    userEvent.type(inputTitle, 'title')
    userEvent.type(inputContent, 'title')
    userEvent.type(inputTags, 'title')
    await act(async () => {
      userEvent.click(buttonTest)
      await waitFor(() =>
        expect(savePostSpy).toHaveBeenCalledWith({
          title: 'title',
          content: 'title',
          tags: ['title'],
          authorId: 1,
        }),
      )
    })
  })
  it('should redirect to another route when click happens', async () => {
    render(<Editor user={{id: 2}} />)
    const buttonTest = screen.getByRole('button')
    const inputTitle = screen.getByRole('textbox', {name: 'Title'})
    const inputContent = screen.getByRole('textbox', {name: 'Content'})
    const inputTags = screen.getByRole('textbox', {name: 'Tags'})

    userEvent.type(inputTitle, 'title')
    userEvent.type(inputContent, 'title')
    userEvent.type(inputTags, 'title')
    await act(async () => {
      userEvent.click(buttonTest)
      await waitFor(() =>
        expect(savePostSpy).toHaveBeenCalledWith({
          title: 'title',
          content: 'title',
          tags: ['title'],
          authorId: 2,
        }),
      )
    })
    await waitFor(() =>
      expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {}),
    )
  })
})
