export type FeatureIcon = {
  className?: string;
};

export interface Feature {
  title: string;
  description: string;
  icon: (props: FeatureIcon) => JSX.Element;
  gradient: {
    from: string;
    to: string;
  };
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: {
    text: string;
    variant: "primary" | "secondary" | "outline";
  };
  popular?: boolean;
}

export interface CompanyLogo {
  name: string;
  icon: JSX.Element;
}
