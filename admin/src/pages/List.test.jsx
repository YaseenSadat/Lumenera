import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import axios from 'axios'
import List from './List'
import { toast } from 'react-toastify'

vi.mock('axios')
vi.mock('../App', () => ({ backendUrl: 'http://localhost:4000', currency: '$' }))
vi.mock('react-toastify', () => ({ toast: { success: vi.fn(), error: vi.fn() } }))

const mockProducts = [
    { _id: '1', name: 'Shadow Dragon', category: 'Gold', price: 24.99, image: ['dragon.png'] },
    { _id: '2', name: 'Fire Spirit', category: 'Silver', price: 12.5, image: ['spirit.png'] },
]

describe('List', () => {
    const token = 'test-token'

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('fetches and renders products on mount', async () => {
        axios.get.mockResolvedValue({ data: { success: true, products: mockProducts } })
        render(<List token={token} />)

        await waitFor(() => {
            expect(screen.getByText('Shadow Dragon')).toBeInTheDocument()
            expect(screen.getByText('Fire Spirit')).toBeInTheDocument()
            expect(screen.getByText('Gold')).toBeInTheDocument()
            expect(screen.getByText('Silver')).toBeInTheDocument()
            expect(screen.getByText('$24.99')).toBeInTheDocument()
            expect(screen.getByText('$12.50')).toBeInTheDocument()
        })
    })

    it('calls removeProduct and refreshes list when X is clicked', async () => {
        axios.get.mockResolvedValue({ data: { success: true, products: mockProducts } })
        axios.post.mockResolvedValue({ data: { success: true, message: 'Product removed' } })
        render(<List token={token} />)

        await waitFor(() => screen.getByText('Shadow Dragon'))

        const deleteButtons = screen.getAllByText('X')
        fireEvent.click(deleteButtons[0])

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                'http://localhost:4000/api/product/remove',
                { id: '1' },
                { headers: { token } }
            )
            expect(toast.success).toHaveBeenCalledWith('Product removed')
        })
    })

    it('shows toast.error when fetching products fails', async () => {
        axios.get.mockResolvedValue({ data: { success: false, message: 'Failed to fetch' } })
        render(<List token={token} />)

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Failed to fetch')
        })
    })
})
