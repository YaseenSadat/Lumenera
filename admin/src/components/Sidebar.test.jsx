import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi, describe, it, expect } from 'vitest'
import Sidebar from './Sidebar'

vi.mock('../assets/assets', () => ({
    assets: { add_icon: 'add-icon.png', order_icon: 'order-icon.png' }
}))

describe('Sidebar', () => {
    it('renders navigation links for Add Items, List Items, and Orders', () => {
        render(
            <MemoryRouter>
                <Sidebar />
            </MemoryRouter>
        )
        expect(screen.getByText('Add Items')).toBeInTheDocument()
        expect(screen.getByText('List Items')).toBeInTheDocument()
        expect(screen.getByText('Orders')).toBeInTheDocument()
    })

    it('links point to the correct routes', () => {
        render(
            <MemoryRouter>
                <Sidebar />
            </MemoryRouter>
        )
        expect(screen.getByText('Add Items').closest('a')).toHaveAttribute('href', '/add')
        expect(screen.getByText('List Items').closest('a')).toHaveAttribute('href', '/list')
        expect(screen.getByText('Orders').closest('a')).toHaveAttribute('href', '/orders')
    })
})
