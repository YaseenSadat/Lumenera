import { render, screen, fireEvent } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import Navbar from './Navbar'

vi.mock('../assets/assets', () => ({
    assets: { lumenera_title: 'lumenera-title.png' }
}))

describe('Navbar', () => {
    const setToken = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders the Logout button', () => {
        render(<Navbar setToken={setToken} />)
        expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument()
    })

    it('calls setToken with empty string when Logout is clicked', () => {
        render(<Navbar setToken={setToken} />)
        fireEvent.click(screen.getByRole('button', { name: /logout/i }))
        expect(setToken).toHaveBeenCalledWith('')
    })
})
