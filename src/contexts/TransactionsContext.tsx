import { ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";

interface Transaction{
    id: number;
    description: string;
    type: "income" | "outcome";
    price: number;
    category: string;
    createdAt: string;
}

interface CreateTransactionData{
    description: string
    price: number;
    category: string;
    type: "income" | "outcome";
}

interface TransactionContextData{
    transactions: Transaction[];
    fetchTransactions: (query?: string) => Promise<void>
    createTransaction: (data: CreateTransactionData) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionContextData);

interface TransactionsProviderProps{
    children: ReactNode;
}

export function TransactionsProvider({children}: TransactionsProviderProps) {

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    
    async function fetchTransactions(query?: string){
        const response = await api.get<Transaction[]>("transactions",{
            params: {
                _sort: "createdAt",
                _order: "desc",
                q: query
            }
        });
        setTransactions(response.data);
    }

    async function createTransaction(data: CreateTransactionData){
        const {category,description,price,type} = data;
        const response = await api.post("transactions",{
            description,
            price,
            category,
            type,
            createdAt: new Date().toISOString()
        });
        setTransactions(prev => [...prev, response.data]);
    }
    
    useEffect(() =>{
        fetchTransactions();
    },[]);


    return (
        <TransactionsContext.Provider value={{ transactions,fetchTransactions,createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    );
}