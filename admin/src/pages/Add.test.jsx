import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import axios from 'axios'
import Add from './Add'
import { toast } from 'react-toastify'

vi.mock('axios')
vi.mock('../App', () => ({ backendUrl: 'http://localhost:4000' }))
vi.mock('react-toastify', () => ({ toast: { success: vi.fn(), error: vi.fn() } }))
vi.mock('../assets/assets', () => ({ assets: { upload_area: 'upload.png' } }))

describe('Add', () => {
    const token = 'test-token'

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders name, description, price inputs and ADD button', () => {
        render(<Add token={token} />)
        expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Write content here')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('9.99')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument()
    })

    it('updates name, description, and price on user input', () => {
        render(<Add token={token} />)

        const nameInput = screen.getByPlaceholderText('Type here')
        const descInput = screen.getByPlaceholderText('Write content here')
        const priceInput = screen.getByPlaceholderText('9.99')

        fireEvent.change(nameInput, { target: { value: 'Shadow Dragon' } })
        fireEvent.change(descInput, { target: { value: 'A rare dark card' } })
        fireEvent.change(priceInput, { target: { value: '24.99' } })

        expect(nameInput.value).toBe('Shadow Dragon')
        expect(descInput.value).toBe('A rare dark card')
        expect(priceInput.value).toBe('24.99')
    })

    it('updates rarity stock when a rarity input changes', () => {
        render(<Add token={token} />)

        const [standardInput] = screen.getAllByPlaceholderText('Stock')
        fireEvent.change(standardInput, { target: { value: '10' } })
        expect(standardInput.value).toBe('10')
    })

    it('toggles the Bestseller checkbox', () => {
        render(<Add token={token} />)
        const checkbox = screen.getByLabelText('Add to Bestseller')
        expect(checkbox.checked).toBe(false)
        fireEvent.click(checkbox)
        expect(checkbox.checked).toBe(true)
    })

    it('toggles the Latest Collection checkbox', () => {
        render(<Add token={token} />)
        const checkbox = screen.getByLabelText('Add to Latest Collection')
        expect(checkbox.checked).toBe(false)
        fireEvent.click(checkbox)
        expect(checkbox.checked).toBe(true)
    })

    it('resets form fields after successful submission', async () => {
        axios.post.mockResolvedValue({ data: { success: true, message: 'Product added!' } })
        render(<Add token={token} />)

        const nameInput = screen.getByPlaceholderText('Type here')
        const descInput = screen.getByPlaceholderText('Write content here')
        const priceInput = screen.getByPlaceholderText('9.99')
        fireEvent.change(nameInput, { target: { value: 'Shadow Dragon' } })
        fireEvent.change(descInput, { target: { value: 'A rare dark card' } })
        fireEvent.change(priceInput, { target: { value: '24.99' } })
        fireEvent.click(screen.getByRole('button', { name: /add/i }))

        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith('Product added!')
            expect(nameInput.value).toBe('')
            expect(priceInput.value).toBe('')
        })
    })

    it('shows toast.error when submission returns success: false', async () => {
        axios.post.mockResolvedValue({ data: { success: false, message: 'Unauthorized' } })
        render(<Add token={token} />)

        fireEvent.change(screen.getByPlaceholderText('Type here'), { target: { value: 'Shadow Dragon' } })
        fireEvent.change(screen.getByPlaceholderText('Write content here'), { target: { value: 'A rare dark card' } })
        fireEvent.change(screen.getByPlaceholderText('9.99'), { target: { value: '24.99' } })
        fireEvent.click(screen.getByRole('button', { name: /add/i }))

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Unauthorized')
        })
    })
})
