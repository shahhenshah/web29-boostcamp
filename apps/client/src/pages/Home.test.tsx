import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Home from './Home'

describe('Home', () => {
  it('renders home heading', () => {
    render(<Home />)
    const heading = screen.getByRole('heading', { name: /home/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders welcome message', () => {
    render(<Home />)
    const message = screen.getByText(/welcome to the home page/i)
    expect(message).toBeInTheDocument()
  })
})
