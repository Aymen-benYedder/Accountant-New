import {
  GaugeContainer,
  GaugeReferenceArc,
  GaugeValueArc,
  useGaugeState,
} from "@mui/x-charts/Gauge";

function GaugePointer({ color }: { color: string }) {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) {
    // No value to display
    return null;
  }

  const target = {
    x: cx + outerRadius * Math.sin(valueAngle),
    y: cy - outerRadius * Math.cos(valueAngle),
  };
  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill={color} />
      <path
        d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
        stroke={color}
        strokeWidth={3}
      />
    </g>
  );
}
export const CreditScoreChart = ({
  score,
  color,
  startAngle,
  endAngle,
}: {
  score: number;
  color: string;
  startAngle: number;
  endAngle: number;
}) => {
  return (
    <GaugeContainer
      width={250}
      height={150}
      startAngle={startAngle}
      endAngle={endAngle}
      value={score}
      sx={{
        m: "0 auto",
      }}
    >
      <GaugeReferenceArc />
      <GaugeValueArc />
      <GaugePointer color={color} />
    </GaugeContainer>
  );
};
