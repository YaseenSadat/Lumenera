import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import axios from 'axios'
import Login from './Login'
import { toast } from 'react-toastify'

vi.mock('axios')
vi.mock('../App', () => ({ backendUrl: 'http://localhost:4000' }))
vi.mock('react-toastify', () => ({ toast: { success: vi.fn(), error: vi.fn() } }))

describe('Login', () => {
    const setToken = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders email input, password input, and login button', () => {
        render(<Login setToken={setToken} />)
        expect(screen.getByPlaceholderText('your@email.com')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
    })

    it('updates email and password on user input', () => {
        render(<Login setToken={setToken} />)
        const emailInput = screen.getByPlaceholderText('your@email.com')
        const passwordInput = screen.getByPlaceholderText('Enter your password')

        fireEvent.change(emailInput, { target: { value: 'admin@test.com' } })
        fireEvent.change(passwordInput, { target: { value: 'secret123' } })

        expect(emailInput.value).toBe('admin@test.com')
        expect(passwordInput.value).toBe('secret123')
    })

    it('calls axios.post with credentials on submit', async () => {
        axios.post.mockResolvedValue({ data: { success: true, token: 'abc123' } })
        render(<Login setToken={setToken} />)

        fireEvent.change(screen.getByPlaceholderText('your@email.com'), { target: { value: 'admin@test.com' } })
        fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'secret123' } })
        fireEvent.click(screen.getByRole('button', { name: /login/i }))

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                'http://localhost:4000/api/user/admin',
                { email: 'admin@test.com', password: 'secret123' }
            )
        })
    })

    it('calls setToken with the token on successful login', async () => {
        axios.post.mockResolvedValue({ data: { success: true, token: 'abc123' } })
        render(<Login setToken={setToken} />)

        fireEvent.change(screen.getByPlaceholderText('your@email.com'), { target: { value: 'admin@test.com' } })
        fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'secret123' } })
        fireEvent.click(screen.getByRole('button', { name: /login/i }))

        await waitFor(() => {
            expect(setToken).toHaveBeenCalledWith('abc123')
        })
    })

    it('shows toast.error when login fails', async () => {
        axios.post.mockResolvedValue({ data: { success: false, message: 'Invalid credentials' } })
        render(<Login setToken={setToken} />)

        fireEvent.change(screen.getByPlaceholderText('your@email.com'), { target: { value: 'wrong@test.com' } })
        fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'wrongpass' } })
        fireEvent.click(screen.getByRole('button', { name: /login/i }))

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Invalid credentials')
        })
    })
})
