import { createContext, ReactNode, useEffect, useState } from "react";

interface Transaction{
    id: number;
    description: string;
    type: "income" | "outcome";
    price: number;
    category: string;
    createdAt: string;
}

interface TransactionContextData{
    transactions: Transaction[];
}

export const TransactionsContext = createContext({} as TransactionContextData);

interface TransactionsProviderProps{
    children: ReactNode;
}

export function TransactionsProvider({children}: TransactionsProviderProps) {

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    
    async function loadTransactions(){
        const response = await fetch("http://localhost:3000/transactions", );
        const data = await response.json();
        setTransactions(data);
    }
    
    useEffect(() =>{
        loadTransactions();
    },[]);


    return (
        <TransactionsContext.Provider value={{ transactions }}>
            {children}
        </TransactionsContext.Provider>
    );
}