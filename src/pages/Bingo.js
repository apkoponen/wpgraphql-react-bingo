import React, { useState, useMemo } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useParams } from "react-router-dom";
import classnames from "classnames";
import { produce } from "immer";
import { generateGrid, checkGridForBingo } from "../bingo/bingoGame";
import BingoPlayers from "../bingo/BingoPlayers";

const BINGO_QUERY = gql`
  query Bingo($title: String!) {
    bingoGames(where: { title: $title }) {
      edges {
        node {
          id
          title
          words
        }
      }
    }
  }
`;

export default function Bingo() {
  const [grid, setGrid] = useState(null);
  const isBingo = useMemo(() => grid && checkGridForBingo(grid), [grid]);
  let { title } = useParams();

  const { loading, error, data } = useQuery(BINGO_QUERY, {
    variables: { title }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const bingoGame = data.bingoGames.edges[0].node;

  if (!grid) {
    setGrid(generateGrid(bingoGame.words));
    return <p>Loading...</p>;
  }

  return (
    <div className="Bingo">
      <h2>{bingoGame.title}</h2>
      <div className="Bingo__wrapper">
        {isBingo && (
          <div className="Bingo__winner">
            <div className="Bingo__winner-text">BINGO WINNER!!!</div>
          </div>
        )}
        <div className="Bingo__grid">
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="Bingo__row">
              {row.map((cell, cellIndex) => (
                <div
                  key={cell.word}
                  className={classnames("Bingo__cell", {
                    "Bingo__cell--selected": cell.selected
                  })}
                  onClick={() => {
                    const nextGrid = produce(grid, draftGrid => {
                      cell = draftGrid[rowIndex][cellIndex];
                      cell.selected = !cell.selected;
                    });
                    setGrid(nextGrid);
                  }}
                >
                  {cell.word}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <BingoPlayers title={title} />
    </div>
  );
}
