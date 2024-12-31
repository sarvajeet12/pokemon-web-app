# Pokémon Web App

This is a Pokémon web application built with React, React Router, and React Query. It fetches data from the Pokémon API and displays a list of Pokémon with pagination. Users can view detailed information about individual Pokémon.

## Features

- Fetch and display a list of Pokémon with pagination.
- View detailed information about individual Pokémon.
- Error handling for failed API requests.
- Responsive design using Tailwind CSS.
- Pagination with total pages handling.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/pokemon-web-app.git
    cd pokemon-web-app
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

## Project Structure

```
pokemon-web-app/
├── src/
│   ├── components/
│   ├── pages/
│   ├── service/
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── router.jsx
├── .gitignore
├── package.json
├── README.md
```

## API Integration

The app uses the Pokémon API to fetch data. The API integration is handled in the `src/service` directory.

### API Connector

The `api-connector.jsx` file contains a reusable function for making API requests using Axios.

```jsx
// filepath: /d:/Web Developer/Web D Project/Project/Cmpy Project/pokemon web app/src/service/api-connector.jsx
import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = async (method, url, bodyData, headers, params) => {
    try {
        const response = await axiosInstance({
            method,
            url,
            data: bodyData ? bodyData : null,
            headers: headers ? headers : null,
            params: params ? params : null
        });
        return response;
    } catch (error) {
        throw error;
    }
};
```

### Operations

The `operations.jsx` file contains functions for fetching Pokémon data.

```jsx
// filepath: /d:/Web Developer/Web D Project/Project/Cmpy Project/pokemon web app/src/service/operations.jsx
import { pokemonData } from "./api";
import { apiConnector } from "./api-connector";

export const getPokemonData = async (pageNumber) => {
    try {
        const response = await apiConnector("GET", `${pokemonData.DATA_API}/pokemon?offset=${pageNumber}&limit=9`);
        if (response.status === 200) {
            const detailedPokemonData = response.data.results.map(async (currPokemon) => {
                const resp = await apiConnector("GET", currPokemon.url);
                return resp.data;
            });
            const detailedResponses = await Promise.all(detailedPokemonData);
            return detailedResponses;
        } else {
            throw new Error("Failed to fetch Pokémon data. Server responded with a status other than 200.");
        }
    } catch (error) {
        throw new Error(`Error while fetching Pokémon data: ${error.message}`);
    }
};

export const getIndiPokemonData = async (id) => {
    try {
        const response = await apiConnector("GET", `${pokemonData.DATA_API}/pokemon/${id}`);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Failed to fetch Pokémon data. Server responded with a status other than 200.");
        }
    } catch (error) {
        throw new Error(`Error while fetching Pokémon data: ${error.message}`);
    }
};
```

## Routing

The app uses React Router for navigation. The routes are defined in the `router.jsx` file.

```jsx
// filepath: /d:/Web Developer/Web D Project/Project/Cmpy Project/pokemon web app/src/router.jsx
import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Error from "./pages/error.jsx";
import Home from "./pages/home.jsx";
import Individual from "./pages/individual.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/single/:id", element: <Individual /> },
            { path: "*", element: <Error /> },
        ],
    },
]);
```

## Pages

### Home Page

The home page displays a list of Pokémon with pagination.

```jsx
// filepath: /d:/Web Developer/Web D Project/Project/Cmpy Project/pokemon web app/src/pages/home.jsx
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getPokemonData } from "../service/operations";
import { CardWithForm } from "../components/card";
import { PaginationDemo } from "../components/pagination";

const Home = () => {
    const [pageNumber, setPageNumber] = useState(0);

    const { data, isPending, isError, error } = useQuery({
        queryKey: ["data", pageNumber],
        queryFn: () => getPokemonData(pageNumber),
    });

    if (isPending)
        return <p style={{ textAlign: "Center", fontSize: "4rem" }}>Loading...</p>;
    if (isError) return <p>Error : {error.message || "Something went wrong!"}</p>;

    return (
        <>
            <div className="pokemon-container">
                <CardWithForm data={data} />
            </div>
            <PaginationDemo pageNumber={pageNumber} setPageNumber={setPageNumber} />
        </>
    );
};

export default Home;
```

### Individual Pokémon Page

The individual Pokémon page displays detailed information about a selected Pokémon.

