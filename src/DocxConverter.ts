import mammoth from 'mammoth'
import puppeteer from 'puppeteer'
import HTMLBuilder from './HTMLBuilder.ts'
import fs from 'node:fs/promises'

export class DocxConverter {
    private readonly path
    private processor = mammoth

    constructor(path: string) {
        this.path = path
    }

    public async process() {
        const { value } = await this.processor.convertToHtml({
            path: this.path,
        })
        const html = HTMLBuilder.build(value)
        const browser = await puppeteer.launch()

        const page = await browser.newPage()
        await page.setContent(html, { waitUntil: 'domcontentloaded' })
        await page.emulateMediaType('screen')

        const pdf = await page.pdf({
            margin: {
                top: '100px',
                right: '50px',
                bottom: '100px',
                left: '50px',
            },
            printBackground: true,
            format: 'A4',
        })

        await fs.writeFile('./temp/result.pdf', pdf, { encoding: 'utf-8' })
        await browser.close()
    }
}
