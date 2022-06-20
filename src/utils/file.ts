import * as fs from "fs";

export const deleteFile = async (filename: string) => {
	try {
		//verifica se o arquivo existe
		const a = await fs.promises.stat(filename);
	} catch {
		return;
	}
	//deleta o arquivo
	await fs.promises.unlink(filename);
};