```jsx
// filepath: /d:/Web Developer/Web D Project/Project/Cmpy Project/pokemon web app/src/pages/individual.jsx
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useParams } from "react-router-dom";
import { getIndiPokemonData } from "../service/operations";
import { useQuery } from "@tanstack/react-query";

const Individual = () => {
    const { id } = useParams();

    const { data, isPending, isError, error } = useQuery({
        queryKey: ["data", id],
        queryFn: () => getIndiPokemonData(id),
    });

    if (isPending)
        return <p style={{ textAlign: "Center", fontSize: "4rem" }}>Loading...</p>;
    if (isError) return <p>Error : {error.message || "Something went wrong!"}</p>;

    return (
        <>
            {data && (
                <Card className="indi-card-container" key={data.id}>
                    <CardContent className="indi-card-content">
                        <div>
                            <img src={data.sprites.other.dream_world.front_default} alt={data.name} />
                        </div>
                        <div>
                            <p><span>Name: </span><span>{data.name}</span></p>
                            <p><span>Type: </span><span>{data.types.map((currType) => currType.type.name).join(", ")}</span></p>
                            <p><span>Height: </span><span>{data.height}</span></p>
                            <p><span>Weight: </span><span>{data.weight}</span></p>
                            <p><span>Speed: </span><span>{data.stats[5].base_stat}</span></p>
                            <p><span>Attack: </span><span>{data.stats[1].base_stat}</span></p>
                            <p><span>Experience: </span><span>{data.base_experience}</span></p>
                            <p><span>Abilities: </span><span>{data.abilities.map((currAbility) => currAbility.ability.name).slice(0, 1).join(", ")}</span></p>
                        </div>
                    </CardContent>
                </Card>
            )}
            <Link to={"/"}><Button style={{ padding: "2rem 1rem", fontSize: "1.3rem" }}>Back</Button></Link>
        </>
    );
};

export default Individual;
```

### Error Page

The error page displays a 404 message for undefined routes.

```jsx
// filepath: /d:/Web Developer/Web D Project/Project/Cmpy Project/pokemon web app/src/pages/error.jsx
import React from 'react';

const Error = () => {
    return (
        <div className='error-page'>
            <h1>404</h1>
            <h2>Page not found</h2>
        </div>
    );
};

export default Error;
```

## Styling

The app uses Tailwind CSS for styling. The styles are defined in the `index.css` file.

### Using Tailwind CSS

Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without writing CSS. To use Tailwind CSS in this project:

1. Install Tailwind CSS:
    ```bash
    npm install -D tailwindcss
    npx tailwindcss init
    ```

2. Configure Tailwind CSS by adding the paths to all of your template files in the `tailwind.config.js` file:
    ```js
    // tailwind.config.js
    module.exports = {
      content: [
        "./src/**/*.{js,jsx,ts,tsx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }
    ```

3. Add the Tailwind directives to your CSS file:
    ```css
    /* filepath: /d:/Web Developer/Web D Project/Project/Cmpy Project/pokemon web app/src/index.css */
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

### Using ShadCN UI

ShadCN UI is a component library that provides a set of reusable UI components. To use ShadCN UI in this project:

1. Install ShadCN UI:
    ```bash
    npm install @shadcn/ui
    ```

2. Import and use ShadCN UI components in your React components:
    ```jsx
    // Example usage in a React component
    import { Button } from "@shadcn/ui";

    const MyComponent = () => {
      return (
        <Button>
          Click Me
        </Button>
      );
    };

    export default MyComponent;
    ```

## Main Entry Point

The main entry point of the app is defined in the `main.jsx` file.

```jsx
// filepath: /d:/Web Developer/Web D Project/Project/Cmpy Project/pokemon web app/src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./router";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
```

## Components

### PaginationDemo

The `PaginationDemo` component handles pagination logic.

```jsx
import * as React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export function PaginationDemo({ pageNumber, setPageNumber, totalPages }) {
    return (
        <div className="pagination-container">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <button disabled={pageNumber === 0}>
                            <PaginationPrevious onClick={() => setPageNumber((prev) => prev - 9)} />
                        </button>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink>{(pageNumber / 9) + 1}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <button disabled={(pageNumber / 9) + 1 >= totalPages}>
                            <PaginationNext onClick={() => setPageNumber((prev) => prev + 9)} />
                        </button>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
```

### CardWithForm

The `CardWithForm` component displays a list of Pokémon cards.

```jsx
import * as React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

export function CardWithForm({ data, totalPages }) {
    return (
        <>
            {data?.map((pokemon) => {
                return (
                    <Link to={`/single/${pokemon.id}`} key={pokemon.id}>
                        <Card className="card-container">
                            <CardContent className="card-content">
                                <img
                                    src={pokemon.sprites.other.dream_world.front_default}
                                    alt={pokemon.name}
                                />
                                <p>{pokemon.id}</p>
                                <h1>{pokemon.name}</h1>
                            </CardContent>
                        </Card>
                    </Link>
                );
            })}
        </>
    );
}
```


## License

This project is licensed under the MIT License.
