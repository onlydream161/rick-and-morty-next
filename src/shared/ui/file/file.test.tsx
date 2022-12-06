import { fireEvent, render, renderHook, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './file.stories'
import { mock } from 'mockjs'
import { useState } from 'react'
import { FileModel, Nullable } from '@/shared/@types'
import { FILE_ENTITY_MOCK, IMAGE_ENTITY_MOCK } from '@/shared/config'

const { Default, Image } = composeStories(stories)

describe('FileTests', () => {
  it('file should be render', () => {
    render(<Default />)
    expect(screen.queryByTestId('file')).toBeInTheDocument()
  })

  it('image should be render', () => {
    render(<Image />)
    expect(screen.queryByTestId('image-file')).toBeInTheDocument()
  })

  it('file with loading should be render preloader instead close button', () => {
    render(<Default file={mock({ ...FILE_ENTITY_MOCK, loading: true })} />)
    expect(screen.queryByTestId('file-close-button')).not.toBeInTheDocument()
    expect(screen.queryByTestId('file-preloader')).toBeInTheDocument()
  })

  it('image with loading should be render preloader instead close button', () => {
    render(<Default file={mock({ ...IMAGE_ENTITY_MOCK, loading: true })} />)
    expect(screen.queryByTestId('file-close-button')).not.toBeInTheDocument()
    expect(screen.queryByTestId('image-skeleton')).toBeInTheDocument()
  })

  it('close button should be trigger on remove', () => {
    const file = mock(FILE_ENTITY_MOCK)
    const { result } = renderHook(() => useState<Nullable<FileModel>>())
    render(<Default file={file} onRemove={result.current[1]} />)
    fireEvent.click(screen.getByTestId('file-close-button'))
    expect(result.current[0]).toStrictEqual(file)
  })
})
