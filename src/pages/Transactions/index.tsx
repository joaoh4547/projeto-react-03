import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PricingHighlight, TransactionsContainer, TransactionsTable } from "./styles";

interface Transaction{
    id: number;
    description: string;
    type: "income" | "outcome";
    price: number;
    category: string;
    createdAt: string;
}

export function Transactions(){

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
        <div>
            <Header />
            <Summary/>
            <TransactionsContainer>
                <SearchForm />
                <TransactionsTable>
                    <tbody>
                        {
                            transactions.map(transaction => (
                                <tr key={transaction.id}>
                                    <td width="50%">{transaction.description}</td>
                                    <td>
                                        <PricingHighlight variant={transaction.type}>
                                            {`R$ ${transaction.type === "outcome" ? "-" :""}${transaction.price.toFixed(2)}`}
                                        </PricingHighlight>
                                    </td>
                                    <td>{transaction.category}</td>
                                    <td>{new Date(transaction.createdAt).toLocaleString()}</td>
                                </tr>
                            ))
                        }

                    </tbody>
                </TransactionsTable>
            </TransactionsContainer>
        </div>
    );
}