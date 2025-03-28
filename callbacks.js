import {EventEmmitter} from 'events';
import { readFile } from 'fs';


export const findRegex = (files, regex) => {
    const emitter = new EventEmmitter();
    for(const file of files){
        readFile(file, 'utf-8', (err, content) => {
            if(err){
                return emitter.emit(err)
            }
            emitter.emit('fileread', file)
            const match = content.match(regex)
            if(match){
                match.forEach(elem => emitter.emit('found', file, elem))
            }
        })
    }
    return emitter;
}

findRegex(['firstFile.txt', 'secondFile.txt'], /hello \w+/g).on('fileread', (file) => {
    console.log(`${file} was read`)
}).on('found', (file, elem) => console.log(`Matched ${match} in ${file}`)).on('error', error => console.error(`Emmitted error ${error}`))
