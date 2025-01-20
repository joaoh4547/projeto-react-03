import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { TransactionsContext } from "../../contexts/TransactionsContext";

const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(["income", "outcome"])
});

type NewTransactionFormSchema = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal(){
    const {createTransaction} = useContext(TransactionsContext);
    const {register,handleSubmit, formState:{isSubmitting}, control, reset} = useForm<NewTransactionFormSchema>({
        resolver: zodResolver(newTransactionFormSchema),
        defaultValues:{
            type: "income",
            price: 0,
            description: "",
            category: "",
        }
    });

    async function handleCreateNewTransaction(data: NewTransactionFormSchema){
        await createTransaction(data);
        reset();
    }

    return (
        <Dialog.Portal>
            <Overlay />
            <Content>
                <Dialog.Title>
                    Nova Transação
                </Dialog.Title>
                <CloseButton>
                    <X size={24} />
                </CloseButton>
                <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                    <input 
                        type="text" 
                        placeholder="Descrição" 
                        required
                        {...register("description")}
                    />
                    <input 
                        type="number" 
                        placeholder="Preço" 
                        required
                        {...register("price", {valueAsNumber: true})}
                    />
                    <input 
                        type="text" 
                        placeholder="Categoria" 
                        required
                        {...register("category")}
                    />

                    <Controller 
                        control={control}
                        name="type"
                        render={({field}) =>(
                            <TransactionType onValueChange={field.onChange} value={field.value}>
                                <TransactionTypeButton value="income" variant="income">
                                    <ArrowCircleUp size={24} />
                                    Entrada
                                </TransactionTypeButton>
                                <TransactionTypeButton value="outcome" variant="outcome">
                                    <ArrowCircleDown size={24} />
                                    Saida
                                </TransactionTypeButton>
                            </TransactionType>
                        )}
                    />
                    
                    <button type="submit" disabled={isSubmitting}>Cadastrar</button>
                </form>
                
            </Content>
        </Dialog.Portal>
    );
}