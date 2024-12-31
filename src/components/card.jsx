import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

export function CardWithForm({ data, totalPages }) {
    return (
        <>
            {data?.map((pokemon) => {
                return (
                    <Link to={`/single/${pokemon.id}`} key={pokemon.id}>
                        <Card className="card-container"  >
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
