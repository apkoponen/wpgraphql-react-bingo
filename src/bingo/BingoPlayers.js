import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const BINGO_QUERY = gql`
  query Bingo($title: String!) {
    bingoGames(where: { title: $title }) {
      edges {
        node {
          id
          players {
            id
            title
            team {
              title
            }
          }
        }
      }
    }
  }
`;

export default function Bingo({ title }) {
  const { loading, error, data } = useQuery(BINGO_QUERY, {
    variables: { title },
    skip: !title,
    pollInterval: 5000
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const bingoGame = data.bingoGames.edges[0].node;

  return (
    <div className="BingoPlayers">
      <h3>Players</h3>
      {bingoGame.players &&
        bingoGame.players.map(player => (
          <div key={player.id}>
            {player.title} / {player.team && player.team.title}
          </div>
        ))}
    </div>
  );
}
