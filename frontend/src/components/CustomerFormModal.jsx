import { useState } from 'react'
import { IconClose } from '@consta/icons/IconClose'
import { Button } from '@consta/uikit/Button'
import { Modal } from '@consta/uikit/Modal'
import { Select } from '@consta/uikit/Select'
import { TextField } from '@consta/uikit/TextField'

const customerTypes = [
  { id: 'organization', label: 'Организация' },
  { id: 'person', label: 'Физическое лицо' },
]

function createInitialForm(customer) {
  return {
    customerCode: customer?.customerCode ?? '',
    customerName: customer?.customerName ?? '',
    customerInn: customer?.customerInn ?? '',
    customerKpp: customer?.customerKpp ?? '',
    customerLegalAddress: customer?.customerLegalAddress ?? '',
    customerPostalAddress: customer?.customerPostalAddress ?? '',
    customerEmail: customer?.customerEmail ?? '',
    customerCodeMain: customer?.customerCodeMain ?? '',
    customerType: customer?.isPerson ? customerTypes[1] : customerTypes[0],
  }
}

const optionalValue = (value) => value.trim() || null

export function CustomerFormModal({
  customer,
  saving,
  error,
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState(() => createInitialForm(customer))
  const isEditing = Boolean(customer)

  const setField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value ?? '' }))
  }

  const submit = (event) => {
    event.preventDefault()
    onSubmit({
      customerCode: form.customerCode.trim(),
      customerName: form.customerName.trim(),
      customerInn: optionalValue(form.customerInn),
      customerKpp: optionalValue(form.customerKpp),
      customerLegalAddress: optionalValue(form.customerLegalAddress),
      customerPostalAddress: optionalValue(form.customerPostalAddress),
      customerEmail: optionalValue(form.customerEmail),
      customerCodeMain: optionalValue(form.customerCodeMain),
      isOrganization: form.customerType.id === 'organization',
      isPerson: form.customerType.id === 'person',
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
        <h2>{isEditing ? 'Редактирование контрагента' : 'Новый контрагент'}</h2>
        <Button
          onlyIcon
          view="clear"
          iconLeft={IconClose}
          title="Закрыть"
          onClick={onClose}
        />
      </div>

      <form className="customer-form" onSubmit={submit}>
        <TextField
          label="Код"
          value={form.customerCode}
          onChange={(value) => setField('customerCode', value)}
          readOnly={isEditing}
          required
        />
        <TextField
          label="Наименование"
          value={form.customerName}
          onChange={(value) => setField('customerName', value)}
          required
        />
        <TextField
          label="ИНН"
          value={form.customerInn}
          onChange={(value) => setField('customerInn', value)}
        />
        <TextField
          label="КПП"
          value={form.customerKpp}
          onChange={(value) => setField('customerKpp', value)}
        />
        <TextField
          label="Email"
          type="email"
          value={form.customerEmail}
          onChange={(value) => setField('customerEmail', value)}
        />
        <Select
          label="Тип"
          items={customerTypes}
          value={form.customerType}
          onChange={(value) => value && setField('customerType', value)}
        />
        <TextField
          className="customer-form__wide"
          label="Юридический адрес"
          value={form.customerLegalAddress}
          onChange={(value) => setField('customerLegalAddress', value)}
        />
        <TextField
          className="customer-form__wide"
          label="Почтовый адрес"
          value={form.customerPostalAddress}
          onChange={(value) => setField('customerPostalAddress', value)}
        />
        <TextField
          label="Код головного контрагента"
          value={form.customerCodeMain}
          onChange={(value) => setField('customerCodeMain', value)}
        />

        {error && <div className="form-error">{error}</div>}

        <div className="modal-actions customer-form__wide">
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
          />
        </div>
      </form>
    </Modal>
  )
}
