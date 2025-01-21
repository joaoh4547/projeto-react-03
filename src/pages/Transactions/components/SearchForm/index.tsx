import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionsContext } from "../../../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

const searchFormSchema = z.object({
    query: z.string()
});

type SearchFormSchema = z.infer<typeof searchFormSchema>

export function SearchForm(){
    const {register, handleSubmit, formState: {isSubmitting}} = useForm<SearchFormSchema>({
        resolver: zodResolver(searchFormSchema)
    });

    const {fetchTransactions} = useContextSelector(TransactionsContext, (context) =>{
        return {
            fetchTransactions: context.fetchTransactions
        };
    });

    async function handleSearchTransitions(data: SearchFormSchema){
        await fetchTransactions(data.query);
    }

    return (
        <SearchFormContainer onSubmit={handleSubmit(handleSearchTransitions)}>
            <input 
                type="text" 
                placeholder="Busque por transações"
                {...register("query")}
            />
            <button type="submit" disabled={isSubmitting}>
                <MagnifyingGlass size={20} />
                Buscar
            </button>
        </SearchFormContainer>
    );
}