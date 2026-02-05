export interface IPolicyHolderInfoProps {}

const details = [
  { label: "Beneficiary", value: "John Doe" },
  { label: "Age", value: "48" },
  { label: "postalCode", value: "7090-00100" },
];

export default function PolicyHolderInfo(props: IPolicyHolderInfoProps) {
  return (
    <div className="flex items-center justify-center gap-2.5 ml-8">
      {details.map(({ label, value }) => (
        <div
          key={label}
          className="flex items-center justify-center border-r last:border-r-0 pr-4"
        >
          <p className="uppercase text-xs text-muted-foreground mr-1">
            {label}:
          </p>
          <p className="text-xs font-semibold">{value}</p>
        </div>
      ))}
    </div>
  );
}
