export type QA = { result: string, Q: string, A: Array<string> }

export type NextItem = { label: string, value: number }

export type ItemData = { 
    image:string,
    title?: Array<string>, 
    QA?:QA,
    content?: Array<string>, 
    tips?: Array<string>, 
    nexts?: Array<NextItem>,
    music?:string,
    go?:string
}