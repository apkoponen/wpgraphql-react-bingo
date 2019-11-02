import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useHistory } from "react-router-dom";

const ADD_PLAYER = gql`
  mutation addPlayerToBingo(
    $playerTitle: String!
    $teamTitle: String!
    $gameTitle: String!
  ) {
    addPlayerToBingo(
      input: {
        clientMutationId: ""
        playerTitle: $playerTitle
        teamTitle: $teamTitle
        gameTitle: $gameTitle
      }
    ) {
      gameTitle
    }
  }
`;

export default function Home() {
  const [state, setState] = useState({
    playerTitle: "",
    teamTitle: "",
    gameTitle: ""
  });
  const history = useHistory();
  const [addPlayer, { error, loading, data }] = useMutation(ADD_PLAYER);
  useEffect(() => {
    console.log(data);
    if (data && data.addPlayerToBingo && data.addPlayerToBingo.gameTitle) {
      history.push(`/bingo/${data.addPlayerToBingo.gameTitle}`);
    }
  }, [data, history]);

  return (
    <div>
      <h2>Welcome to Bingo!</h2>
      <div>
        {loading && <p>Loading...</p>}
        {error && (
          <div>
            {error.graphQLErrors.map((error, index) => (
              <div key={index} className="Home__error">
                {error.message}
              </div>
            ))}
          </div>
        )}
        {!loading && (
          <form
            className="Home__form"
            onSubmit={event => {
              event.preventDefault();
              const { playerTitle, teamTitle, gameTitle } = event.target;
              const state = {
                playerTitle: playerTitle.value,
                teamTitle: teamTitle.value,
                gameTitle: gameTitle.value
              };
              setState(state);
              addPlayer({
                variables: state
              });
            }}
          >
            <label>
              Name:{" "}
              <input name="playerTitle" defaultValue={state.playerTitle} />
            </label>
            <label>
              Team name:{" "}
              <input name="teamTitle" defaultValue={state.teamTitle} />
            </label>
            <label>
              Game name:{" "}
              <input name="gameTitle" defaultValue={state.gameTitle} />
            </label>
            <button>Join!</button>
          </form>
        )}
      </div>
    </div>
  );
}
