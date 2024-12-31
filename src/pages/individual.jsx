import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
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
        <>{
            data && (
                <Card className="indi-card-container" key={data.id}>
                    <CardContent className="indi-card-content">
                        <div>
                            <img
                                src={data.sprites.other.dream_world.front_default}
                                alt={data.name}
                            />
                        </div>
                        <div>
                            <p>
                                <span>Name: </span>
                                <span>{data.name}</span>
                            </p>
                            <p>
                                <span>Type: </span>
                                <span>
                                    {data.types
                                        .map((currType, index) => currType.type.name)
                                        .join(", ")}
                                </span>
                            </p>
                            <p>
                                <span>Height: </span>
                                <span>{data.height}</span>
                            </p>
                            <p>
                                <span>Weight: </span>
                                <span>{data.weight}</span>
                            </p>
                            <p>
                                <span>Speed: </span>
                                <span>{data.stats[5].base_stat}</span>
                            </p>
                            <p>
                                <span>Attack: </span>
                                <span>{data.stats[1].base_stat}</span>
                            </p>
                            <p>
                                <span>Experience: </span>
                                <span>{data.base_experience}</span>
                            </p>

                            <p>
                                <span>Abilities: </span>
                                <span>
                                    {data.abilities
                                        .map((currAbility) => currAbility.ability.name)
                                        .slice(0, 1)
                                        .join(", ")}
                                </span>
                            </p>
                        </div>
                    </CardContent>

                </Card>
            )
        }
            <Link to={"/"}><Button style={{ padding: "2rem 1rem", fontSize: "1.3rem" }}>Back</Button></Link>

        </>
    );
};
export default Individual;
