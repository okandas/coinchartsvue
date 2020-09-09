import { expose } from 'comlink'

const myValue = '100%'

const WorkOne =   {
  print (): void {
    console.log(`myValue=${myValue}`)
  }
}

expose(WorkOne)