import { useState } from "react";
import { Switch } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ToggleButton({ label, onChangeHandle }) {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch.Group as="div" className="flex items-center relative">
      <Switch.Label as="span" className="mr-5 text-white">
        {label}
      </Switch.Label>
      <Switch
        checked={enabled}
        onChange={(e) => {
          setEnabled(e);
          onChangeHandle(e);
        }}
        className={classNames(
          enabled ? "bg-[#D3B789]" : "bg-[#313949]",
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out"
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? "translate-x-5" : "-translate-x-1",
            "absolute shadow-slate-900 shadow-2xl -top-[3px] pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white ring-0 transition duration-200 ease-in-out"
          )}
        />
      </Switch>
    </Switch.Group>
  );
}
