import { ColorsType } from "./../globalType";

export type HeaderProps = {
  colors: ColorsType
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
  isDarkMode: boolean
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  setScreen:  React.Dispatch<React.SetStateAction<string>>
};