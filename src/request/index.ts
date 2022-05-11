import axios from "axios";

interface Props {
  method: string;
  url: string;
}

export default ({ ...props }: Props): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios({ ...props });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
