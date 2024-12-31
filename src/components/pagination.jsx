import * as React from "react";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export function PaginationDemo({ pageNumber, setPageNumber, totalPages }) {
    console.log(pageNumber)
    return (
        <div className="pagination-container">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <button disabled={pageNumber === 0}>
                            <PaginationPrevious onClick={() => setPageNumber((prev) => prev - 9)} />
                        </button>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink>{(pageNumber / 9) + 1}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <button disabled={(pageNumber / 9) + 1 >= totalPages}>
                            <PaginationNext onClick={() => setPageNumber((prev) => prev + 9)} />
                        </button>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
