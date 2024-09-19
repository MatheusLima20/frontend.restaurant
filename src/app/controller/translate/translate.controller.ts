import { englishTexts } from "../../util/translate/translate.string";
import { Error } from "../errors/check.errors";

export const TranslateController = {
  get: async (value: string) => {
    try {
      let newText = value;

      Object.keys(englishTexts).forEach((key: string) => {
        const contain = newText.includes(key);
        if (contain) {
          newText = newText.replace(key, (englishTexts as any)[key]);
        }
      });

      return { text: newText };
    } catch (error: any) {
      const message = await Error.check(error);

      return { error: true, message };
    }
  },
  getNoAsync: (value: string) => {
    let newText = value;

    Object.keys(englishTexts).forEach((key: string) => {
      const contain = newText.includes(key);
      if (contain) {
        newText = newText.replace(key, (englishTexts as any)[key]);
      }
    });

    return { text: newText };
  },
};
