interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  const titleColor = light ? "text-white" : "text-charcoal";
  const subtitleColor = light ? "text-white/70" : "text-muted";
  const eyebrowColor = light ? "text-sage-green" : "text-forest-green";

  return (
    <div className={`max-w-2xl mb-14 ${alignment}`}>
      {eyebrow && (
        <p
          className={`font-outfit text-sm font-semibold uppercase tracking-widest mb-3 ${eyebrowColor}`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-cormorant text-display-md font-semibold leading-tight mb-4 ${titleColor}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`font-outfit text-base leading-relaxed ${align === "left" ? "text-justify" : ""} ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
      <div
        className={`mt-5 h-px w-16 ${align === "center" ? "mx-auto" : ""} bg-forest-green`}
      />
    </div>
  );
}