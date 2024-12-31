import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getPokemonData } from "../service/operations";
import { CardWithForm } from "../components/card";
import { PaginationDemo } from "../components/pagination";

const Home = () => {
    // fetching data from api

    const [pageNumber, setPageNumber] = useState(0);


    const { data, isPending, isError, error } = useQuery({
        queryKey: ["data",pageNumber],
        queryFn: () => getPokemonData(pageNumber),
    });


    if (isPending)
        return <p style={{ textAlign: "Center", fontSize: "4rem" }}>Loading...</p>;
    if (isError) return <p>Error : {error.message || "Something went wrong!"}</p>;

    return (
        <>
            <div className="pokemon-container">
                <CardWithForm data={data} />{" "}
            </div>{" "}
            <PaginationDemo pageNumber={pageNumber} setPageNumber={setPageNumber} />
        </>
    );
};

export default Home;
