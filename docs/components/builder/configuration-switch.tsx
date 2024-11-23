import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export interface ConfigurationSwitchProps {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  icon?: React.ReactNode;
}

export function ConfigurationSwitch({ label, checked, onCheckedChange, icon }: ConfigurationSwitchProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <Label>{label}</Label>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
}
