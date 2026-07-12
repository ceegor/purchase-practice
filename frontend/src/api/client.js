const API_URL =
    import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api'

async function request(path, options = {}) {
    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: options.body
            ? { 'Content-Type': 'application/json', ...options.headers }
            : options.headers,
    })
    const responseText = await response.text()

    if (!response.ok) {
        let message = `Ошибка HTTP: ${response.status}`

        if (responseText) {
            try {
                message = JSON.parse(responseText).message ?? message
            } catch {
                message = responseText
            }
        }

        throw new Error(message)
    }

    return responseText ? JSON.parse(responseText) : null
}

export function getCustomers({
    search = '',
    sortBy = 'customerName',
    sortDirection = 'asc',
} = {}) {
    const params = new URLSearchParams({ sortBy, sortDirection })

    if (search.trim()) {
        params.set('search', search.trim())
    }

    return request(`/customers?${params}`)
}

export function getLots({
    search = '',
    sortBy = 'lotName',
    sortDirection = 'asc',
} = {}) {
    const params = new URLSearchParams({ sortBy, sortDirection })

    if (search.trim()) {
        params.set('search', search.trim())
    }

    return request(`/lots?${params}`)
}

export function createCustomer(customer) {
    return request('/customers', {
        method: 'POST',
        body: JSON.stringify(customer),
    })
}

export function updateCustomer(customerCode, customer) {
    return request(`/customers/${encodeURIComponent(customerCode)}`, {
        method: 'PUT',
        body: JSON.stringify(customer),
    })
}

export function deleteCustomer(customerCode) {
    return request(`/customers/${encodeURIComponent(customerCode)}`, {
        method: 'DELETE',
    })
}

export function createLot(lot) {
    return request('/lots', {
        method: 'POST',
        body: JSON.stringify(lot),
    })
}

export function updateLot(lotName, customerCode, lot) {
    const params = new URLSearchParams({ lotName, customerCode })

    return request(`/lots?${params}`, {
        method: 'PUT',
        body: JSON.stringify(lot),
    })
}

export function deleteLot(lotName, customerCode) {
    const params = new URLSearchParams({ lotName, customerCode })

    return request(`/lots?${params}`, {
        method: 'DELETE',
    })
}
