import { useCallback, useState } from 'react'
import { IconAdd } from '@consta/icons/IconAdd'
import { IconEdit } from '@consta/icons/IconEdit'
import { IconRevert } from '@consta/icons/IconRevert'
import { IconSearchStroked } from '@consta/icons/IconSearchStroked'
import { IconTrash } from '@consta/icons/IconTrash'
import { Button } from '@consta/uikit/Button'
import { Select } from '@consta/uikit/Select'
import { TextField } from '@consta/uikit/TextField'
import {
  createCustomer,
  deleteCustomer,
  getCustomers,
  updateCustomer,
} from '../api/client'
import { useApiData } from '../hooks/useApiData'
import { ConfirmDeleteModal } from './ConfirmDeleteModal'
import { CustomerFormModal } from './CustomerFormModal'
import { DataTable } from './DataTable'

const sortOptions = [
  { id: 'customerName', label: 'Наименование' },
  { id: 'customerCode', label: 'Код' },
  { id: 'customerInn', label: 'ИНН' },
  { id: 'customerEmail', label: 'Email' },
]

const directionOptions = [
  { id: 'asc', label: 'По возрастанию' },
  { id: 'desc', label: 'По убыванию' },
]

const initialQuery = {
  search: '',
  sortBy: sortOptions[0].id,
  sortDirection: directionOptions[0].id,
}

function createColumns(onEdit, onDelete) {
  return [
    { title: 'Код', accessor: 'customerCode' },
    { title: 'Наименование', accessor: 'customerName' },
    { title: 'ИНН', accessor: 'customerInn' },
    { title: 'КПП', accessor: 'customerKpp' },
    { title: 'Email', accessor: 'customerEmail' },
    {
      title: 'Тип',
      accessor: 'isOrganization',
      renderCell: (row) =>
        row.isOrganization ? 'Организация' : 'Физическое лицо',
    },
    {
      title: 'Действия',
      accessor: 'customerCode',
      align: 'right',
      renderCell: (row) => (
        <div className="row-actions">
          <Button
            onlyIcon
            size="s"
            view="clear"
            iconLeft={IconEdit}
            title="Редактировать"
            onClick={() => onEdit(row)}
          />
          <Button
            onlyIcon
            size="s"
            view="clear"
            iconLeft={IconTrash}
            title="Удалить"
            onClick={() => onDelete(row)}
          />
        </div>
      ),
    },
  ]
}

export function CustomersTable() {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState(sortOptions[0])
  const [sortDirection, setSortDirection] = useState(directionOptions[0])
  const [query, setQuery] = useState(initialQuery)
  const [formState, setFormState] = useState(null)
  const [customerToDelete, setCustomerToDelete] = useState(null)
  const [mutationPending, setMutationPending] = useState(false)
  const [mutationError, setMutationError] = useState(null)

  const loadCustomers = useCallback(() => getCustomers(query), [query])
  const { data, loading, error, reload } = useApiData(loadCustomers)

  const rows = data.map((customer) => ({
    ...customer,
    id: customer.customerCode,
  }))

  const applyFilters = (event) => {
    event.preventDefault()
    setQuery({
      search,
      sortBy: sortBy.id,
      sortDirection: sortDirection.id,
    })
  }

  const resetFilters = () => {
    setSearch('')
    setSortBy(sortOptions[0])
    setSortDirection(directionOptions[0])
    setQuery(initialQuery)
  }

  const openCreateForm = () => {
    setMutationError(null)
    setFormState({ customer: null })
  }

  const openEditForm = (customer) => {
    setMutationError(null)
    setFormState({ customer })
  }

  const openDeleteDialog = (customer) => {
    setMutationError(null)
    setCustomerToDelete(customer)
  }

  const saveCustomer = async (customer) => {
    setMutationPending(true)
    setMutationError(null)

    try {
      if (formState.customer) {
        await updateCustomer(formState.customer.customerCode, customer)
      } else {
        await createCustomer(customer)
      }
      setFormState(null)
      reload()
    } catch (requestError) {
      setMutationError(requestError.message)
    } finally {
      setMutationPending(false)
    }
  }

  const confirmDelete = async () => {
    setMutationPending(true)
    setMutationError(null)

    try {
      await deleteCustomer(customerToDelete.customerCode)
      setCustomerToDelete(null)
      reload()
    } catch (requestError) {
      setMutationError(requestError.message)
    } finally {
      setMutationPending(false)
    }
  }

  return (
    <>
      <div className="table-primary-actions">
        <Button
          label="Добавить контрагента"
          iconLeft={IconAdd}
          onClick={openCreateForm}
        />
      </div>

      <form className="table-toolbar" onSubmit={applyFilters}>
        <TextField
          label="Поиск"
          placeholder="Код, наименование, ИНН или email"
          value={search}
          onChange={(value) => setSearch(value ?? '')}
          withClearButton
        />
        <Select
          label="Сортировать по"
          items={sortOptions}
          value={sortBy}
          onChange={(value) => value && setSortBy(value)}
        />
        <Select
          label="Направление"
          items={directionOptions}
          value={sortDirection}
          onChange={(value) => value && setSortDirection(value)}
        />
        <Button
          type="submit"
          label="Применить"
          iconLeft={IconSearchStroked}
        />
        <Button
          type="button"
          label="Сбросить"
          view="secondary"
          iconLeft={IconRevert}
          onClick={resetFilters}
        />
      </form>

      <DataTable
        columns={createColumns(openEditForm, openDeleteDialog)}
        rows={rows}
        loading={loading}
        error={error}
        emptyText="Контрагенты не найдены"
      />

      {formState && (
        <CustomerFormModal
          key={formState.customer?.customerCode ?? 'new'}
          customer={formState.customer}
          saving={mutationPending}
          error={mutationError}
          onClose={() => setFormState(null)}
          onSubmit={saveCustomer}
        />
      )}

      {customerToDelete && (
        <ConfirmDeleteModal
          title="Удалить контрагента?"
          description={`${customerToDelete.customerName} (${customerToDelete.customerCode}) будет удалён без возможности восстановления.`}
          pending={mutationPending}
          error={mutationError}
          onClose={() => setCustomerToDelete(null)}
          onConfirm={confirmDelete}
        />
      )}
    </>
  )
}
