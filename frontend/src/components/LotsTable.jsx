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
  createLot,
  deleteLot,
  getCustomers,
  getLots,
  updateLot,
} from '../api/client'
import { useApiData } from '../hooks/useApiData'
import { ConfirmDeleteModal } from './ConfirmDeleteModal'
import { DataTable } from './DataTable'
import { LotFormModal } from './LotFormModal'

const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
  dateStyle: 'short',
  timeStyle: 'short',
})

const sortOptions = [
  { id: 'lotName', label: 'Наименование' },
  { id: 'customerCode', label: 'Код контрагента' },
  { id: 'price', label: 'Цена' },
  { id: 'currencyCode', label: 'Валюта' },
  { id: 'ndsRate', label: 'НДС' },
  { id: 'dateDelivery', label: 'Дата доставки' },
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
    { title: 'Наименование', accessor: 'lotName' },
    { title: 'Код контрагента', accessor: 'customerCode' },
    {
      title: 'Цена',
      accessor: 'price',
      align: 'right',
      renderCell: (row) => Number(row.price).toLocaleString('ru-RU'),
    },
    { title: 'Валюта', accessor: 'currencyCode' },
    { title: 'НДС', accessor: 'ndsRate' },
    { title: 'Место доставки', accessor: 'placeDelivery' },
    {
      title: 'Дата доставки',
      accessor: 'dateDelivery',
      renderCell: (row) =>
        row.dateDelivery ? dateFormatter.format(new Date(row.dateDelivery)) : '-',
    },
    {
      title: 'Действия',
      accessor: 'lotName',
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

export function LotsTable() {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState(sortOptions[0])
  const [sortDirection, setSortDirection] = useState(directionOptions[0])
  const [query, setQuery] = useState(initialQuery)
  const [formState, setFormState] = useState(null)
  const [lotToDelete, setLotToDelete] = useState(null)
  const [mutationPending, setMutationPending] = useState(false)
  const [mutationError, setMutationError] = useState(null)

  const loadLots = useCallback(() => getLots(query), [query])
  const { data, loading, error, reload } = useApiData(loadLots)
  const {
    data: customers,
    loading: customersLoading,
    error: customersError,
  } = useApiData(getCustomers)

  const rows = data.map((lot) => ({
    ...lot,
    id: JSON.stringify([lot.lotName, lot.customerCode]),
  }))
  const customerOptions = customers.map((customer) => ({
    id: customer.customerCode,
    label: `${customer.customerName} (${customer.customerCode})`,
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
    setFormState({ lot: null })
  }

  const openEditForm = (lot) => {
    setMutationError(null)
    setFormState({ lot })
  }

  const openDeleteDialog = (lot) => {
    setMutationError(null)
    setLotToDelete(lot)
  }

  const saveLot = async (lot) => {
    setMutationPending(true)
    setMutationError(null)

    try {
      if (formState.lot) {
        await updateLot(
          formState.lot.lotName,
          formState.lot.customerCode,
          lot,
        )
      } else {
        await createLot(lot)
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
      await deleteLot(lotToDelete.lotName, lotToDelete.customerCode)
      setLotToDelete(null)
      reload()
    } catch (requestError) {
      setMutationError(requestError.message)
    } finally {
      setMutationPending(false)
    }
  }

  const createDisabled = customersLoading || Boolean(customersError)

  return (
    <>
      <div className="table-primary-actions">
        <Button
          label="Добавить лот"
          iconLeft={IconAdd}
          disabled={createDisabled}
          title={customersError ? 'Не удалось загрузить контрагентов' : undefined}
          onClick={openCreateForm}
        />
      </div>

      <form className="table-toolbar" onSubmit={applyFilters}>
        <TextField
          label="Поиск"
          placeholder="Наименование, контрагент, валюта или НДС"
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
        emptyText="Лоты не найдены"
      />

      {formState && (
        <LotFormModal
          key={formState.lot?.id ?? 'new'}
          lot={formState.lot}
          customerOptions={customerOptions}
          saving={mutationPending}
          error={mutationError}
          onClose={() => setFormState(null)}
          onSubmit={saveLot}
        />
      )}

      {lotToDelete && (
        <ConfirmDeleteModal
          title="Удалить лот?"
          description={`${lotToDelete.lotName} (${lotToDelete.customerCode}) будет удалён без возможности восстановления.`}
          pending={mutationPending}
          error={mutationError}
          onClose={() => setLotToDelete(null)}
          onConfirm={confirmDelete}
        />
      )}
    </>
  )
}
