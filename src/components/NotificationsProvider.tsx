'use client'
import { SnackbarProvider } from 'notistack';

interface Props {
    children: React.ReactNode
}

export default function NotificationsProvider({ children }: Props) {
    return <>
    <SnackbarProvider maxSnack={1} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={2500}>
        {children}
    </SnackbarProvider>
    </>;
}