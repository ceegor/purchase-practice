import { Button } from '@consta/uikit/Button'
import { Modal } from '@consta/uikit/Modal'

export function ConfirmDeleteModal({
  title,
  description,
  pending,
  error,
  onClose,
  onConfirm,
}) {
  return (
    <Modal
      isOpen
      hasOverlay
      className="confirm-modal"
      onEsc={onClose}
      onOverlayClick={onClose}
    >
      <h2>{title}</h2>
      <p>{description}</p>

      {error && <div className="form-error">{error}</div>}

      <div className="modal-actions">
        <Button label="Отмена" view="secondary" onClick={onClose} />
        <Button label="Удалить" loading={pending} onClick={onConfirm} />
      </div>
    </Modal>
  )
}
