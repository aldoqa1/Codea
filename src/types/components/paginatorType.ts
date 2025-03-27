import { ColorsType } from "./../globalType";

export type PaginatorProps = {
    lastPage : number
    currentPage: number
    setCurrentPage:React.Dispatch<React.SetStateAction<number>>
    colors: ColorsType
}