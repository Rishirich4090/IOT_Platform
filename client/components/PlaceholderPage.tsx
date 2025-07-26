import React from "react";
import { Construction, MessageCircle } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export function PlaceholderPage({
  title,
  description,
  icon: Icon = Construction,
}: PlaceholderPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
        <Icon className="w-8 h-8 text-primary" />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
        <p className="text-muted-foreground max-w-md">{description}</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 max-w-md">
        <div className="flex items-center gap-3 mb-3">
          <MessageCircle className="w-5 h-5 text-primary" />
          <span className="font-medium text-foreground">Need this page?</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          This section is not yet implemented. Continue prompting to have me
          build out the specific functionality you need for this page.
        </p>
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
          <p className="text-xs text-primary font-medium">
            💡 Tip: Describe what features you'd like to see here and I'll
            implement them for you!
          </p>
        </div>
      </div>
    </div>
  );
}
