import { useContext } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PricingHighlight, TransactionsContainer, TransactionsTable } from "./styles";
import { TransactionsContext } from "../../contexts/TransactionsContext";



export function Transactions(){

    const {transactions} = useContext(TransactionsContext);
    

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