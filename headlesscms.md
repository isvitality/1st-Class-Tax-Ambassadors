# Guide: Migrating a Static React Site to a Headless CMS

This document outlines the process of converting a hard-coded React application into a dynamic site powered by a headless Content Management System (CMS). This allows clients to update website content themselves through a user-friendly interface without needing to touch the code.

The process is broken down into two main phases:
1.  **Architectural Refactoring**: Preparing the codebase to consume data from any API.
2.  **CMS Integration**: Connecting the refactored app to a live headless CMS.

---

## Phase 1: Architectural Refactoring (Decoupling Content)

The goal of this phase is to remove all direct dependencies on static data files (like `data/content.ts`) from your components. Instead, components will receive data from a central, shared source. We've already completed this phase in our application.

### Step 1: Create a Central Content Hub (`ContentContext`)

We create a React Context to act as a single source of truth for all website content. This context will be responsible for fetching, storing, and providing the content to any component that needs it.

**Key Files:** `contexts/ContentContext.tsx`

**Implementation Details:**
1.  **Define Data Structure**: Create TypeScript interfaces that precisely match the structure of your content. This ensures type safety throughout the application.
    ```typescript
    // in contexts/ContentContext.tsx
    export interface Content {
      company: { name: string; logo: string; };
      about: { title: string; description: string; };
      services: { id: string; title: string; description: string; }[];
      // ... and so on for all content
    }
    ```
2.  **Create the Context & Provider**: Set up the standard React Context, Provider component, and a custom hook (`useContent`) for easy access.
    ```typescript
    // in contexts/ContentContext.tsx
    interface ContentContextType {
      content: Content | null;
      isLoading: boolean;
    }

    const ContentContext = createContext<ContentContextType | undefined>(undefined);

    export const ContentProvider = ({ children }) => {
      // ...fetching logic here...
      return (
        <ContentContext.Provider value={{ content, isLoading }}>
          {children}
        </ContentContext.Provider>
      );
    };

    export const useContent = () => {
      // ...context consumer logic...
    };
    ```

### Step 2: Simulate an API Call and Loading State

Inside the `ContentProvider`, we replace the static import with a function that simulates fetching data from an external source. It's crucial to manage a `isLoading` state to handle the delay.

```typescript
// in contexts/ContentContext.tsx

// This function simulates fetching from a CMS
const fetchContent = (): Promise<Content> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(staticContent); // `staticContent` is imported from our old data file
    }, 500); // 0.5s delay
  });
};

// Inside the ContentProvider component:
const [content, setContent] = useState<Content | null>(null);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
    fetchContent().then(data => {
        setContent(data);
        setIsLoading(false);
    });
}, []);
```

### Step 3: Wrap the Application

In your main entry point file (`index.tsx`), wrap the entire application with the `ContentProvider`. This makes the context available to all components.

```tsx
// in index.tsx
root.render(
  <React.StrictMode>
    <ContentProvider>
      <App />
    </ContentProvider>
  </React.StrictMode>
);
```

### Step 4: Implement a Global Loading Indicator

In `App.tsx`, use the `isLoading` state from our context to show a loading screen. This prevents the site from rendering with missing content and improves the user experience.

```tsx
// in App.tsx
import { useContent } from './contexts/ContentContext';

const App: React.FC = () => {
  const { isLoading } = useContent();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    // ... rest of the app layout ...
  );
};
```

### Step 5: Refactor Components to Use the Context

Go through every component that uses static data and refactor it to pull from the `useContent` hook.

**Example: `About.tsx`**

*   **Before:**
    ```tsx
    import { content } from '../data/content';

    const About = () => {
      return <h2>{content.about.title}</h2>;
    }
    ```
*   **After:**
    ```tsx
    import { useContent } from '../contexts/ContentContext';

    const About = () => {
      const { content } = useContent();

      // It's important to handle the case where content might still be loading
      if (!content) return null;

      return <h2>{content.about.title}</h2>;
    }
    ```

---

## Phase 2: Integrating a Real Headless CMS

Now that the app architecture is ready, plugging in a real CMS is straightforward.

### Step 1: Choose and Set Up a CMS Provider

There are many excellent options, most with generous free tiers.

*   **Contentful**: Extremely user-friendly, great for structured content.
*   **Sanity.io**: Highly customizable and developer-focused with a great real-time API.
*   **Strapi**: Open-source and self-hostable if you need full control.

**General Setup Process:**
1.  Sign up for the service of your choice.
2.  Create a new project or "space".
3.  Locate your **API Key** and **Space ID/Project ID**. Keep these secure.

### Step 2: Model Your Content in the CMS

Inside the CMS dashboard, you need to recreate the data structure we defined in our `Content` interface. You'll create "Content Models" or "Content Types".

*   Create a "Service" content type with fields for:
    *   `title` (Short Text)
    *   `description` (Long Text)
    *   `image` (Media/Image)
    *   `icon` (Short Text - e.g., you'd enter "DocumentIcon")
*   Create an "Expert" content type with fields for `name`, `title`, `image`, `bio`, etc.
*   Repeat this for all sections of your site (`About`, `FAQ`, `Company Info`).
*   Once the models are created, use the CMS interface to enter all the content from your original `data/content.ts` file.

### Step 3: Replace the Mock API with a Real Fetcher

This is the primary code change for this phase. You will update the `fetchContent` function in `ContentContext.tsx` to call the real CMS API.

```typescript
// in contexts/ContentContext.tsx - UPDATED

// Example using JavaScript's native fetch API
const CMS_API_URL = 'https://your-cms-provider.com/api/...';
const API_KEY = process.env.YOUR_CMS_API_KEY; // Stored securely

const fetchContent = async (): Promise<Content> => {
  const response = await fetch(CMS_API_URL, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`
    }
  });
  const data = await response.json();

  // IMPORTANT: You may need to transform the data from the CMS
  // to match the exact shape of your `Content` interface.
  const transformedData = transformApiData(data); // You'll write this function

  return transformedData;
};

// ... the rest of the context remains the same
```

### Step 4: Deployment and Automation

1.  **Environment Variables**: Your API key must be stored as an environment variable in your deployment platform (Vercel, Netlify, etc.), not hard-coded in the repository.
2.  **Webhooks**: To ensure your site shows the latest content, set up a "webhook" in your CMS. This webhook will trigger a new build and deployment of your site automatically whenever the client saves a change. This gives you the performance of a static site with the dynamism of a CMS.

By following this guide, you can create a robust, maintainable, and client-friendly website that separates content management from the presentation layer, which is a hallmark of modern web development.
