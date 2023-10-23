import { fireEvent, render, renderHook, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './file.stories'
import { mock } from 'mockjs'
import { useState } from 'react'
import { FileModel, Nullable } from '@/shared/@types'
import { FILE_ENTITY_MOCK } from '@/shared/config'

const { Default } = composeStories(stories)

describe('FileTests', () => {
  it('file should be render', () => {
    render(<Default />)
    expect(screen.getByTestId('file')).toBeInTheDocument()
  })
  it('file with loading should be render preloader instead close button', () => {
    render(<Default file={mock({ ...FILE_ENTITY_MOCK, loading: true })} />)
    expect(screen.queryByTestId('file-delete-button')).not.toBeInTheDocument()
    expect(screen.getByTestId('file-preloader')).toBeInTheDocument()
  })

  it('close button should be invisible with saved files', () => {
    render(<Default isSaved={true} />)
    expect(screen.queryByTestId('file-delete-button')).not.toBeInTheDocument()
  })

  it('close button should be trigger on remove', () => {
    const file = mock(FILE_ENTITY_MOCK)
    const { result } = renderHook(() => useState<Nullable<FileModel>>())
    render(<Default file={file} onRemove={result.current[1]} />)
    fireEvent.click(screen.getByTestId('file-delete-button'))
    expect(result.current[0]).toStrictEqual(file)
  })
})
