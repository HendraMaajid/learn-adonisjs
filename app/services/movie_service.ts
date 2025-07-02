/* eslint-disable prettier/prettier */
import app from "@adonisjs/core/services/app"
import { readdir, readFile } from "node:fs/promises"
import { MarkdownFile } from "@dimerapp/markdown"
import { Exception } from "@adonisjs/core/exceptions"

export default class MovieService {
  static getSlugUrl(slug : string){
    if(!slug.endsWith('.md')){
      slug += '.md'
    }
    return app.makeURL(`resources/movies/${slug}`)
  }
static async getSlugs() {
  try {
    const files = await readdir(app.makeURL('resources/movies'))
    return files.map((file) => file.replace('.md', ''))
  } catch (error) {
    console.error('Error reading movies directory:', error)
    return [] // Return array kosong sebagai fallback
  }
}
  static async read(slug: string){
    try{
      const url = this.getSlugUrl(slug)
      const file = await readFile(url, 'utf-8')
      const md = new MarkdownFile(file)
      await md.process()
      return md
    }catch(error){
      throw new Exception(`Movie ${slug} not found`, {
        code: 'E_NOT_FOUND',
        status: 404
      })
    }
  }

}