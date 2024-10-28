import { Button } from "./ui/button";

const Pagination: React.FC<{ currentPage: number; totalPages: number; onPageChange: (page: number) => void }> = ({ currentPage, totalPages, onPageChange }) => (
    <div className="flex justify-center mt-8 space-x-2">
        {[...Array(totalPages)].map((_, i) => (
            <Button
                key={i}
                variant={currentPage === i + 1 ? "default" : "outline"}
                onClick={() => onPageChange(i + 1)}
            >
                {i + 1}
            </Button>
        ))}
    </div>
)
export default Pagination;