import React, { createContext, useState, useContext } from 'react';

interface UserContextType {
    user: {
        username: string;
        email: string;
        phone:String;
        role: string;
    };
    setUser: React.Dispatch<React.SetStateAction<{
        username: string;
        email: string;
        phone:String;
        role: string;
    }>>;
}

const UserContext = createContext<UserContextType | null>(null);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState({
        role: '',
        username: '',
        phone:'',
        email: '',
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === null) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};

export { UserContext, UserProvider, useUserContext };