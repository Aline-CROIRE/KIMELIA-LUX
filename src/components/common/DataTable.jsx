"use client"

import { useState } from "react"
import styled from "styled-components"
import { ChevronLeft, ChevronRight, Search, Filter, Download, Trash2, Edit, Eye } from "lucide-react"

const TableContainer = styled.div`
  background-color: var(--color-background);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  overflow: hidden;
`

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`

const TableTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
`

const TableDescription = styled.p`
  font-size: 0.875rem;
  color: var(--color-foreground);
  opacity: 0.7;
  margin: 0.25rem 0 0 0;
`

const TableActions = styled.div`
  display: flex;
  gap: 0.5rem;
`

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &.primary {
    background-color: var(--color-primary);
    color: white;
    border: none;
    
    &:hover {
      background-color: var(--color-primary-dark);
    }
  }
  
  &.secondary {
    background-color: var(--color-background);
    color: var(--color-foreground);
    border: 1px solid var(--color-border);
    
    &:hover {
      background-color: var(--color-muted);
    }
  }
  
  @media (max-width: 576px) {
    .label {
      display: none;
    }
    
    padding: 0.5rem;
  }
`

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 300px;
  position: relative;
  
  input {
    width: 100%;
    padding: 0.5rem 1rem 0.5rem 2.5rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    background-color: var(--color-background);
    color: var(--color-foreground);
    
    &:focus {
      outline: none;
      border-color: var(--color-primary);
    }
  }
  
  .search-icon {
    position: absolute;
    left: 0.75rem;
    color: var(--color-foreground);
    opacity: 0.5;
  }
`

const TableWrapper = styled.div`
  overflow-x: auto;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 1rem;
    text-align: left;
  }
  
  th {
    font-weight: 600;
    font-size: 0.875rem;
    color: var(--color-foreground);
    opacity: 0.7;
    border-bottom: 1px solid var(--color-border);
    
    &.sortable {
      cursor: pointer;
      
      &:hover {
        color: var(--color-primary);
      }
    }
  }
  
  tr {
    &:hover {
      background-color: var(--color-muted);
    }
  }
  
  td {
    border-bottom: 1px solid var(--color-border);
  }
`

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  
  &.success {
    background-color: rgba(76, 175, 80, 0.1);
    color: var(--color-success);
  }
  
  &.warning {
    background-color: rgba(255, 152, 0, 0.1);
    color: var(--color-warning);
  }
  
  &.error {
    background-color: rgba(244, 67, 54, 0.1);
    color: var(--color-error);
  }
  
  &.info {
    background-color: rgba(33, 150, 243, 0.1);
    color: var(--color-info);
  }
`

const ActionButton = styled.button`
  background: none;
  border: none;
  color: var(--color-foreground);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--color-muted);
    color: var(--color-primary);
  }
  
  &.edit {
    color: var(--color-info);
  }
  
  &.delete {
    color: var(--color-error);
  }
  
  &.view {
    color: var(--color-primary);
  }
`

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.5rem;
  
  .pagination-info {
    font-size: 0.875rem;
    color: var(--color-foreground);
    opacity: 0.7;
  }
  
  .pagination-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .pagination-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    background-color: var(--color-background);
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: var(--color-muted);
    }
    
    &.active {
      background-color: var(--color-primary);
      color: white;
      border-color: var(--color-primary);
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  text-align: center;
  
  .icon {
    font-size: 3rem;
    color: var(--color-muted);
    margin-bottom: 1rem;
  }
  
  .title {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .description {
    font-size: 0.875rem;
    color: var(--color-foreground);
    opacity: 0.7;
    max-width: 400px;
    margin-bottom: 1.5rem;
  }
`

const DataTable = ({
  title,
  description,
  columns,
  data,
  actions = true,
  onEdit,
  onDelete,
  onView,
  onAdd,
  addButtonLabel = "Add New",
  emptyTitle = "No data found",
  emptyDescription = "There are no items to display at the moment.",
  pageSize = 10,
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState(null)
  const [sortDirection, setSortDirection] = useState("asc")

  // Filter data based on search term
  const filteredData = data.filter((item) => {
    return Object.values(item).some(
      (value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    )
  })

  // Sort data based on column and direction
  const sortedData = sortColumn
    ? [...filteredData].sort((a, b) => {
        const aValue = a[sortColumn]
        const bValue = b[sortColumn]

        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
        return 0
      })
    : filteredData

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const paginatedData = sortedData.slice(startIndex, startIndex + pageSize)

  // Handle sort
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1) // Reset to first page on search
  }

  // Export to CSV
  const exportToCSV = () => {
    const headers = columns.map((col) => col.header).join(",")
    const rows = filteredData.map((item) => columns.map((col) => item[col.accessor]).join(",")).join("\n")

    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `${title.replace(/\s+/g, "-").toLowerCase()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <TableContainer>
      <TableHeader>
        <div>
          <TableTitle>{title}</TableTitle>
          {description && <TableDescription>{description}</TableDescription>}
        </div>

        <TableActions>
          <SearchContainer>
            <Search className="search-icon" size={16} />
            <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} />
          </SearchContainer>

          <Button className="secondary">
            <Filter size={16} />
            <span className="label">Filter</span>
          </Button>

          <Button className="secondary" onClick={exportToCSV}>
            <Download size={16} />
            <span className="label">Export</span>
          </Button>

          {onAdd && (
            <Button className="primary" onClick={onAdd}>
              <span className="label">{addButtonLabel}</span>
            </Button>
          )}
        </TableActions>
      </TableHeader>

      {paginatedData.length > 0 ? (
        <>
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.accessor}
                      className={column.sortable ? "sortable" : ""}
                      onClick={() => column.sortable && handleSort(column.accessor)}
                    >
                      {column.header}
                      {sortColumn === column.accessor && (
                        <span style={{ marginLeft: "0.25rem" }}>{sortDirection === "asc" ? "↑" : "↓"}</span>
                      )}
                    </th>
                  ))}
                  {actions && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {columns.map((column) => (
                      <td key={column.accessor}>{column.cell ? column.cell(row) : row[column.accessor]}</td>
                    ))}
                    {actions && (
                      <td>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          {onView && (
                            <ActionButton className="view" onClick={() => onView(row)}>
                              <Eye size={18} />
                            </ActionButton>
                          )}
                          {onEdit && (
                            <ActionButton className="edit" onClick={() => onEdit(row)}>
                              <Edit size={18} />
                            </ActionButton>
                          )}
                          {onDelete && (
                            <ActionButton className="delete" onClick={() => onDelete(row)}>
                              <Trash2 size={18} />
                            </ActionButton>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrapper>

          <Pagination>
            <div className="pagination-info">
              Showing {startIndex + 1} to {Math.min(startIndex + pageSize, filteredData.length)} of{" "}
              {filteredData.length} entries
            </div>

            <div className="pagination-controls">
              <button
                className="pagination-button"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }

                return (
                  <button
                    key={i}
                    className={`pagination-button ${currentPage === pageNum ? "active" : ""}`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                )
              })}

              <button
                className="pagination-button"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </Pagination>
        </>
      ) : (
        <EmptyState>
          <div className="icon">📋</div>
          <h3 className="title">{emptyTitle}</h3>
          <p className="description">{emptyDescription}</p>
          {onAdd && (
            <Button className="primary" onClick={onAdd}>
              {addButtonLabel}
            </Button>
          )}
        </EmptyState>
      )}
    </TableContainer>
  )
}

export default DataTable

