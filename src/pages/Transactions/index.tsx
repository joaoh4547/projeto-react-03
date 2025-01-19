import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { PricingHighlight, TransactionsContainer, TransactionsTable } from "./styles";

export function Transactions(){
    return (
        <div>
            <Header />
            <Summary/>
            <TransactionsContainer>
                <TransactionsTable>
                    <tbody>
                        <tr>
                            <td width="40%">Desenvolvimento de site</td>
                            <td>
                                <PricingHighlight variant="income">R$ 12.000,00</PricingHighlight>
                            </td>
                            <td>Venda</td>
                            <td>13/04/2022</td>
                        </tr>
                        <tr>
                            <td width="40%">Hambúrguer</td>
                            <td>
                                <PricingHighlight variant="outcome">-R$ 59,00</PricingHighlight></td>
                            <td>Alimentação</td>
                            <td>10/04/2022</td>
                        </tr>
                    </tbody>
                </TransactionsTable>
            </TransactionsContainer>
        </div>
    );
}