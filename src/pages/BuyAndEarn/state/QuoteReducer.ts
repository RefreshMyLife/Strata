import { useEffect, useReducer, useRef } from "react";

type Side = "from" | "to";
type Token = { symbol: string; address: string };

type State = {
  tokenFrom: Token;
  tokenTo: Token;
  editedSide: Side;
  inputAmount: number;
  rateFromTo: number | null; // TO per 1 FROM
  isLoadingFrom: boolean;
  isLoadingTo: boolean;
  error: string | null;
};

type Action =
  | { type: "SET_FROM_AMOUNT"; value: number }
  | { type: "SET_TO_AMOUNT"; value: number }
  | { type: "SET_FROM_TOKEN"; token: Token }
  | { type: "SET_TO_TOKEN"; token: Token }
  | { type: "SWAP_TOKENS" }
  | { type: "QUOTE_START"; side: Side }
  | { type: "QUOTE_SUCCESS"; rateFromTo: number }
  | { type: "QUOTE_ERROR"; message: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_FROM_AMOUNT":
      return {
        ...state,
        editedSide: "from",
        inputAmount: action.value,
        error: null,
      };
    case "SET_TO_AMOUNT":
      return {
        ...state,
        editedSide: "to",
        inputAmount: action.value,
        error: null,
      };
    case "SET_FROM_TOKEN":
      return { ...state, tokenFrom: action.token };
    case "SET_TO_TOKEN":
      return { ...state, tokenTo: action.token };
    case "SWAP_TOKENS":
      return {
        ...state,
        tokenFrom: state.tokenTo,
        tokenTo: state.tokenFrom,
        // keep editedSide & inputAmount; quote will refresh
      };
    case "QUOTE_START":
      return {
        ...state,
        error: null,
        isLoadingFrom: action.side === "from",
        isLoadingTo: action.side === "to",
      };
    case "QUOTE_SUCCESS":
      return {
        ...state,
        rateFromTo: action.rateFromTo,
        isLoadingFrom: false,
        isLoadingTo: false,
      };
    case "QUOTE_ERROR":
      return {
        ...state,
        error: action.message,
        isLoadingFrom: false,
        isLoadingTo: false,
      };
    default:
      return state;
  }
}

async function fetchQuote(from: Token, to: Token, amount: number, side: Side): Promise<number> {
  // return TO per 1 FROM
  return 1.2345;
}

export function useSwapReducer(initialFrom: Token, initialTo: Token) {
  const [state, dispatch] = useReducer(reducer, {
    tokenFrom: initialFrom,
    tokenTo: initialTo,
    editedSide: "from",
    inputAmount: 0,
    rateFromTo: null,
    isLoadingFrom: false,
    isLoadingTo: false,
    error: null,
  });

  // Avoid races
  const seqRef = useRef(0);

  // Drive quotes
  useEffect(() => {
    if (state.inputAmount <= 0) {
      dispatch({ type: "QUOTE_SUCCESS", rateFromTo: 0 });
      return;
    }

    const seq = ++seqRef.current;
    dispatch({ type: "QUOTE_START", side: state.editedSide });

    (async () => {
      try {
        const rate = await fetchQuote(
          state.editedSide === "from" ? state.tokenFrom : state.tokenTo,
          state.editedSide === "from" ? state.tokenTo : state.tokenFrom,
          state.inputAmount,
          state.editedSide
        );
        if (seq !== seqRef.current) return;
        dispatch({ type: "QUOTE_SUCCESS", rateFromTo: rate });
      } catch (e: any) {
        if (seq !== seqRef.current) return;
        dispatch({ type: "QUOTE_ERROR", message: e?.message ?? "Quote failed" });
      }
    })();
  }, [state.tokenFrom, state.tokenTo, state.inputAmount, state.editedSide]);

  // Selectors: compute displayed amounts on read
  const amountFrom =
    state.editedSide === "from"
      ? state.inputAmount
      : state.rateFromTo && state.rateFromTo !== 0
      ? state.inputAmount / state.rateFromTo
      : 0;

  const amountTo =
    state.editedSide === "to"
      ? state.inputAmount
      : state.rateFromTo
      ? state.inputAmount * state.rateFromTo
      : 0;

  // Public API
  const setFromAmount = (v: number) => dispatch({ type: "SET_FROM_AMOUNT", value: v });
  const setToAmount = (v: number) => dispatch({ type: "SET_TO_AMOUNT", value: v });
  const setFromToken = (t: Token) => dispatch({ type: "SET_FROM_TOKEN", token: t });
  const setToToken = (t: Token) => dispatch({ type: "SET_TO_TOKEN", token: t });
  const swapTokens = () => dispatch({ type: "SWAP_TOKENS" });

  return {
    // display
    tokenFrom: state.tokenFrom,
    tokenTo: state.tokenTo,
    amountFrom,
    amountTo,
    isLoadingFrom: state.isLoadingFrom,
    isLoadingTo: state.isLoadingTo,
    error: state.error,
    // actions
    setFromAmount,
    setToAmount,
    setFromToken,
    setToToken,
    swapTokens,
  };
}
