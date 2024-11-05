import  'dotenv/config'

import * as joi from 'joi'

interface envsVariables{
    PORT: number
}


const schemaVariables = joi.object({
    PORT : joi.number().required()
}).unknown()


const {value,error} = schemaVariables.validate(process.env)


if(error)
    throw new Error(`Config validation error ${error}`)


const env:envsVariables = value

export const envs = {
    port : env.PORT
}