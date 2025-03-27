import { ColorsType } from "./../globalType";

export type NavMenuProps = {
  colors: ColorsType
  setScreen: React.Dispatch<React.SetStateAction<string>>
  screen: string
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
};