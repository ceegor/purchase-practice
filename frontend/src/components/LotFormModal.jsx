import { useState } from 'react'
import { IconClose } from '@consta/icons/IconClose'
import { Button } from '@consta/uikit/Button'
import { Modal } from '@consta/uikit/Modal'
import { Select } from '@consta/uikit/Select'
import { TextField } from '@consta/uikit/TextField'

const currencyOptions = [
  { id: 'RUB', label: 'RUB' },
  { id: 'USD', label: 'USD' },
  { id: 'EUR', label: 'EUR' },
]

const ndsOptions = [
  { id: 'Без НДС', label: 'Без НДС' },
  { id: '18%', label: '18%' },
  { id: '20%', label: '20%' },
]

function findOption(options, id, fallback) {
  return options.find((option) => option.id === id) ?? fallback
}

function createInitialForm(lot, customerOptions) {
  return {
    lotName: lot?.lotName ?? '',
    customer:
      findOption(customerOptions, lot?.customerCode, null) ??
      customerOptions[0] ??
      null,
    price: lot?.price?.toString() ?? '',
    currency: findOption(currencyOptions, lot?.currencyCode, currencyOptions[0]),
    ndsRate: findOption(ndsOptions, lot?.ndsRate, ndsOptions[0]),
    placeDelivery: lot?.placeDelivery ?? '',
    dateDelivery: lot?.dateDelivery?.slice(0, 16) ?? '',
  }
}

export function LotFormModal({
  lot,
  customerOptions,
  saving,
  error,
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState(() =>
    createInitialForm(lot, customerOptions),
  )
  const isEditing = Boolean(lot)

  const setField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value ?? '' }))
  }

  const submit = (event) => {
    event.preventDefault()

    if (!form.customer) {
      return
    }

    onSubmit({
      lotName: form.lotName.trim(),
      customerCode: form.customer.id,
      price: Number(form.price),
      currencyCode: form.currency.id,
      ndsRate: form.ndsRate.id,
      placeDelivery: form.placeDelivery.trim() || null,
      dateDelivery: form.dateDelivery || null,
    })
  }

  return (
    <Modal
      isOpen
      hasOverlay
      className="form-modal"
      onEsc={onClose}
      onOverlayClick={onClose}
    >
      <div className="modal-header">
        <h2>{isEditing ? 'Редактирование лота' : 'Новый лот'}</h2>
        <Button
          onlyIcon
          view="clear"
          iconLeft={IconClose}
          title="Закрыть"
          onClick={onClose}
        />
      </div>

      <form className="lot-form" onSubmit={submit}>
        <TextField
          label="Наименование"
          value={form.lotName}
          onChange={(value) => setField('lotName', value)}
          required
        />
        <Select
          label="Контрагент"
          items={customerOptions}
          value={form.customer}
          onChange={(value) => value && setField('customer', value)}
          required
        />
        <TextField
          label="Цена"
          type="number"
          min="0"
          step="0.01"
          value={form.price}
          onChange={(value) => setField('price', value)}
          required
        />
        <Select
          label="Валюта"
          items={currencyOptions}
          value={form.currency}
          onChange={(value) => value && setField('currency', value)}
        />
        <Select
          label="Ставка НДС"
          items={ndsOptions}
          value={form.ndsRate}
          onChange={(value) => value && setField('ndsRate', value)}
        />
        <TextField
          label="Дата доставки"
          type="datetime-local"
          value={form.dateDelivery}
          onChange={(value) => setField('dateDelivery', value)}
        />
        <TextField
          className="lot-form__wide"
          label="Место доставки"
          value={form.placeDelivery}
          onChange={(value) => setField('placeDelivery', value)}
        />

        {error && <div className="form-error">{error}</div>}

        <div className="modal-actions lot-form__wide">
          <Button
            type="button"
            label="Отмена"
            view="secondary"
            onClick={onClose}
          />
          <Button
            type="submit"
            label={isEditing ? 'Сохранить' : 'Создать'}
            loading={saving}
            disabled={!form.customer}
          />
        </div>
      </form>
    </Modal>
  )
}
