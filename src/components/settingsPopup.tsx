import clsx from "clsx";
import useAppStore from "../stores/app";
import { useSettingsWindowStore } from "../stores/settingsWindow";
import { Portal } from "radix-ui";

const popupContainerStyles = clsx(
  "fixed top-0 left-0 w-screen h-screen",
  "flex justify-center items-center bg-transparent"
);
const popupStyles = clsx(
  "absolute flex min-w-[14rem] flex-col",
  "top-16 right-5 bg-white p-1 rounded-2xl",
  "shadow-lg border border-gray-300/80"
);
const optionStyles = clsx(
  "flex flex-row px-2 py-1 w-full h-full hover:bg-gray-200",
  "rounded-2xl cursor-pointer items-center text-center",
  "justify-between"
);
const toggleButtonStyles = clsx(
  "text-gray-600 text-md rounded-full px-3 py-1 bg-gray-200"
);

export default function SettingsPopupWindow() {
  const { isOpen, toggle } = useSettingsWindowStore();
  const appStore = useAppStore();

  function onOptionClicked(option = -1) {
    switch (option) {
      case 1:
        appStore.updatePreference(
          "features",
          "confetti_enabled",
          !appStore.getPreference<boolean>("features", "confetti_enabled")
        );

        break;
      default:
        break;
    }
    toggle();
  }

  const confettiEnabled = appStore.getPreference<boolean>(
    "features",
    "confetti_enabled"
  );

  if (!isOpen) return null;

  return (
    <Portal.Root id="settings-popup">
      <div
        className={popupContainerStyles}
        onClick={() => {
          toggle();
        }}
      >
        <div className={popupStyles} onClick={(e) => e.stopPropagation()}>
          <span className={optionStyles} onClick={() => onOptionClicked(1)}>
            <p>Confetti</p>
            <span className={toggleButtonStyles}>
              {confettiEnabled ? "on" : "off"}
            </span>
          </span>
        </div>
      </div>
    </Portal.Root>
  );
}
