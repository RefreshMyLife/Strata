import { useEffect, useMemo, useRef, useState } from "react";
import { QuoteService } from 'src/services/QuoteService';
import { Token } from 'src/types';
import { NumberUtil } from 'src/utilities/NumberUtilt';


export function useQuoteState(initialFrom: Token, initialTo: Token) {
  // source-of-truth inputs
  const [tokenFrom, setTokenFrom] = useState<Token>(initialFrom);
  const [tokenTo, setTokenTo] = useState<Token>(initialTo);
  const [editedSide, setEditedSide] = useState<QuoteService.Side>("from");
  const [inputAmount, setInputAmount] = useState<number>(0);

  // async quote state
  const [quote, setQuote] = useState<QuoteService.Quote | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // prevent stale overwrites
  const seqRef = useRef(0);

  // Trigger quote when any driver changes
  useEffect(() => {
    if (inputAmount <= 0 || inputAmount == null) {
      setQuote(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    const seq = ++seqRef.current;
    setIsLoading(true);
    setError(null);

    (async () => {
      try {
        const q = await QuoteService.getQuote(
          editedSide === "from" ? tokenFrom : tokenTo,
          editedSide === "from" ? tokenTo : tokenFrom,
          inputAmount,
          editedSide
        );
        if (seq !== seqRef.current) return; // stale
        setQuote(q);
        setIsLoading(false);
      } catch (e: any) {
        console.error(`Quote failed`, e);
        if (seq !== seqRef.current) return;
        setError(e?.message ?? "Failed to fetch quote");
        setIsLoading(false);
      }
    })();
  }, [tokenFrom, tokenTo, inputAmount, editedSide]);

  // Derived displayed amounts
  const amountFrom = useMemo(() => {
    if (editedSide === "from") return inputAmount;
    if (!quote) return 0;
    // invert if the user typed on "to"
    return NumberUtil.round(inputAmount / quote.rateFromTo, 8);
  }, [editedSide, inputAmount, quote]);

  const amountTo = useMemo(() => {
    if (editedSide === "to") return inputAmount;
    if (!quote) return 0;
    return NumberUtil.round(inputAmount * quote.rateFromTo, 8);
  }, [editedSide, inputAmount, quote]);

  // Public API for inputs
  const setFromAmount = (v: number) => {
    setEditedSide("from");
    setInputAmount(v);
  };

  const setToAmount = (v: number) => {
    setEditedSide("to");
    setInputAmount(v);
  };

  const setFromToken = (t: Token) => setTokenFrom(t);
  const setToToken = (t: Token) => setTokenTo(t);

  const swapTokens = () => {
    setTokenFrom(tokenTo);
    setTokenTo(tokenFrom);
    // keep the same edited side & inputAmount; quotes will refresh
  };

  return {
    // state to show
    tokenFrom,
    tokenTo,
    amountFrom,
    amountTo,
    isLoading,
    error,
    // setters you call from UI
    setFromAmount,
    setToAmount,
    setFromToken,
    setToToken,
    swapTokens,
  };
}
