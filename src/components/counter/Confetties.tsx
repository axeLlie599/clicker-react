import { useWindowSize } from "@react-hook/window-size";
import { useState, useRef, useEffect } from "react";
import Confetti from "react-confetti";
import useCounterStore from "../../stores/counter";

export default function ConfettiComponent() {
  const [windowWidth, windowHeight] = useWindowSize();
  const counter = useCounterStore();
  const [confetti, setConfetti] = useState(false);
  const confettiTimeout = useRef(0);

  // Customizable confetti options
  const confettiOptions = {
    probabilityFactor: 30, // Adjust for confetti frequency (lower = more frequent)
    maxAdditionalPieces: 600, // Maximum number of confetti pieces
    piecesPerCount: 3, // Pieces added per count
    durationMs: 1500, // Duration of confetti burst (milliseconds)
    velocityY: -40, // Initial vertical velocity (negative = upwards)
    gravityScale: 0.2, // Scale of gravity effect
    colors: [
      "#ffc0cb",
      "#ff4500",
      "#ff8c00",
      "#ffff00",
      "#90ee90",
      "#00ced1",
      "#dda0dd",
    ], // Example custom colors
  };

  useEffect(() => {
    const shouldTriggerConfetti = () => {
      const probability = Math.min(
        1,
        counter.count / confettiOptions.probabilityFactor
      );
      return Math.random() < probability;
    };

    if (counter.count > 0 && shouldTriggerConfetti()) {
      setConfetti(true);

      if (confettiTimeout.current) {
        clearTimeout(confettiTimeout.current);
      }

      confettiTimeout.current = setTimeout(() => {
        setConfetti(false);
      }, confettiOptions.durationMs);
    }

    return () => {
      if (confettiTimeout.current) {
        clearTimeout(confettiTimeout.current);
      }
    };
  }, [
    counter.count,
    confettiOptions.probabilityFactor,
    confettiOptions.durationMs,
  ]); // Add dependencies for options

  function calculateNumberOfPieces(count: number) {
    const basePieces = 100;
    const additionalPieces = Math.min(
      confettiOptions.maxAdditionalPieces,
      count * confettiOptions.piecesPerCount
    );
    return basePieces + additionalPieces;
  }

  return (
    <>
      {confetti && (
        <Confetti
          width={windowWidth}
          height={windowHeight}
          recycle={false}
          numberOfPieces={calculateNumberOfPieces(counter.count)}
          gravity={confettiOptions.gravityScale}
          initialVelocityY={confettiOptions.velocityY}
          colors={confettiOptions.colors} // Use custom colors
        />
      )}
    </>
  );
}
