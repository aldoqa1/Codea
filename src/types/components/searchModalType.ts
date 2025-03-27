import { ColorsType } from "./../globalType";

export type SearchModalProps = {
  colors: ColorsType
  setScreen: React.Dispatch<React.SetStateAction<string>>
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
};