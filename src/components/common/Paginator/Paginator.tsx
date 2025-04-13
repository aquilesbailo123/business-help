import React from "react"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import "./Paginator.css"

interface PaginatorProps {
    /** Current active page (1-based indexing) for highlighting and calculations */
    page: number
    /** Total number of pages available for navigation */
    numPages: number
    /** Callback to handle page changes and update parent state */
    onPageChange: (page: number) => void
    /** Controls the size of pagination buttons for different UI densities */
    size?: 'sm' | 'md' | 'lg'
    /** Determines the shape of pagination buttons for visual styling */
    variant?: 'rounded' | 'circle'
    /** Whether to show first/last page jump buttons for quick navigation */
    showEdges?: boolean
    /** Number of page buttons to display (must be odd and equal or higher than 5 for centered current page) */
    maxVisiblePages?: number
}

/**
 * A responsive pagination component that maintains consistent width and spacing.
 * Always displays first and last pages, with smart distribution of middle pages
 */
const Paginator: React.FC<PaginatorProps> = ({ 
    page, 
    numPages, 
    onPageChange,
    size = 'md',
    variant = 'rounded',
    showEdges = true,
    maxVisiblePages = 5
}) => {
    // Ensure maxVisiblePages is odd and at least 5
    const adjustedMaxPages = Math.max(5, Math.floor(maxVisiblePages % 2 === 0 ? maxVisiblePages + 1 : maxVisiblePages))
    
    const getPageNumbers = () => {
        const pages: (number | string)[] = []
        
        const addPageRange = (start: number, end: number) => {
            pages.push(...Array.from({ length: end - start + 1 }, (_, i) => start + i))
        }

        // If we have fewer pages than max to display, show all
        if (numPages <= adjustedMaxPages) {
            addPageRange(1, numPages)
            return pages
        }

        // Calculate how many numbers we show besides first, last, and dots
        const middleCount = adjustedMaxPages - 4 // Subtract first, last, and two dots
        const middleMargin = Math.floor(middleCount / 2)

        // If current page is near the start
        if (page < adjustedMaxPages - 2) {
            addPageRange(1, adjustedMaxPages - 2)
            pages.push('...', numPages)
        }
        // If current page is near the end
        else if (page > numPages - (adjustedMaxPages - 2)) {
            pages.push(1, '...')
            addPageRange(numPages - (adjustedMaxPages - 3), numPages)
        }
        // If current page is in the middle
        else {
            pages.push(1, '...')
            addPageRange(page - middleMargin, page + middleMargin)
            pages.push('...', numPages)
        }

        return pages
    }

    const handlePageClick = (newPage: number | string) => {
        if (typeof newPage === 'number' && newPage !== page) {
            onPageChange(newPage)
        }
    }

    const pages = getPageNumbers()

    return (
        <nav className={`paginator-container size-${size}`} aria-label="pagination">
            {showEdges && (
                <button 
                    className={`paginator-item ${variant} ${page === 1 ? 'disabled' : ''}`}
                    onClick={() => handlePageClick(1)}
                    disabled={page === 1}
                    aria-label='first_page'
                >
                    <IoIosArrowBack className="paginator-double-arrow" />
                    <IoIosArrowBack className="paginator-double-arrow negative-margin" />
                </button>
            )}
            
            <button 
                className={`paginator-item ${variant} ${page === 1 ? 'disabled' : ''}`}
                onClick={() => handlePageClick(page - 1)}
                disabled={page === 1}
                aria-label='previous_page'
            >
                <IoIosArrowBack />
            </button>

            <div className="paginator-numbers">
                {pages.map((pageNum, idx) => (
                    <button
                        key={`${pageNum}-${idx}`}
                        className={`paginator-item ${variant} ${pageNum === page ? 'active' : ''} ${pageNum === '...' ? 'dots' : ''}`}
                        onClick={() => handlePageClick(pageNum)}
                        disabled={pageNum === '...'}
                        aria-current={pageNum === page ? 'page' : undefined}
                        data-value={pageNum}
                    >
                        {pageNum}
                    </button>
                ))}
            </div>

            <button 
                className={`paginator-item ${variant} ${page === numPages ? 'disabled' : ''}`}
                onClick={() => handlePageClick(page + 1)}
                disabled={page === numPages}
                aria-label='next_page'
            >
                <IoIosArrowForward />
            </button>

            {showEdges && (
                <button 
                    className={`paginator-item ${variant} ${page === numPages ? 'disabled' : ''}`}
                    onClick={() => handlePageClick(numPages)}
                    disabled={page === numPages}
                    aria-label='last_page'
                >
                    <IoIosArrowForward className="paginator-double-arrow" />
                    <IoIosArrowForward className="paginator-double-arrow negative-margin" />
                </button>
            )}
        </nav>
    )
}

export default Paginator
