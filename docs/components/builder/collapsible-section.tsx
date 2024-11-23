import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function CollapsibleSection({ title, children, defaultOpen = false }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="flex flex-col gap-2">
      <div 
        className="flex items-center justify-between cursor-pointer" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <Label className="text-base">{title}</Label>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>
      <Separator />
      {isOpen && children}
    </div>
  );
}