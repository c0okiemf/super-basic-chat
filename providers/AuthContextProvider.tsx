import { PropsWithChildren, createContext, useContext, useState } from 'react';

interface ContextType {
    userName: string | null;
    setUsername: (userName: string) => void;
}

// Create a context with a default value
const AuthContext = createContext<ContextType>({
    userName: null,
    setUsername: () => { },
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
}

export default function AuthContextProvider({ children }: PropsWithChildren) {
    const [userName, setUsername] = useState<string | null>(null);

    return (
        <AuthContext.Provider value={{ userName, setUsername }}>
            {children}
        </AuthContext.Provider>
    );
};
