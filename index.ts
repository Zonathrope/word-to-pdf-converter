import {DocxConverter} from "./src/DocxConverter.ts";

async function main() {

	const converter = new DocxConverter('./temp/Kachanov_resume.docx')
	await converter.process()
}

await main();
