import { useContext } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PricingHighlight, TransactionsContainer, TransactionsTable } from "./styles";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formater";



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
                                            {priceFormatter.format(transaction.type === "outcome" ? transaction.price * -1: transaction.price)}
                                        </PricingHighlight>
                                    </td>
                                    <td>{transaction.category}</td>
                                    <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </TransactionsTable>
            </TransactionsContainer>
        </div>
    );
}