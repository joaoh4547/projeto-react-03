import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import logoImage from "../../assets/logo.svg";
import * as Dialog from "@radix-ui/react-dialog";

export function Header(){
    return (
        <HeaderContainer>
            <HeaderContent>
                <img src={logoImage} alt="" />
                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <NewTransactionButton>Nova Transação</NewTransactionButton>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                        <Dialog.Overlay />
                        <Dialog.Content>
                            <Dialog.Title>
                                Nova Transação
                            </Dialog.Title>
                            <Dialog.Close/>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            </HeaderContent>
        </HeaderContainer>
    );
}