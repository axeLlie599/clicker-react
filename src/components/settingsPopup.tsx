import useAppStore from "../stores/app";
import { useSettingsWindowStore } from "../stores/settingsWindow";

export default function SettingsPopupWindow() {
  const { isOpen, toggle } = useSettingsWindowStore();
  const preferences = useAppStore();

  function onOptionClicked(option: number = -1) {
    switch (option) {
      case 1:
        preferences.updatePreference(
          "features",
          "confetti_enabled",
          !preferences.getPreference<boolean>("features", "confetti_enabled")
        );

        break;
      default:
        break;
    }
    toggle();
  }

  const confettiEnabled = preferences.getPreference<boolean>(
    "features",
    "confetti_enabled"
  );

  if (!isOpen) return <></>;
  const optionStyles =
    "flex flex-row p-2  w-full h-full hover:bg-gray-200 rounded-lg cursor-pointer items-center text-center justify-between";

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-transparent"
      onClick={() => {
        toggle();
      }}
    >
      <div
        className="absolute flex min-w-[10rem]  flex-col top-16 right-5 bg-white p-2 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <span className={optionStyles} onClick={() => onOptionClicked(1)}>
          <p>Confetti</p>
          <span>{confettiEnabled ? "On" : "Off"}</span>
        </span>
      </div>
    </div>
  );
}
