import { Loader } from '@consta/uikit/Loader'
import { Table } from '@consta/uikit/Table'

export function DataTable({ columns, rows, loading, error, emptyText }) {
  if (loading) {
    return (
      <div className="status">
        <Loader />
      </div>
    )
  }

  if (error) {
    return (
      <div className="status status_error">
        Не удалось загрузить данные: {error}
      </div>
    )
  }

  return (
    <div className="table-scroll">
      <Table
        columns={columns}
        rows={rows}
        size="m"
        zebraStriped="even"
        borderBetweenRows
        emptyRowsPlaceholder={emptyText}
      />
    </div>
  )
}
