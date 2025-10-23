import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { content as staticContent } from '../data/content';

// Define types based on data/content.ts structure
type Company = { name: string; logo: string; };
type About = { title: string; description: string; image: string; };
type Service = { id: string; title: string; description: string; href: string; icon: string; image: string; };
type Contact = { title: string; subtitle: string; email: string; phone: string; };
type Magnet = { title: string; subhead: string; image: string; };
type FAQ = { id: string; question: string; answer: string; };
type Expert = { name: string; title: string; image: string; bio: string; cta: string; };

export interface Content {
  company: Company;
  about: About;
  services: Service[];
  contact: Contact;
  magnet: Magnet;
  faqs: FAQ[];
  expert: Expert;
}

// --- Mock API Fetcher ---
// In a real app, this would be an actual API call (e.g., to Contentful, Sanity)
const fetchContent = (): Promise<Content> => {
  return new Promise(resolve => {
    // Simulate network delay
    setTimeout(() => {
      resolve(staticContent);
    }, 500); // 0.5 second delay
  });
};

// --- React Context Definition ---
interface ContentContextType {
  content: Content | null;
  isLoading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [content, setContent] = useState<Content | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchContent().then(data => {
            setContent(data);
            setIsLoading(false);
        });
    }, []);

    const value = { content, isLoading };

    return (
        <ContentContext.Provider value={value}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = (): ContentContextType => {
    const context = useContext(ContentContext);
    if (!context) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
};
